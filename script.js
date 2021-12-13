const musicDisc = document.querySelector('.circleBlock');
const phoneImg = document.querySelector('.phone_image');
const sectionThreeColR = document.querySelector('.section__three__col__r');
const headerBlock = document.querySelector('.uix')


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

headerBlock.addEventListener('click', (e) => {
  if (e.target.classList.contains('trigger-button')) {
    headerAnimation()
  }
})

function headerAnimation() {
  gsap.to('.navigation-top__list', {duration: 2.1, x:'-150%'})
  gsap.to('.navigation-top__button', {duration: 3.25, x:'250%'})
  gsap.to('.socials-bottom', {duration: 1.2, autoAlpha: 0})
  gsap.to('.crowd', {duration: 2.5, y: 0, opacity: 1})
  gsap.to('.header__famous-line', {duration: 2.5, y: 0, opacity: 1})
  gsap.to('.registration-form', {duration: 3.25, autoAlpha: 1})
  gsap.to('.nuef-collaborations', {duration: 2.5, y: '-160%'})
  gsap.to('.singer', {duration: 2.5, y: 0, scale: 1})
  gsap.to('.header__two-lines', {duration: 2.5, y: 0, scale: 1})
  gsap.to('.smoke', {duration: 2.5, opacity: 1})
  gsap.to('.spotlight-pink', {duration: 3.25, opacity: 1})
  gsap.to('.spotlight-white-left', {duration: 2.5, y: 0, x: '-82%', rotate: 40})
  gsap.to('.spotlight-white-center-left', {duration: 2.5, y: '40%', x: '-45%', rotate: 20})
  gsap.to('.spotlight-white-center-right', {duration: 2.5, y: '40%', x: '45%', rotate: -20})
  gsap.to('.spotlight-white-right', {duration: 2.5, y: 0, x: '82%', rotate: -40})
}
// let left_imgs = gsap.utils.toArray(".phone-line");


gsap.to('.moving-text-back', {duration: 60, x: '-55%', repeat: -1, yoyo: true, ease: 'linear'})
gsap.to('.moving-text-front', {duration: 60, x: '55%', repeat: -1, yoyo: true, ease: 'linear'})
gsap.to('.musicCircle-big', {duration: 5, rotate: 220, ease: 'linear', scrollTrigger: {
  trigger: ".one",
  start: "top 0%",
  end: "bottom -100%",
  // markers: true,
  scrub: 1,
  // pin: ".banana_header_blocks",
}})


const phoneTimeline = gsap.timeline({defaults: {duration: 1},
  scrollTrigger: {
    trigger: ".four",
    start: "top 0%",
    scrub: 1,
    pin: true,
  }
});
phoneTimeline
.to('.phone-line', {duration: 1, color: '#232323', textDecorationLine: 'line-through', ease: 'linear', stagger: 1}, 0)
.to('.waving-text-line-back', {duration: 10, x: '-15%', ease: 'linear'}, 0)
.to('.waving-text-line-front', {duration: 10, x: '15%', ease: 'linear'}, 0)


const studioTimeline = gsap.timeline({defaults: {duration: 1},
  scrollTrigger: {
    trigger: ".six",
    start: "top 0%",
    scrub: 1,
    pin: true,
  }
});
studioTimeline
.to('.studio', {scale: 4, opacity: 0, ease: 'linear'})
.to('.studio', {scale: 1, opacity: 1, ease: 'linear'})

