# NUEF

An interactive music and creative-brand landing page built with JavaScript, SCSS, and GSAP.

**[Live Demo](https://nuef.oleksiireznichenko.com)**

## Overview

NUEF is a frontend project for a music and creative brand, built around scroll-driven animations, interactive elements, and visual storytelling.

The website combines bold typography, animated graphics, background video, and custom transitions to create an immersive browsing experience.

Originally developed as a client project, it has since been restored and optimized as a standalone frontend demo for my portfolio.

## Features

- **Scroll-driven animations** - GSAP and ScrollTrigger power pinned sections, transitions, and interactive visual effects.
- **Interactive landing page** - Animated spotlights, typography, and layered visual elements.
- **Animated sections** - Rotating vinyl records, interactive disc elements, phone animations, and studio transitions.
- **Smooth scrolling** - Custom desktop scrolling behavior integrated with GSAP.
- **Responsive design** - Adapted layouts, images, and animations for desktop, tablet, and mobile devices.
- **Custom UI interactions** - Section navigation, animated buttons, hover effects, and transitions.
- **Standalone frontend** - No backend, authentication, or external application services required.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| SCSS / CSS3 | Styling, responsive layouts, and visual effects |
| JavaScript | Application logic and UI interactions |
| GSAP | Animation timelines and transitions |
| ScrollTrigger | Scroll-based animation control and pinned sections |
| SmoothScroll | Smooth desktop wheel scrolling |
| Node.js | Local development and build scripts |

The project uses vanilla JavaScript without a frontend framework.

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- Modern web browser

### Run Locally

Clone the repository:

```bash
git clone https://github.com/OleksiiReznichenko/NUEF.git
cd NUEF
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The project includes compiled CSS, so dependencies are not required for a basic preview.

### Working with SCSS

Install dependencies:

```bash
npm install
```

Compile SCSS:

```bash
npm run build:css
```

Watch SCSS files during development:

```bash
npm run watch:css
```

### Project Checks

Run the included source and configuration checks:

```bash
npm run check
```

## Project Structure

```text
NUEF/
├── assets/
│   ├── css/          # Compiled stylesheets
│   ├── js/           # JavaScript and GSAP animations
│   ├── media/        # Images, videos, and other assets
│   └── scss/         # SCSS source files
├── tools/             # Development server and validation scripts
├── index.html         # Main HTML page
├── package.json       # Development scripts
└── README.md
```

## Animation Architecture

The website uses GSAP timelines and ScrollTrigger to coordinate animations with the user's scroll position.

Several sections use pinned scroll sequences, allowing visual elements to animate while their section remains visible.

The animation system includes:

- Timeline-based transitions between sections
- Scroll-linked transformations, opacity, and movement
- Layered graphics and animated typography
- Interactive rotating elements
- Responsive animation configurations
- ScrollTrigger refresh handling for viewport changes

The original animations have been preserved where possible, with adjustments to pacing, scrolling behavior, and responsive layouts.

## Project Status

**Restored frontend portfolio demo.**

The original project has been updated to improve compatibility with modern browsers and provide a standalone browsing experience.

The restoration focused on:

- Improving animation pacing and scroll behavior
- Fixing responsive layouts and overlapping elements
- Improving navigation and UI interactions
- Removing obsolete PHP backend and form functionality
- Optimizing assets and development configuration
- Preparing the project for static deployment

This repository demonstrates the frontend implementation and is not an active commercial music-label platform.

## Notes

- GSAP and some supporting libraries and fonts are loaded through external CDNs.
- Certain animations require these libraries to load successfully.
- The original backend and contact form functionality have been removed.
- The project is preserved primarily as a frontend development and animation showcase.

## Credits

Frontend development and implementation by [Oleksii Reznichenko](https://oleksiireznichenko.com).

Original branding, design assets, imagery, and other media remain the property of their respective owners. Their inclusion in this portfolio project does not grant permission for redistribution or commercial reuse.
