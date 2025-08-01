function handleResize() {
  window.innerWidth !== previousWindowWidth &&
    (clearTimeout(resizeTimer),
    (resizeTimer = setTimeout(function () {
      (isMobile = window.innerWidth < 480),
        (isMobileLandscape = window.innerWidth < 768),
        (isTablet = window.innerWidth < 992),
        animateTracksGrid(),
        initParallax(),
        (previousWindowWidth = window.innerWidth);
    }, 250)));
}
function supportsTouch() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function initSplit() {
  let e = document.querySelectorAll('[data-split="words"]'),
    t = document.querySelectorAll("[data-load-ghost]");
  new SplitText(e, { type: "words", wordsClass: "single-word" }),
    Array.from(t).map((e) => {
      if (e.hasAttribute("split-ran")) return;
      let t = new SplitText(e, { type: "lines", linesClass: "single-line" });
      return (
        t.lines.forEach((t) => {
          let r = document.createElement("div");
          r.classList.add("single-line-wrap"),
            "dark" === e.getAttribute("data-load-ghost") &&
              r.setAttribute("data-theme", "dark"),
            t.parentNode.insertBefore(r, t),
            r.appendChild(t);
        }),
        t
      );
    });
}
function initTextAnimations() {
  document.querySelectorAll('[data-split="words"]').forEach((e) => {
    words = e.querySelectorAll(".single-word");
    const t = e.getAttribute("data-stagger") || 0.05;
    gsap.set(words, { autoAlpha: 0, yPercent: 25 }),
      gsap.to(words, {
        yPercent: 0,
        autoAlpha: 1,
        stagger: t,
        scrollTrigger: { trigger: e, start: "top 90%", once: !0 },
      });
  });
}
function createGhostLoader() {
  document.querySelectorAll(".single-line-wrap").forEach((e) => {
    const t = "dark" === e.getAttribute("data-theme"),
      r = t ? "#31404E" : "#DFDFDF",
      o = t ? "#5A6D7F" : "#BBBEC0",
      a = document.createElement("div");
    a.classList.add("ghost-loader"),
      (a.style.position = "absolute"),
      (a.style.top = "0px"),
      (a.style.left = "0px"),
      (a.style.width = "103%"),
      (a.style.height = "110%"),
      (a.style.backgroundColor = r),
      (a.style.borderRadius = "4px"),
      (a.style.zIndex = "1"),
      (e.style.position = "relative"),
      e.appendChild(a),
      gsap
        .timeline({
          scrollTrigger: {
            trigger: e,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        })
        .to(a, {
          backgroundColor: o,
          duration: 0.4,
          ease: "power1.inOut",
          repeat: 1,
          yoyo: !0,
          delay: 5e-4 * e.offsetTop,
        })
        .to(a, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            a.remove();
          },
        });
  });
}
function initLoader() {
  let e = document.querySelector(".load-w");
  if (!e) return;
  let t = e.querySelector(".load-modal__close"),
    r = e.querySelector(".load-modal__bar"),
    o = r.querySelectorAll("span"),
    a = r.querySelector("p"),
    n = !1;
  const i = e.querySelectorAll(".load-bar-block"),
    l = e.querySelectorAll(".load-text"),
    s = e.querySelector(".load-bottom"),
    c = e.querySelector(".card-grid__icon"),
    d = e.querySelector(".load-modal"),
    u = (e.querySelector(".load-cover"), e.querySelectorAll(".card-bg-block")),
    g = e.querySelector(".card-grid__inner");
  let p = gsap.timeline({
    defaults: {
      onStart: () => {
        lenis.stop();
      },
      onComplete: () => {
        lenis.start();
      },
    },
  });
  prefersRM
    ? p
        .to(i, { opacity: 1, stagger: 0.1 })
        .to(
          { progress: 0 },
          {
            progress: 100,
            duration: 2,
            ease: "none",
            onUpdate: function () {
              l[1].textContent = Math.round(this.targets()[0].progress) + "%";
            },
          },
          0
        )
        .to(e, { autoAlpha: 0, duration: 0.8 })
        .set(".main-w", { clipPath: "inset(0vh 0vw)", autoAlpha: 0 }, "<")
        .to(
          ".main-w",
          {
            autoAlpha: 1,
            duration: 0.8,
            onComplete: () => {
              gsap.set(".main-w", { height: "auto" }),
                ScrollTrigger.refresh(),
                document.body.setAttribute("data-scrolling-direction", "up"),
                document.body.setAttribute("data-scrolling-started", "false"),
                document.body.setAttribute("data-scrolling-end", "false"),
                e.remove(),
                gsap.to(".nav-inner", { y: "0%" });
            },
          },
          "<"
        )
    : p
        .to(i, { opacity: 1, stagger: 0.1 })
        .to(
          { progress: 0 },
          {
            progress: 100,
            duration: 2,
            ease: "none",
            onUpdate: function () {
              l[1].textContent = Math.round(this.targets()[0].progress) + "%";
            },
          },
          0
        )
        .to(i, { opacity: 0, stagger: 0.01 })
        .to(s, { height: "0px" }, "<+=0.2")
        .to(c, { xPercent: 800 }, "<")
        .to(s, { autoAlpha: 0, duration: 0.001 }, ">-=0.1")
        .to(u, { autoAlpha: 0, stagger: { each: 0.005, from: "center" } }, "<")
        .to(g, { scale: 0 }, "<")
        .to(d, { height: "100vh", width: "100vw", duration: 1.25 })
        .to(
          ".main-w",
          {
            clipPath: "inset(0vh 0vw)",
            duration: 1.2,
            onComplete: () => {
              gsap.set(".main-w", { height: "auto" }),
                ScrollTrigger.refresh(),
                document.body.setAttribute("data-scrolling-direction", "up"),
                document.body.setAttribute("data-scrolling-started", "false"),
                document.body.setAttribute("data-scrolling-end", "false"),
                e.remove(),
                gsap.to(".nav-inner", { y: "0%" });
            },
          },
          "<"
        )
        .to(r, { yPercent: -100, duration: 1.2 }, "<"),
    t.addEventListener("click", () => {
      if (n) return;
      n = !0;
      let e = o[0].innerText,
        t = o[1].innerText,
        r = a.innerText;
      gsap.to(o[0], { scrambleText: { text: "<come-on>" } }),
        gsap.to(o[1], { scrambleText: { text: "</come-on>" } }),
        gsap.to(a, {
          scrambleText: { text: "You just got here!", chars: "lowercase" },
        }),
        gsap.delayedCall(2, () => {
          gsap.to(o[0], { scrambleText: { text: e } }),
            gsap.to(o[1], { scrambleText: { text: t } }),
            gsap.to(a, { scrambleText: { text: r, chars: "lowercase" } }),
            (n = !1);
        });
    });
}
function initHeroInteractions() {
  let e = document.querySelectorAll(".hero-key"),
    t = document.querySelector(".hero-hand"),
    r = !1;
  e.forEach((e) => {
    const o = e.querySelector(".key-base-left"),
      a = e.querySelectorAll(".key-base-right"),
      n = e.querySelectorAll(".key-top"),
      i = e.querySelector(".key-letter");
    e.addEventListener("mouseenter", () => {
      gsap.to(o, {
        duration: 0.335,
        scaleY: 0.85,
        scaleX: 0.94,
        transformOrigin: "right bottom",
      }),
        gsap.to(a, {
          duration: 0.335,
          scaleY: 0.92,
          transformOrigin: "left bottom",
        }),
        gsap.to(n, { duration: 0.335, xPercent: 4, yPercent: 12 }),
        gsap.to(i, { duration: 0.335, xPercent: 10, yPercent: 30 });
    }),
      e.addEventListener("mouseleave", () => {
        gsap.to([o, a], { duration: 0.335, scaleY: 1, scaleX: 1 }),
          gsap.to([n, i], { duration: 0.335, xPercent: 0, yPercent: 0 });
      }),
      e.addEventListener("click", () => {
        r ||
          ((r = !0),
          gsap.to(t, {
            rotate: 8,
            duration: 0.25,
            ease: "back.inOut(5)",
            repeat: 1,
            onComplete: () => {
              gsap.to(t, { rotate: 0, duration: 0.25 }), (r = !1);
            },
          }));
      });
  });
}
function initMobileMenu() {
  const e = document.querySelector(".menu-button"),
    t = document.querySelectorAll(".nav-link"),
    r = document.querySelector(".menu-bg");
  e.addEventListener("click", () => {
    const e = "true" === document.body.getAttribute("data-menu-open");
    document.body.setAttribute("data-menu-open", (!e).toString());
  }),
    t.forEach((t) => {
      t.addEventListener("click", () => {
        e.click();
      });
    }),
    r.addEventListener("click", () => {
      e.click();
    });
}
function initWiggles() {
  document.querySelectorAll("[data-in-view]").forEach((e) => {
    ScrollTrigger.create({
      trigger: e,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        e.setAttribute("data-in-view", "true"),
          (function (e) {
            e.querySelectorAll("[data-wiggle]").forEach((e) => {
              const t =
                parseFloat(e.getAttribute("data-wiggle-amplitude")) || 5;
              gsap
                .timeline({ repeat: -1, repeatRefresh: !0 })
                .to(e, {
                  duration: gsap.utils.random(1.2, 2),
                  x: `random(${-t}, ${t})`,
                  y: `random(${-t}, ${t})`,
                  ease: "sui-wiggle",
                });
            });
          })(e);
      },
      onLeave: () => {
        e.setAttribute("data-in-view", "false");
      },
      onEnterBack: () => {
        e.setAttribute("data-in-view", "true");
      },
      onLeaveBack: () => {
        e.setAttribute("data-in-view", "false");
      },
    });
  });
}
function initDetectScrollingDirection() {
  let e = 0;
  window.addEventListener("scroll", () => {
    const t = window.scrollY;
    if (Math.abs(e - t) >= 10) {
      const r = t > e ? "down" : "up";
      document
        .querySelectorAll("[data-scrolling-direction]")
        .forEach((e) => e.setAttribute("data-scrolling-direction", r));
      const o = t > 50;
      document
        .querySelectorAll("[data-scrolling-started]")
        .forEach((e) =>
          e.setAttribute("data-scrolling-started", o ? "true" : "false")
        ),
        (e = t);
    }
  });
}
function initCheckSectionThemeScroll() {
  function e() {
    document.querySelectorAll("[data-theme-section]").forEach(function (e) {
      const t = e.getBoundingClientRect(),
        o = t.top,
        a = t.bottom;
      if (o <= r && a >= r) {
        const t = e.getAttribute("data-theme-section");
        document.querySelectorAll("[data-theme-nav]").forEach(function (e) {
          e.getAttribute("data-theme-nav") !== t &&
            e.setAttribute("data-theme-nav", t);
        });
      }
    });
  }
  const t = document.querySelector("[data-nav-bar-height]"),
    r = t ? t.offsetHeight / 2 : 0;
  e(), document.addEventListener("scroll", e);
}
function initMagneticEffect() {
  function e(e) {
    const t = e.currentTarget,
      r = t.getBoundingClientRect(),
      o = parseFloat(t.getAttribute("data-magnetic-strength")) || 30,
      a = t.querySelector("[data-magnetic-inner-target]"),
      n = parseFloat(t.getAttribute("data-magnetic-strength-inner")) || o,
      i = ((e.clientX - r.left) / t.offsetWidth - 0.5) * (o / 16),
      l = ((e.clientY - r.top) / t.offsetHeight - 0.5) * (o / 16);
    if (
      (gsap.to(t, {
        x: i + "em",
        y: l + "em",
        rotate: "0.001deg",
        ease: "power4.out",
        duration: 1.6,
      }),
      a)
    ) {
      const o = ((e.clientX - r.left) / t.offsetWidth - 0.5) * (n / 16),
        i = ((e.clientY - r.top) / t.offsetHeight - 0.5) * (n / 16);
      gsap.to(a, {
        x: o + "em",
        y: i + "em",
        rotate: "0.001deg",
        ease: "power4.out",
        duration: 2,
      });
    }
  }
  function t(e) {
    const t = e.currentTarget,
      r = t.querySelector("[data-magnetic-inner-target]");
    gsap.to(t, {
      x: "0em",
      y: "0em",
      ease: "elastic.out(1, 0.3)",
      duration: 1.6,
      clearProps: "all",
    }),
      r &&
        gsap.to(r, {
          x: "0em",
          y: "0em",
          ease: "elastic.out(1, 0.3)",
          duration: 2,
          clearProps: "all",
        });
  }
  const r = document.querySelectorAll("[data-magnetic-strength]");
  window.innerWidth <= 991 ||
    r.forEach((r) => {
      r.addEventListener("mousemove", e), r.addEventListener("mouseleave", t);
    });
}
function initParallax() {
  const e = document.querySelectorAll('[data-parallax="trigger"]');
  isTablet ||
    e.forEach((e) => {
      const t = e.getAttribute("data-parallax-direction") || "vertical",
        r = parseFloat(e.getAttribute("data-parallax-scrub")) || !0,
        o = parseFloat(e.getAttribute("data-parallax-start")) || 20,
        a = parseFloat(e.getAttribute("data-parallax-end")) || -20,
        n = e.getAttribute("data-parallax-scroll-start") || "top bottom",
        i = e.getAttribute("data-parallax-scroll-end") || "bottom top",
        l = e.querySelector('[data-parallax="target"]') || e,
        s = "horizontal" === t ? "xPercent" : "yPercent";
      gsap.fromTo(
        l,
        { [s]: o },
        {
          [s]: a,
          ease: "none",
          scrollTrigger: { trigger: e, start: n, end: i, scrub: r },
        }
      );
    });
}
function animateTracksGrid() {
  const e = document.querySelector("[data-tracks-grid]"),
    t = e.querySelectorAll("[data-tracks-item]:nth-child(3n + 2)"),
    r = e.querySelectorAll("[data-tracks-item]:nth-child(3n)");
  if (isTablet) {
    if (isTablet) {
      const t = e.querySelectorAll("[data-tracks-item]:nth-child(2n)");
      if (isMobileLandscape) return;
      t.forEach((t) => {
        gsap.fromTo(
          t,
          { yPercent: 75 },
          {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: e,
              start: "top bottom",
              end: "bottom top",
              scrub: !0,
            },
          }
        );
      });
    }
  } else
    gsap.fromTo(
      t,
      { yPercent: 40 },
      {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: e,
          start: "top bottom",
          end: "bottom top",
          scrub: !0,
        },
      }
    ),
      gsap.fromTo(
        r,
        { yPercent: 80 },
        {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            scrub: !0,
          },
        }
      );
}
function initTracksLotties() {
  document
    .querySelector("[data-tracks-grid]")
    .querySelectorAll("[data-tracks-item]")
    .forEach((e) => {
      const t = e.querySelector(".tracks-card__visual [data-lottie]");
      if (!t) return;
      if (isTablet)
        return void lottie
          .loadAnimation({
            container: t,
            renderer: "svg",
            loop: !0,
            autoplay: !0,
            path: t.getAttribute("data-lottie"),
          })
          .addEventListener("DOMLoaded", () => {
            const e = t.parentElement.querySelector("img");
            e && e.remove();
          });
      const r = lottie.loadAnimation({
          container: t,
          renderer: "svg",
          loop: !1,
          autoplay: !1,
          path: t.getAttribute("data-lottie"),
        }),
        o = t.hasAttribute("data-no-freeze");
      let a = 0;
      const n = { frame: 0 };
      let i = null;
      r.addEventListener("DOMLoaded", () => {
        (a = r.totalFrames), (n.frame = r.currentFrame);
        const l = t.parentElement.querySelector("img");
        l && l.remove(),
          e.addEventListener("mouseenter", () => {
            i && i.kill(),
              n.frame >= a - 1 && ((n.frame = 0), r.goToAndStop(0, !0));
            const e = o ? a : 120,
              t = Math.abs(e - n.frame) / 60;
            i = gsap.to(n, {
              frame: e,
              duration: t,
              ease: "none",
              onUpdate() {
                r.goToAndStop(Math.round(n.frame), !0);
              },
            });
          }),
          e.addEventListener("mouseleave", () => {
            i && i.kill();
            const e = a - 1,
              t = Math.abs(e - n.frame) / 60;
            i = gsap.to(n, {
              frame: e,
              duration: t,
              ease: "none",
              onUpdate() {
                r.goToAndStop(Math.round(n.frame), !0);
              },
            });
          });
      });
    });
}
function initPrizeCardReveals() {
  document.querySelectorAll(".prizes-row").forEach((e) => {
    const t = e.querySelectorAll(".prizes-card");
    gsap.fromTo(
      t,
      { yPercent: 40, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.05,
        duration: 0.725,
        scrollTrigger: { trigger: e, start: "top 80%", once: !0 },
      }
    );
  });
}
function initStars() {
  document.querySelectorAll("[data-star-wrap]").forEach((e) => {
    ScrollTrigger.create({
      trigger: e,
      start: "top bottom+=500",
      onEnter: () => {
        if (!e.dataset.starInit) {
          const t = e.querySelectorAll("[data-star]"),
            r = 0.75,
            o = Array.from({ length: t.length }, (e, o) => (o / t.length) * r);
          for (let e = o.length - 1; e > 0; e--) {
            const t = Math.floor(Math.random() * (e + 1));
            [o[e], o[t]] = [o[t], o[e]];
          }
          t.forEach((e, t) => {
            const r = lottie.loadAnimation({
              container: e,
              renderer: "svg",
              loop: !0,
              autoplay: !1,
              path: e.getAttribute("data-star"),
            });
            setTimeout(() => {
              r.play();
            }, 1e3 * o[t]);
          }),
            (e.dataset.starInit = "true");
        }
      },
    });
  });
}
function initSponsorFlip() {
  const e = document.querySelectorAll("[data-sponsor-item]"),
    t = document.querySelector("[data-sponsor-bg]");
  if (prefersRM) gsap.set(t, { display: "none" });
  else {
    const r = ["#4DA2FF", "#FFD731", "#E9CCFF", "#55DB9C"];
    e.forEach((e) => {
      e.addEventListener("mouseenter", () => {
        const o = r[Math.floor(Math.random() * r.length)];
        gsap.to(t, { background: o, duration: 0.425, ease: "power3" });
        const a = Flip.getState(t);
        e.appendChild(t), Flip.from(a, { duration: 0.425, ease: "power3" });
      });
    });
  }
}
function initCanvasGrid() {
  function e() {
    const e = document.querySelector(".events-bg");
    (r.width = e.offsetWidth),
      (r.height = e.offsetHeight),
      (n = isMobileLandscape ? 7 : 28),
      (l = r.width / n),
      (i = Math.ceil(r.height / l)),
      (s = []);
    for (let e = 0; e < i; e++)
      for (let t = 0; t < n; t++)
        s.push({ x: t * l, y: e * l, color: "white", alpha: 0 });
  }
  function t() {
    o.clearRect(0, 0, r.width, r.height),
      s.forEach((e) => {
        (o.fillStyle = e.color),
          (o.globalAlpha = e.alpha),
          o.fillRect(e.x, e.y, l, l),
          (o.globalAlpha = 1),
          (o.strokeStyle = "rgba(77,162,255,0.35)"),
          (o.lineWidth = 2),
          o.strokeRect(e.x, e.y, l, l);
      }),
      requestAnimationFrame(t);
  }
  const r = document.createElement("canvas");
  document.querySelector(".events-bg").appendChild(r);
  const o = r.getContext("2d"),
    a = ["#55DB9C", "#00BFFF", "#7A69FA"];
  let n,
    i,
    l,
    s,
    c = null;
  prefersRM ||
    supportsTouch() ||
    r.addEventListener("mousemove", (e) => {
      const t = r.getBoundingClientRect(),
        o = e.clientX - t.left,
        n = e.clientY - t.top;
      let i = s.findIndex(
        (e) => o >= e.x && o < e.x + l && n >= e.y && n < e.y + l
      );
      if (-1 !== i && i !== c) {
        let e = s[i];
        (e.color = a[Math.floor(Math.random() * a.length)]),
          gsap.to(e, { alpha: 1, duration: 0.1 }),
          (function (e) {
            gsap.to(e, { alpha: 0, duration: 2, delay: 0.5 });
          })(e),
          (c = i);
      }
    }),
    window.addEventListener("resize", () => {
      e(), t();
    }),
    e(),
    t();
}
function initFaq() {
  let e = document.querySelectorAll(".faq-item");
  e.forEach((t) => {
    let r = t.querySelector(".faq-button"),
      o = t.querySelector(".faq-answer");
    r.addEventListener("click", () => {
      e.forEach((e) => {
        e !== t &&
          "open" === e.getAttribute("data-state") &&
          e.querySelector(".faq-button").click();
      }),
        "closed" === t.getAttribute("data-state")
          ? (t.setAttribute("data-state", "open"),
            gsap.to(o, {
              height: "auto",
              onComplete: () => {
                ScrollTrigger.refresh();
              },
            }))
          : (t.setAttribute("data-state", "closed"),
            gsap.to(o, {
              height: 0,
              duration: 0.65,
              onComplete: () => {
                ScrollTrigger.refresh();
              },
            }));
    });
  });
}
function initFooter() {
  const e = document.querySelector("[data-footer]");
  ScrollTrigger.create({
    trigger: e,
    start: "top bottom",
    onEnter: () => {
      document.body.setAttribute("data-scrolling-end", "true");
    },
    onLeaveBack: () => {
      document.body.setAttribute("data-scrolling-end", "false");
    },
  });
  const t = e.querySelector("[data-lottie]");
  ScrollTrigger.create({
    trigger: e,
    start: "top bottom+=500",
    onEnter: () => {
      lottie.loadAnimation({
        container: t,
        renderer: "svg",
        loop: !0,
        autoplay: !0,
        path: t.getAttribute("data-lottie"),
      });
    },
  });
  const r = setInterval(() => {
    const e = document.querySelector("iframe");
    if (e && e.contentWindow.document.querySelector('input[type="submit"]')) {
      clearInterval(r);
      let t = document.getElementById("email-form"),
        o = document.getElementById("success-message");
      const a = document.getElementById("email"),
        n = document.getElementById("Agreement"),
        i = document.getElementById("submit-static-form"),
        l = e.contentWindow.document,
        s = l.querySelector('input[name="email"]'),
        c = l.querySelector(
          'input[name="LEGAL_CONSENT.subscription_type_73561157"]'
        ),
        d = l.querySelector('input[type="submit"]');
      a &&
        s &&
        a.addEventListener("input", (e) => {
          s.value = e.target.value;
          const t = new Event("input", { bubbles: !0 });
          s.dispatchEvent(t);
        }),
        n &&
          c &&
          n.addEventListener("change", (e) => {
            e.target.checked !== c.checked && c.click();
          }),
        i &&
          d &&
          i.addEventListener("click", (e) => {
            e.preventDefault(),
              d.click(),
              (t.style.display = "none"),
              (o.style.display = "block");
          });
    }
  }, 100);
}
gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  CustomEase,
  Flip,
  ScrambleTextPlugin
),
  CustomEase.create("sui-sine", "0.525, 0, 0, 1"),
  CustomEase.create("sui-wiggle", "0.33, 0.00, 0.67, 1.00");
const lenis = new Lenis({ autoRaf: !0 });
lenis.on("scroll", ScrollTrigger.update),
  gsap.ticker.add((e) => {
    lenis.raf(1e3 * e);
  }),
  gsap.ticker.lagSmoothing(0),
  gsap.defaults({ ease: "sui-sine", duration: 0.525 });
let resizeTimer,
  isMobile = window.innerWidth < 480,
  isMobileLandscape = window.innerWidth < 768,
  isTablet = window.innerWidth < 992,
  previousWindowWidth = window.innerWidth;
window.addEventListener("resize", handleResize);
let prefersRM = prefersReducedMotion();
document.fonts.ready.then(() => {
  prefersRM || (initSplit(), initTextAnimations(), createGhostLoader());
}),
  initLoader(),
  initHeroInteractions(),
  isMobileLandscape && initMobileMenu(),
  prefersRM || initWiggles(),
  initDetectScrollingDirection(),
  initCheckSectionThemeScroll(),
  prefersRM || initMagneticEffect(),
  prefersRM || initParallax(),
  prefersRM || animateTracksGrid(),
  prefersRM || initTracksLotties(),
  prefersRM || initPrizeCardReveals(),
  prefersRM || initStars(),
  initSponsorFlip(),
  initCanvasGrid(),
  initFaq(),
  initFooter();
