/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPHONE ADDAPTIVE
// function isIOSDevice() {
//     return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// }

// function iphoneAdaptive(iphoneIndicator) {

// }

// iphoneAdaptive(isIOSDevice());

function linksPreventDefault() {
    const links = Array.from(document.querySelectorAll('a[href="#"]'));
    links.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
}
linksPreventDefault();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SMOTH SCROLL

SmoothScroll({
    animationTime: 600,
    stepSize: 75,
    accelerationDelta: 30,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 50,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    touchpadSupport: true,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANIMATIONS

