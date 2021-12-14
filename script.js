const musicDisc = document.querySelector('.circleBlock');
const phoneImg = document.querySelector('.phone_image');
const sectionThreeColR = document.querySelector('.section__three__col__r');
const headerBlock = document.querySelector('.uix');
const connectAnimationButton = document.querySelector('.connect-animation-button');
const circleBlock = document.querySelector('.circleBlock');
const rightArm = document.querySelector('.right-arm');
const leftArm = document.querySelector('.left-arm');


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

gsap.registerPlugin(CSSRulePlugin);
const circleBlockBorder = CSSRulePlugin.getRule('.block.three .content .col.r .circleBlock:before');
const connectAnimationButtonBorder = CSSRulePlugin.getRule('.block.three .content .col.r .circleBlock .center:before');

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

// let headerAnimationIndicator = false;

headerBlock.addEventListener('click', (e) => {
  if (e.target.classList.contains('trigger-button')) {
    headerAnimation()
  }
})

let regFormAnimation, regFormIndicator = false;

function headerAnimation() {
  if (!regFormIndicator) {
    // gsap.to('.navigation-top__list', {duration: 2.1, x:'-150%'})
    // gsap.to('.navigation-top__button', {duration: 3.25, x:'250%'})
    // gsap.to('.socials-bottom', {duration: 1.2, autoAlpha: 0})
    // gsap.to('.crowd', {duration: 2.5, y: 0, opacity: 1})
    // gsap.to('.header__famous-line', {duration: 2.5, y: 0, opacity: 1})
    // gsap.to('.nuef-collaborations', {duration: 2.5, y: '-160%'})
    // gsap.to('.singer', {duration: 2.5, y: 0, scale: 1})
    // gsap.to('.header__two-lines', {duration: 2.5, y: 0, scale: 1})
    // gsap.to('.smoke', {duration: 2.5, opacity: 1})
    // gsap.to('.spotlight-pink', {duration: 3.25, opacity: 1})
    // gsap.to('.spotlight-white-left', {duration: 2.5, y: 0, x: '-82%', rotate: 40})
    // gsap.to('.spotlight-white-center-left', {duration: 2.5, y: '40%', x: '-45%', rotate: 20})
    // gsap.to('.spotlight-white-center-right', {duration: 2.5, y: '40%', x: '45%', rotate: -20})
    // gsap.to('.spotlight-white-right', {duration: 2.5, y: 0, x: '82%', rotate: -40})
    // regFormAnimation = gsap.to('.registration-form', {duration: 3.25, autoAlpha: 1})
    regFormAnimation = gsap.to('.registration-form', {duration: .75, autoAlpha: 1})
    regFormIndicator = true;

    // headerAnimationIndicator = true;
  } else {
    // gsap.to('.registration-form', {duration: 3.25, autoAlpha: 1})
    regFormAnimation.reverse();
    regFormIndicator = false;
  }
}


connectAnimationButton.addEventListener('click', () => {
  connectAnimation();
})
let connectAnimationIndicator = 3;
let discTop = '50%', discRight = '0%';
if (window.outerWidth < 900) {
  discRight = '-10%';
}
if (window.outerWidth < 700) {
  discTop = '70%'
}
if (window.outerWidth < 600) {
  discRight = '-20%'
}
if (window.outerWidth < 500) {
  discRight = '-33%'
}
if (window.outerWidth < 450) {
  discRight = '-25%'
}

function connectAnimation() {
//   if (connectAnimationIndicator === 1) {
//     gsap.to(connectAnimationButton, {duration: .75, rotate: -180, background: 'linear-gradient(90deg, #0400ff 0%, #a40cea 53.13%, #ec0a7a 100%' })
//     gsap.to(circleBlockBorder, {duration: 1, opacity: 1, border: '0.2rem solid #ffffff' })
//     gsap.to(leftArm, {duration: 1, opacity: 1, x: '40%', y: '-20%' })
//     gsap.to(rightArm, {duration: 1, opacity: 1, x: '-40%', y: '20%' })
//     connectAnimationIndicator = 2;
// } else if (connectAnimationIndicator === 2) {
//     gsap.to('.text-block-three', {duration: 1, autoAlpha: 1 })
//     gsap.to('.spotlight-block-three', {duration: 1, autoAlpha: 1 })
//     gsap.to('.circleBlock__image', {duration: 1, opacity: 1 })
//     gsap.to(connectAnimationButton, {duration: 1.25, rotate: 360, scale: 1, })
//     gsap.to(circleBlock, {duration: 1, scale: 1, opacity: 1 })
//     gsap.to(circleBlockBorder, {duration: 1, border: '0.75rem solid #ffffff' })
//     gsap.to('.disc-block-three', {duration: 1.5, x: 0, y: 0, top: discTop, right: discRight })
//     gsap.to(leftArm, {duration: 1.3, y: '-350%', rotate: 45, opacity: 0 })
//     gsap.to(rightArm, {duration: 1.3, y: '550%', rotate: 55, opacity: 0 })
//     connectAnimationIndicator = 3;
//   } 
  if (connectAnimationIndicator === 3) {
    gsap.to(connectAnimationButton, {duration: .75, rotate: -180 })
    connectAnimationIndicator = 4;
  } else if (connectAnimationIndicator === 4) {
    gsap.to(connectAnimationButton, {duration: .75, rotate: 0 })
    connectAnimationIndicator = 3;
  }
}


// if (!headerAnimationIndicator) {
  const headerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".one",
      start: "top 0%",
      end: '+=100px',
      scrub: 1,
      pin: true,
    }
  });

  headerTimeline
  .to('.navigation-top__list', {duration: 2.1, x:'-150%'}, 0)
  .to('.navigation-top__button', {duration: 3.25, x:'250%'}, 0)
  .to('.socials-bottom', {duration: 1.2, autoAlpha: 0}, 0)
  .to('.crowd', {duration: 2.5, y: 0, opacity: 1}, 0)
  .to('.header__famous-line', {duration: 2.5, y: 0, opacity: 1}, 0)
  .to('.nuef-collaborations', {duration: 2.5, y: '-160%'}, 0)
  .to('.singer', {duration: 2.5, y: 0, scale: 1}, 0)
  .to('.header__two-lines', {duration: 2.5, y: 0, scale: 1}, 0)
  .to('.smoke', {duration: 2.5, opacity: 1}, 0)
  .to('.spotlight-pink', {duration: 3.25, opacity: 1}, 0)
  .to('.spotlight-white-left', {duration: 2.5, y: 0, x: '-82%', rotate: 40, opacity: 1}, 0)
  .to('.spotlight-white-center-left', {duration: 2.5, y: '40%', x: '-45%', rotate: 20, opacity: 1}, 0)
  .to('.spotlight-white-center-right', {duration: 2.5, y: '40%', x: '45%', rotate: -20, opacity: 1}, 0)
  .to('.spotlight-white-right', {duration: 2.5, y: 0, x: '82%', rotate: -40, opacity: 1}, 0)

  // headerAnimationIndicator = true;
// }

gsap.to('.moving-text-back', {duration: 60, x: '-55%', repeat: -1, yoyo: true, ease: 'linear'})
gsap.to('.moving-text-front', {duration: 60, x: '55%', repeat: -1, yoyo: true, ease: 'linear'})
gsap.to('.musicCircle-big', {duration: 5, rotate: 220, ease: 'linear', scrollTrigger: {
  trigger: ".one",
  start: "top 0%",
  end: "bottom -100%",
  // markers: true,
  scrub: 1,
}})


const connectAnimationTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".three",
    start: "top 0%",
    end: '+=1000px',
    scrub: 1,
    pin: true,
  }
})
connectAnimationTimeline
.to(connectAnimationButton, {duration: .75, rotate: -180, background: 'linear-gradient(90deg, #0400ff 0%, #a40cea 53.13%, #ec0a7a 100%' }, 0)
.to(circleBlockBorder, {duration: 1, opacity: 1, border: '0.2rem solid #ffffff' }, 0)
.to(leftArm, {duration: 1, opacity: 1, x: '40%', y: '-20%' }, 0)
.to(rightArm, {duration: 1, opacity: 1, x: '-40%', y: '20%' }, 0)
.to('.text-block-three', {duration: 1, autoAlpha: 1 }, 1)
.to('.spotlight-block-three', {duration: 1, autoAlpha: 1 }, 1)
.to('.circleBlock__image', {duration: 1, opacity: 1 }, 1)
.to(connectAnimationButton, {duration: 1.25, rotate: 360, scale: 1, }, 1)
.to(circleBlock, {duration: 1, scale: 1, opacity: 1 }, 1)
.to(circleBlockBorder, {duration: 1, border: '0.75rem solid #ffffff' }, 1)
.to('.disc-block-three', {duration: 1.5, x: 0, y: 0, top: discTop, right: discRight }, 1)
.to(leftArm, {duration: 2, y: '-350%', rotate: 45, opacity: 0 }, 1)
.to(rightArm, {duration: 2, y: '550%', rotate: 55, opacity: 0 }, 1)



const phoneTimeline = gsap.timeline({defaults: {duration: 1},
  scrollTrigger: {
    trigger: ".four",
    start: "top 0%",
    scrub: 1,
    pin: true,
  }
});
phoneTimeline
.to('.phone-line', {duration: 2, color: '#232323', ease: 'linear', stagger: 1}, 0)
.to('.phone-line-line', {duration: 2, width: '110%', ease: 'linear', stagger: 1}, 0)
.to('.waving-text-line-back', {duration: 10, x: '-15%', ease: 'linear'}, 0)
.to('.waving-text-line-front', {duration: 10, x: '15%', ease: 'linear'}, 0)


const studioTimeline = gsap.timeline({defaults: {duration: 1.5},
  scrollTrigger: {
    trigger: ".five",
    start: "top 0%",
    end: '+=2000px',
    scrub: 1,
    pin: true,
  }
});
studioTimeline
.to('.studioGlass-block-five', {duration: 10, opacity: 1, ease: 'linear'}, 0)
.to('.content-block-five', {duration: 10, opacity: 0, ease: 'linear'}, 0)
.to('.footer-block-five', {duration: 10, opacity: 0, ease: 'linear'}, 0)
.to('.studio-content', {duration: 10, y: '-50%'})
.to('.studio-block-five', {duration: 10, scale: 1, opacity: 1, ease: 'linear'})
.to('.studio-block-five', {duration: 10, opacity: 0, ease: 'linear'})
.to('.studio-content', {duration: 10, autoAlpha: 0, ease: 'linear'})
.to('.studioGlass-block-five', {duration: 10, autoAlpha: 0, ease: 'linear'})
.to('.block-contacts', {duration: 10, autoAlpha: 1, ease: 'linear'})

