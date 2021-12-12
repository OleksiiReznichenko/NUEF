const musicDisc = document.querySelector('.circleBlock');
const phoneImg = document.querySelector('.phone_image');
const sectionThreeColR = document.querySelector('.section__three__col__r');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPHONE ADDAPTIVE



function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

function iphoneAdaptive(iphoneIndicator) {
  if (!iphoneIndicator) return;
  if (window.outerWidth < 600) {
    musicDisc.classList.add('circleBlock_iphone_adaptive');
    phoneImg.classList.add('phone_image_iphone_adaptive');
    sectionThreeColR.classList.add('section__three__col__r_iphone_adaptive');
  }
}

iphoneAdaptive(isIOSDevice());

function linksPreventDefault() {
  const links = Array.from(document.querySelectorAll('a[href="#"]'));
  links.forEach(function (el) {
    el.addEventListener("click", function (e) {
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
gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(CSSRulePlugin);
var rule = CSSRulePlugin.getRule('span:after');

// gsap.from('.anim1', {duration: 1, opacity: 0, y: -50, stagger: 0.6});
// gsap.from('img', {duration: 1, y: 30, opacity: 0});
// gsap.from('aside', {duration: 1, backgroundPosition: '200px 0px', opacity: 0});
// gsap.to(rule, {duration: 1, cssRule: {scaleY: 0}});

// const tl = gsap.timeline({defaults: {duration: 1},
//   scrollTrigger: {
//     trigger: '.main',
//     start: 'top 30%',
//     end: 'top -10%',
//     scrub: 1,
//     // pin: true,
//     // pinSpacing: true
//   }});

// tl
// .from('.anim1', {opacity: 0, y: -50, stagger: 0.6})
// .to(rule, {duration: 1, cssRule: {scaleY: 0}}, '-=2.2')
// .from('aside', {backgroundPosition: '200px 0px', opacity: 0}, '-=1.5')
// .from('img', {y: 50, opacity: 0}, '-=0.5')