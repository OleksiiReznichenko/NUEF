import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
};

const port = Number(process.env.PORT ?? 5173);
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filePath = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!filePath.startsWith(`${root}${sep}`) || !mimeTypes[extname(filePath)]) {
      response.writeHead(404).end('Not found');
      return;
    }
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');
    // The background video can be large, so support range requests for seek/playback.
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const mime = mimeTypes[extname(filePath)];
    if (range) {
      const start = Number(range[1]);
      const end = range[2] ? Math.min(Number(range[2]), fileStat.size - 1) : fileStat.size - 1;
      if (start >= fileStat.size || end < start) {
        response.writeHead(416, { 'Content-Range': `bytes */${fileStat.size}` }).end();
        return;
      }
      const { createReadStream } = await import('node:fs');
      response.writeHead(206, {
        'Content-Type': mime, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Content-Length': end - start + 1, 'Cache-Control': 'no-cache',
      });
      createReadStream(filePath, { start, end }).pipe(response);
      return;
    }
    response.writeHead(200, {
      'Content-Type': mime, 'Content-Length': fileStat.size,
      'Cache-Control': 'no-cache', 'Accept-Ranges': 'bytes',
    });
    const { createReadStream } = await import('node:fs');
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`NUEF demo: http://localhost:${port}`));
