const blockContactImageContainer = document.querySelector(".block-contacts__image-container");
const blockContactText = document.querySelector(".block-contacts__text");
const musicDisc = document.querySelector(".section-disc__circle-block");
const phoneImg = document.querySelector(".phone_image");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPHONE ADDAPTIVE

function isIOSDevice() {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

function iphoneAdaptive(iphoneIndicator) {
  if (!iphoneIndicator) return;
  if (window.outerWidth < 600) {
    musicDisc.classList.add("circleBlock_iphone_adaptive");
    phoneImg.classList.add("phone_image_iphone_adaptive");
    blockContactImageContainer.classList.add(
      "block-contacts__image-container_iphone_adaptive"
    );
    blockContactText.classList.add("block-contacts__text_iphone_adaptive");
  }
}

iphoneAdaptive(isIOSDevice());


class AppAnimations {
  constructor() {
    this._DOMSelection();
    this._librariesPluginsInit();
    this._linksPreventDefault();
    this._resize();
    this._eventListeners();
    this._fixedNav();
    this._preloaderAnimation();
    this._headerAnimation();
    this._welcomeToNuefAnimation();
    this._connectAnimation();
    this._phoneAnimation();
    this._studioAnimation();
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM SELECTION
  _DOMSelection() {
    this.formCallingButtons = Array.from(document.querySelectorAll(".trigger-button"));
    this.formClosingButtons = Array.from(document.querySelectorAll(".trigger-close-button"));
    this.fixedNavLinks = Array.from(document.querySelectorAll(".fixed-nav__link"));

    this.header = document.querySelector(".header");
    this.sectionEqualiser = document.querySelector(".section-equaliser");
    this.sectionDisc = document.querySelector(".section-disc");
    this.sectionPhone = document.querySelector(".section-phone");
    this.sectionStudio = document.querySelector(".section-studio");
    
    this.aboutLink = document.querySelector(".about-link");
    this.artistsLink = document.querySelector(".artists-link");
    this.recordsLink = document.querySelector(".records-link");
    this.dailyLink = document.querySelector(".daily-link");
    this.connectAnimationButton = document.querySelector(".section-disc__connect-animation-button");
    this.emailInput = document.getElementById("emailInput");
    this.socialInput = document.getElementById("socialInput");
    this.fileInput = document.getElementById("fileInput");
    this.textarea = document.querySelector(".registration-form__form__textarea");

    this.registrationForm = document.querySelector(".registration-form");
    this.rightArm = document.querySelector(".section-disc__right-arm");
    this.leftArm = document.querySelector(".section-disc__left-arm");
    this.circleBlockBorder = document.querySelector(".section-disc__circle-block__border");
    this.headerButton = document.querySelector(".header__navigation-top__button");
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INITIALIZATION OF LIBRARIES & PLUGINS
  _librariesPluginsInit() {
      SmoothScroll({
          animationTime    : 600,
          stepSize         : 75,
          accelerationDelta : 20,  
          accelerationMax   : 2,   
          keyboardSupport   : true,  
          arrowScroll       : 50,
          pulseAlgorithm   : true,
          pulseScale       : 4,
          pulseNormalize   : 1,
          touchpadSupport   : true,
      });
      
      gsap.registerPlugin(ScrollTrigger);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISABLE EMPTY LINKS CLICK
  _linksPreventDefault() {
      const links = Array.from(document.querySelectorAll('a[href="#"]'));
      links.forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RESIZE
  _resize() {
      const initialWindowWidth = window.outerWidth;
      // const initialWindowHeight = window.outerHeight;

      window.addEventListener('resize', () => {
          const newWindowWidth = Math.abs(initialWindowWidth - window.outerWidth);
          // const newWindowHeight = Math.abs(initialWindowHeight - window.outerHeight);
          if (newWindowWidth < 100) return;
          location.reload();
      })
  }

  _fixedNav() {
    let clickIndicator = false;
    this.aboutLink.addEventListener("click", () => {
      if (clickIndicator) return;
      clickIndicator = true;

      this.sectionEqualiser.scrollIntoView({
        behavior: "smooth",
      });
      this.fixedNavLinks.forEach((el) => {
        el.classList.remove("active");
      });
      this.aboutLink.classList.add("active");

      if (!this.aboutLink.classList.contains("active")) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    });
    this.artistsLink.addEventListener("click", () => {
      if (clickIndicator) return;
      clickIndicator = true;

      this.sectionDisc.scrollIntoView({
        behavior: "smooth",
      });
      this.fixedNavLinks.forEach((el) => {
        el.classList.remove("active");
      });
      this.artistsLink.classList.add("active");

      if (!this.artistsLink.classList.contains("active")) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    });
    this.recordsLink.addEventListener("click", () => {
      if (clickIndicator) return;
      clickIndicator = true;

      this.sectionPhone.scrollIntoView({
        behavior: "smooth",
      });
      this.fixedNavLinks.forEach((el) => {
        el.classList.remove("active");
      });
      this.recordsLink.classList.add("active");

      if (!this.recordsLink.classList.contains("active")) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    });
    this.dailyLink.addEventListener("click", () => {
      if (clickIndicator) return;
      clickIndicator = true;

      this.sectionStudio.scrollIntoView({
        behavior: "smooth",
      });
      this.fixedNavLinks.forEach((el) => {
        el.classList.remove("active");
      });
      this.dailyLink.classList.add("active");

      if (!this.dailyLink.classList.contains("active")) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.fixedNavLinks.forEach((el) => {
            el.classList.remove("active");
          });

          if (entry.target.classList.contains("header")) {
            this.fixedNavLinks.forEach((el) => {
              el.classList.remove("active");
            });
          }

          if (entry.target.classList.contains("section-equaliser")) {
            this.aboutLink.classList.add("active");
          }

          if (entry.target.classList.contains("section-disc")) {
            this.artistsLink.classList.add("active");
          }

          if (entry.target.classList.contains("section-phone")) {
            this.recordsLink.classList.add("active");
          }

          if (entry.target.classList.contains("section-studio")) {
            this.dailyLink.classList.add("active");
          }
        }
      });
    }

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    observer.observe(this.header);
    observer.observe(this.sectionEqualiser);
    observer.observe(this.sectionDisc);
    observer.observe(this.sectionPhone);
    observer.observe(this.sectionStudio);
  }

// APPEAR FORM ANIMATION
  _appearFormAnimation(regFormIndicator) {
    if (!regFormIndicator) {
      gsap.to(".registration-form__wrapper", { duration: 0.75, autoAlpha: 1 });
    } else {
      gsap.to(".registration-form__wrapper", { duration: 0.75, autoAlpha: 0 });

      setTimeout(() => {
        this.emailInput.value = '';
        this.socialInput.value = '';
        this.fileInput.value = '';
        this.textarea.value = '';
      }, 750);
    }
  }

// CHECK TEXTAREA HEIGHT
  _onInput() {
    const heightUnit = window.innerHeight / 100;
    const heightLimit = this.registrationForm.offsetHeight / heightUnit;

    if (heightLimit >= 90) return;
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS
  _eventListeners() {
    this.formCallingButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        this._appearFormAnimation(false);
      });
    });

    this.formClosingButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("registration-form__wrapper") ||
          e.target.classList.contains("close-icon")
        ) {
          this._appearFormAnimation(true, 0);
        }
      });
    });

    document.getElementById('fileInputForm').addEventListener('submit', () => {
      alert('Thanks');
    });
    
    const tx = document.querySelector("textarea");
    tx.setAttribute("style", "height:" + tx.scrollHeight + "px;");
    tx.addEventListener("input", this._onInput, false);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PRELOADER ANIMATION
  _preloaderAnimation() {
    const preloaderTimeline = gsap.timeline({});

    // preloaderTimeline
    //   .to(
    //     ".preloader__image",
    //     { duration: 10, rotate: -1080, ease: "linear" },
    //     0
    //   )
    //   .to(
    //     preloaderTextFilling,
    //     { duration: 3.5, width: "100%", ease: "linear" },
    //     0
    //   )
    //   .to(
    //     ".preloader",
    //     { duration: 1, autoAlpha: 0, ease: "linear", delay: 4 },
    //     0
    //   )
    //   .to("html", { duration: 0, overflowY: "visible", delay: 5 }, 0);

      preloaderTimeline
        .to(
          ".preloader__image",
          { duration: 10, rotate: -1080, ease: "linear" },
          0
        )
        .to(
            ".preloader",
            { duration: 1, autoAlpha: 0, ease: "linear", delay: 2 },
            0
        )
        .to("html", { duration: 0, overflowY: "visible", delay: 3.2 }, 0);

        
        const interval = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(interval);
                
                preloaderTimeline
                .to(
                    ".preloader",
                    { duration: 1.2, autoAlpha: 0, ease: "linear", delay: .5 },
                    0
                )
                .to("html", { duration: 0, overflowY: "visible", delay: 1.4 }, 0)
            }    
        }, 100);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HEADER ANIMATION
  _headerAnimation() {
    // let headerTimelineEnd = "+=1000px";
    let headerTimelineEnd = "top -130%";

    if (window.outerWidth < 600) {
      headerTimelineEnd = "+=500px";
    }

    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.header,
        start: "top 0%",
        end: headerTimelineEnd,
        scrub: 1,
        pin: this.header,
        // onUpdate: (self) => {
        //   console.log(self.progress)
        //   if (self.progress < 0.05) {
        //     if (this.headerButton.style.transition = 'all 0.3s') return;
        //     this.headerButton.style.transition = 'all 0.3s';
        //   } else {
        //     if (this.headerButton.style.transition = 'none') return;
        //     this.headerButton.style.transition = 'none';
        //   }
        // }
      },
    });

    let rotateSides = 40;
    let rotateCenter = 20;
    let crowdY = "25vh";

    if (window.outerWidth < 950 && window.outerHeight < 520) {
      crowdY = "35vh";
    }

    if (window.outerWidth > 2600) {
      crowdY = "15vh";
    }

    headerTimeline
      .to(".header__navigation-top__list", { duration: 2.1, x: "-150%" }, 0)
      .to('.header__navigation-top__button-container', { duration: 3.25, x: "250%" }, 0)
      .to(".header__socials", { duration: 1.2, autoAlpha: 0 }, 0)
      .to(".header__crowd-container", { duration: 2.5, y: crowdY }, 0)
      .to(".header__famous-line", { duration: 2.5, y: 0, opacity: 1 }, 0)
      .to(".header__nuef-collaborations", { duration: 2.5, y: "-160%" }, 0)
      .to(".header__singer", { duration: 2.5, y: 0, scale: 1 }, 0)
      .to(".header__two-lines", { duration: 2.5, y: 0, scale: 1 }, 0)
      .to(".header__smoke", { duration: 2.5, opacity: 1 }, 0)
      .to(".header__spotlight-center", { duration: 3.25, opacity: 0.35 }, 0)

      .to(".header__spotlights-pink", { duration: 3.25, opacity: 1 }, 0)
      .to(".header__spotlights-white", { duration: 2.5, opacity: 1 }, 0)
      .to(".header__spotlights-white-center", { duration: 2.5, opacity: 1 }, 0)
      .to(
        ".header__spotlight-white-left",
        { duration: 2.5, y: 0, x: "-82%", rotate: rotateSides },
        0
      )
      .to(
        ".header__spotlight-white-center-left",
        { duration: 2.5, x: "-45%", rotate: rotateCenter },
        0
      )
      .to(
        ".header__spotlight-white-center-right",
        { duration: 2.5, x: "45%", rotate: -rotateCenter },
        0
      )
      .to(
        ".header__spotlight-white-right",
        { duration: 2.5, y: 0, x: "82%", rotate: -rotateSides },
        0
      );
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WELCOME TO NUEF ANIMATION
  _welcomeToNuefAnimation() {
    const welcomeToNuefTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.header,
        start: "top 0%",
        end: "bottom -100%",
        scrub: 1,
      },
    });

    welcomeToNuefTimeline
      .to(".section-equaliser__music-circle-left", { duration: 5, rotate: 220, ease: "linear" }, 0)
      .to(
        ".section-equaliser__music-circle-right",
        { duration: 5, rotate: 220, ease: "linear" },
        0
      );
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONNECT ANIMATION
  _connectAnimation() {
    this.connectAnimationButton.addEventListener("click", () => {
      connectAnimation();
    });

    let connectAnimationIndicator = 3;    
    let discRight = "40vw";
    let discTop = "0%";

    if (window.outerWidth < 900) {
      // discRight = '-10%';
      discRight = "90%";
    }
    if (window.outerWidth < 700 && window.outerHeight > 520) {
      // discTop = '70%'
      // discTop = '25%'
      discTop = "70%";
    }
    if (window.outerWidth < 600) {
      // discRight = '-20%'
      discRight = "80%";
    }
    if (window.outerWidth < 500) {
      // discRight = '-33%'
      discRight = "75%";
    }
    if (window.outerWidth < 450) {
      // discRight = '-25%'
      discRight = "75%";

      if (isIOSDevice()) {
        // discRight = '-50%'
        discRight = "65%";
      }
    }
    if (window.outerWidth > 2500) {
      // discRight = '-25%'
      discRight = "60vw";
      discTop = "20%";
    }

    function connectAnimation() {
      if (connectAnimationIndicator === 3) {
        gsap.to(this.connectAnimationButton, { duration: 0.75, rotate: -180 });
        connectAnimationIndicator = 4;
      } else if (connectAnimationIndicator === 4) {
        gsap.to(this.connectAnimationButton, { duration: 0.75, rotate: 0 });
        connectAnimationIndicator = 3;
      }
    }

    let connectAnimationTimelineEnd = "+=1500px";

    if (window.outerWidth < 600) {
      connectAnimationTimelineEnd = "+=900px";
    }

    const connectAnimationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionDisc,
        start: "top 0%",
        end: connectAnimationTimelineEnd,
        scrub: 1,
        pin: this.sectionDisc,
      },
    });

    connectAnimationTimeline
      .to(
        this.connectAnimationButton,
        {
          duration: 0.75,
          rotate: -180,
          background:
            "linear-gradient(90deg, #0400ff 0%, #a40cea 53.13%, #ec0a7a 100%",
        },
        0
      )
      .to(
        '.section-disc__circle-block__border',
        { duration: 1, opacity: 0.2, border: "0.1rem solid #ffffff" },
        0
      )
      .to(this.leftArm, { duration: 1, opacity: 1, x: "40%", y: "-20%" }, 0)
      .to(this.rightArm, { duration: 1, opacity: 1, x: "-40%", y: "20%" }, 0)
      .to(".section-disc__info", { duration: 1, autoAlpha: 1 }, 1)
      .to(".section-disc__spotlight", { duration: 1, autoAlpha: 1 }, 1)
      .to(".section-disc__circle-block__image", { duration: 1, opacity: 1 }, 1)
      .to(this.connectAnimationButton, { duration: 1.25, rotate: 360, scale: 1 }, 1)
      .to('.section-disc__circle-block', { duration: 1, scale: 1, opacity: 1 }, 1)
      .to(
        '.section-disc__circle-block__border',
        { duration: 1, opacity: 1, border: "0.75rem solid #ffffff" },
        1
      )
      .to(".section-disc__image-container", { duration: 1.5, x: discRight, y: discTop }, 1)
      .to(this.leftArm, { duration: 2, y: "-350%", rotate: 45, opacity: 0 }, 1)
      .to(this.rightArm, { duration: 2, y: "550%", rotate: 55, opacity: 0 }, 1)
      .to(".section-disc__title__span-right", { duration: 2, x: '-1.3rem' }, 1);
      // .to(".section-disc__title__span-right", { duration: 2, x: 0 }, 1);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PHONE ANIMATION
  _phoneAnimation() {
    let phoneTimelineEnd = "+=1300px";
    let phoneLinesTimelineEnd = "+=1700px";
    let phoneLinesTimeline2End = "+=1700px";

    if (window.outerWidth < 600) {
      phoneTimelineEnd = "+=900px";
      phoneLinesTimelineEnd = "+=1000px";
      phoneLinesTimeline2End = "+=1000px";
    }

    const phoneTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionPhone,
        start: "top 0%",
        end: phoneTimelineEnd,
        scrub: 1,
        pin: this.sectionPhone,
      },
    });

    const phoneLinesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionPhone,
        start: "top 50%",
        end: phoneLinesTimelineEnd,
        scrub: 1,
      },
    });


    const phoneLinesTimeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionPhone,
        start: "top 50%",
        end: phoneLinesTimeline2End,
        scrub: 1,
      },
    });

    phoneTimeline
      .to(
        ".section-phone__phone-line",
        { duration: 2, color: "#232323", ease: "linear", stagger: 1 },
        0
      )
      .to(
        ".section-phone__phone-span",
        { duration: 2, width: "110%", ease: "linear", stagger: 1 },
        0
      );

    phoneLinesTimeline2
      .to(
        ".section-phone__waving-text-line-front",
        { duration: 15, y: "6rem", ease: "linear" },
        0
      )
      .to(
        ".section-phone__waving-text-line-back",
        { duration: 15, y: "-6rem", ease: "linear" },
        0
      )
      .to(
        ".section-phone__waving-text-line-front",
        { duration: 15, y: "0rem", ease: "linear", delay: 15 },
        0
      )
      .to(
        ".section-phone__waving-text-line-back",
        { duration: 15, y: "0rem", ease: "linear", delay: 15 },
        0
      )
      .to(
        ".section-phone__waving-text-line-front",
        { duration: 15, y: "8rem", ease: "linear", delay: 30 },
        0
      )
      .to(
        ".section-phone__waving-text-line-back",
        { duration: 15, y: "-8rem", ease: "linear", delay: 30 },
        0
      )
      .to(
        ".section-phone__waving-text-line-front",
        { duration: 15, y: "0rem", ease: "linear", delay: 45 },
        0
      )
      .to(
        ".section-phone__waving-text-line-back",
        { duration: 15, y: "0rem", ease: "linear", delay: 45 },
        0
      );

    phoneLinesTimeline
      .to(
        ".section-phone__waving-text-line-back",
        { duration: 10, x: "50%", ease: "linear" },
        0
      )
      .to(
        ".section-phone__waving-text-line-front",
        { duration: 10, x: "-50%", ease: "linear" },
        0
      );
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDIO ANIMATION
  _studioAnimation() {
    // let studioTimelineEnd = "+=4000px";
    let studioTimelineEnd = "+=3000px";

    if (window.outerWidth < 600) {
      studioTimelineEnd = "+=2000px";
    }

    const studioTimeline = gsap.timeline({
      defaults: { duration: 1.5 },
      scrollTrigger: {
        trigger: this.sectionStudio,
        start: "top 0%",
        end: studioTimelineEnd,
        scrub: 1,
        pin: this.sectionStudio,
      },
    });

    const studioTextLinesTimeline = gsap.timeline({
      defaults: { duration: 1.5 },
      scrollTrigger: {
        trigger: this.sectionStudio,
        start: "top 80%",
        end: studioTimelineEnd,
        scrub: 1,
      },
    });

    studioTextLinesTimeline
    .to(".section-moving-line__moving-text-back", {
      duration: 30,
      x: "-10%",
      ease: "linear",
    }, 0)
    .to(".section-moving-line__moving-text-front", {
      duration: 30,
      x: "10%",
      ease: "linear",
    }, 0)

    
    // let studioContentY = "-27vh";
    let studioContentY = "-31vh";

    if (window.outerWidth < 950 && window.outerHeight < 520) {
      studioContentY = "-31vh";
    }

    studioTimeline
      .to(
        ".section-moving-line__content",
        { duration: 20, opacity: 0, ease: "linear" },
        0
      )
      .to(
        ".section-moving-line__footer",
        { duration: 20, opacity: 0.4, ease: "linear" },
        0
      )
      // .add('studioAppear')
      .to(
        ".section-studio__studio",
        { duration: 20, scale: 1, opacity: 1, ease: "linear" },
        1
      )
      .to(
        ".section-studio__studio-glass",
        { duration: 20, opacity: 1, ease: "linear", delay: 10 },
        1
      )
      .to(".section-moving-line__footer", { duration: 25, y: "-40vh", ease: "linear" }, 1)
      // .add('contentToTop')
      .to(".section-studio__studio-content", { duration: 20, y: studioContentY })
      .add("studioContentDisappear")
      .to(
        ".section-moving-line",
        { duration: 10, autoAlpha: 0, ease: "linear" },
        "studioContentDisappear"
      )
      .to(
        ".section-studio__studio-content",
        { duration: 10, autoAlpha: 0, ease: "linear" },
        "studioContentDisappear"
      )
      .add("blockContactsAppear")
      .to(
        ".section-contacts",
        { duration: 15, opacity: 0.4, ease: "linear" },
        "blockContactsAppear"
      )
      .add("studioDisappear")
      .to(
        ".section-studio__studio",
        { duration: 15, scale: 3, autoAlpha: 0, ease: "linear" },
        "studioDisappear"
      )
      .to(
        ".section-studio__studio-glass",
        { duration: 15, autoAlpha: 0, ease: "linear" },
        "studioDisappear"
      )
      .to(
        ".section-contacts",
        { duration: 25, opacity: 1, ease: "linear", delay: 5 },
        "studioDisappear"
      )
      .to(".section-contacts__image-disc", {
        duration: 10,
        x: "20%",
        rotate: 360,
        ease: "linear",
      });
  }
}

new AppAnimations();
