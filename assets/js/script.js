// Only used for the existing iOS-specific disc positioning.
function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

class AppAnimations {
  constructor() {
    this._DOMSelection();
    this._librariesPluginsInit();
    this._navigation();
    this._lazyVideo();
    this._preloaderAnimation();

    if (!window.gsap || !window.ScrollTrigger) {
      document.documentElement.classList.add("animations-unavailable");
      console.warn("NUEF: animation scripts are unavailable; showing static content.");
      return;
    }

    this._resize();
    this._headerAnimation();
    this._welcomeToNuefAnimation();
    this._connectAnimation();
    this._phoneAnimation();
    this._studioAnimation();

    // Pin measurements must be calculated after all scenes are registered.
    if (typeof ScrollTrigger.sort === "function") ScrollTrigger.sort();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM SELECTION
  _DOMSelection() {
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
    this.rightArm = document.querySelector(".section-disc__right-arm");
    this.leftArm = document.querySelector(".section-disc__left-arm");
    this.circleBlockBorder = document.querySelector(".section-disc__circle-block__border");
    this.headerButton = document.querySelector(".header__navigation-top__button");
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INITIALIZATION OF LIBRARIES & PLUGINS
  _librariesPluginsInit() {
    // The original NUEF used SmoothScroll for eased mouse-wheel/trackpad input.
    // It was removed during the static-demo optimization, leaving only smooth
    // anchor navigation. Use it on desktop, with native scrolling as fallback.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (typeof window.SmoothScroll === "function" && !reducedMotion && !coarsePointer) {
      window.SmoothScroll({
        animationTime: 600,
        stepSize: 75,
        accelerationDelta: 20,
        accelerationMax: 2,
        keyboardSupport: true,
        arrowScroll: 50,
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,
        touchpadSupport: true,
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      // Address-bar height changes should not continually rebuild pinned scenes.
      if (typeof ScrollTrigger.config === "function") {
        ScrollTrigger.config({ ignoreMobileResize: true });
      }
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NAVIGATION / RESIZE
  _navigation() {
    const sections = [this.header, this.sectionEqualiser, this.sectionDisc, this.sectionPhone, this.sectionStudio];
    const navItems = [this.aboutLink, this.artistsLink, this.recordsLink, this.dailyLink];
    const sectionLinks = new Map([
      [this.sectionEqualiser, this.aboutLink],
      [this.sectionDisc, this.artistsLink],
      [this.sectionPhone, this.recordsLink],
      [this.sectionStudio, this.dailyLink],
    ]);

    // #contact sits inside a pinned GSAP scene. Native hash navigation jumps
    // to its untransformed document position, before the finale is visible.
    document.querySelectorAll('a[href="#contact"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const finale = document.getElementById("contact");
        if (!finale) return;
        event.preventDefault();
        const trigger = window.ScrollTrigger?.getAll().find((item) =>
          item.vars.trigger === this.sectionStudio && item.vars.pin === this.sectionStudio
        );
        if (trigger) {
          window.scrollTo({ top: Math.max(0, trigger.end - 24), behavior: "smooth" });
        } else {
          finale.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Use native anchor navigation; don't capture scrolling at the document level.
    this.fixedNavLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navItems.forEach((link) => link.classList.remove("active"));
          const active = sectionLinks.get(entry.target);
          if (active) active.classList.add("active");
        });
      }, { threshold: 0.45 });
      sections.forEach((section) => observer.observe(section));
    }
  }

  _resize() {
    // ScrollTrigger can recalculate pins and end distances; a full page reload
    // destroys UI state and causes loops when mobile browser chrome changes size.
    let resizeFrame = 0;
    let previousWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (Math.abs(window.innerWidth - previousWidth) < 2) return;
      previousWidth = window.innerWidth;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }, { passive: true });

    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
  }

  _scrollDistance(section) {
    // Pinned distance determines the amount of scroll needed to play each
    // GSAP scene. SmoothScroll affects wheel input, not these distances.
    // Keep all pacing controls together so sections remain easy to tune.
    const mobile = window.innerWidth < 600;
    const ratios = mobile
      ? { header: 1.035, disc: 1.35, phone: 1.485, studio: 2.07 }
      : { header: 1.305, disc: 1.53, phone: 1.71, studio: 2.43 };
    return Math.round(Math.max(480, window.innerHeight * ratios[section]));
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAZY VIDEO LOADING
  _lazyVideo() {
    const video = document.querySelector(".section-contacts__video");
    if (!video) return;
    const load = () => {
      video.querySelectorAll("source[data-src]").forEach((source) => {
        source.src = source.dataset.src;
        delete source.dataset.src;
      });
      video.load();
      video.play().catch(() => {});
    };
    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        load();
        observer.disconnect();
      }
    }, { rootMargin: "500px" });
    observer.observe(video);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRELOADER: single completion path and independent of optional CDNs
  _preloaderAnimation() {
    const finish = () => {
      if (this._preloaderFinished) return;
      this._preloaderFinished = true;
      document.documentElement.classList.add("is-loaded");
      if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
      const preloader = document.querySelector(".preloader");
      if (preloader) {
        preloader.addEventListener("transitionend", () => preloader.remove(), { once: true });
        setTimeout(() => preloader.remove(), 750);
      }
    };
    if (document.readyState === "complete") {
      setTimeout(finish, 400);
    } else {
      window.addEventListener("load", () => setTimeout(finish, 400), { once: true });
    }
    // Slow external fonts/JS/video must never lock the entire page.
    setTimeout(finish, 2400);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HEADER ANIMATION
  _headerAnimation() {
    const headerTimelineEnd = () => `+=${this._scrollDistance("header")}`;

    const headerTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.header,
        start: "top 0%",
        end: headerTimelineEnd,
        invalidateOnRefresh: true,
        scrub: 0.8,
        pin: this.header,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    let rotateSides = 40;
    let rotateCenter = 20;
    let crowdY = "25vh";

    if (window.innerWidth < 950 && window.innerHeight < 520) {
      crowdY = "35vh";
    }

    if (window.innerWidth > 2600) {
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
      .to(".header__smoke", { duration: 2.5, opacity: 1, delay: 1 }, 0)
      .to(".header__spotlight-center", { duration: 3.25, opacity: 0.35, delay: 1 }, 0)

      .to(".header__spotlights-pink", { duration: 3.25, opacity: 1, delay: 1 }, 0)
      .to(".header__spotlights-white", { duration: 2.5, opacity: 1, delay: 1 }, 0)
      .to(".header__spotlights-white-center", { duration: 2.5, opacity: 1, delay: 1 }, 0)
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
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.header,
        start: "top 0%",
        end: () => `+=${this._scrollDistance("header")}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
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
    let discRight = "40vw";
    let discTop = "0%";

    if (window.innerWidth < 900) {
      // Keep the animated disc inside the mobile scene instead of sending it
      // most of a disc-width beyond the right edge of the viewport.
      discRight = "14vw";
      discTop = "8%";
    } else if (window.innerWidth > 2500) {
      discRight = "60vw";
      discTop = "20%";
    }

    const connectAnimationTimelineEnd = () => `+=${this._scrollDistance("disc")}`;

    const connectAnimationTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.sectionDisc,
        start: "top 0%",
        end: connectAnimationTimelineEnd,
        scrub: 0.8,
        invalidateOnRefresh: true,
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
            "linear-gradient(90deg, #0400ff 0%, #a40cea 53.13%, #ec0a7a 100%)",
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
      .to(".section-disc__title__span-right", { duration: 1.5, x: '-1.3rem', delay: .4 }, 1)
      .to(".section-disc__info", { duration: 1, autoAlpha: 1, delay: .4 }, 1)
      .to(".section-disc__spotlight", { duration: 1, autoAlpha: 1, delay: .4 }, 1)
      // .to(".section-disc__title__span-right", { duration: 2, x: 0 }, 1);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PHONE ANIMATION
  _phoneAnimation() {
    const phoneTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.sectionPhone,
        start: "top top",
        end: () => `+=${this._scrollDistance("phone")}`,
        scrub: 0.8,
        pin: this.sectionPhone,
        invalidateOnRefresh: true,
      },
    });

    // Text color, line fills and background waves share ONE scroll progress.
    // Previously three separate triggers stretched beyond the pinned section.
    phoneTimeline
      .to(".section-phone__phone-line", {
        duration: 3, color: "#232323", ease: "none", stagger: 0.65,
      }, 0)
      .to(".section-phone__phone-span", {
        duration: 3, width: "110%", ease: "none", stagger: 0.65,
      }, 0)
      .to(".section-phone__waving-text-line-back", {
        duration: 9, x: "50%", ease: "none",
      }, 0)
      .to(".section-phone__waving-text-line-front", {
        duration: 9, x: "-50%", ease: "none",
      }, 0)
      .to(".section-phone__waving-text-line-front", {
        keyframes: [{ y: "6rem" }, { y: 0 }, { y: "8rem" }, { y: 0 }],
        duration: 9, ease: "none",
      }, 0)
      .to(".section-phone__waving-text-line-back", {
        keyframes: [{ y: "-6rem" }, { y: 0 }, { y: "-8rem" }, { y: 0 }],
        duration: 9, ease: "none",
      }, 0);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDIO ANIMATION
  _studioAnimation() {
    const studioTimelineEnd = () => `+=${this._scrollDistance("studio")}`;

    const studioTimeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "none" },
      scrollTrigger: {
        trigger: this.sectionStudio,
        start: "top 0%",
        end: studioTimelineEnd,
        scrub: 0.8,
        invalidateOnRefresh: true,
        pin: this.sectionStudio,
      },
    });

    const studioTextLinesTimeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "none" },
      scrollTrigger: {
        trigger: this.sectionStudio,
        start: "top 80%",
        end: studioTimelineEnd,
        scrub: 0.8,
        invalidateOnRefresh: true,
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

    if (window.innerWidth < 950 && window.innerHeight < 520) {
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

document.addEventListener("DOMContentLoaded", () => new AppAnimations());
