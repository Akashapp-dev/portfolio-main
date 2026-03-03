// ============================================================
// VIEWMODEL LAYER — State management, observers, interactions
// ============================================================

import { navItems, contactInfo } from "../models/data.js";

class AppViewModel {
  constructor() {
    this.currentSection = "home";
    this.isMobileMenuOpen = false;
    this.scrollObserver = null;
    this.animationObserver = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorGlow = null;
    this.rafId = null;
  }

  // ─── Navigation ────────────────────────────────────────────
  navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    this.currentSection = sectionId;
    this.updateActiveNav();
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  updateActiveNav() {
    const links = document.querySelectorAll(".nav__link");
    links.forEach((link) => {
      link.classList.toggle(
        "nav__link--active",
        link.dataset.section === this.currentSection
      );
    });
  }

  // ─── Scroll Observer (highlights nav on scroll) ────────────
  initScrollObserver() {
    const sections = document.querySelectorAll("section[id]");
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id;
            this.updateActiveNav();
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => this.scrollObserver.observe(section));
  }

  // ─── Reveal-on-scroll animations ──────────────────────────
  initAnimations() {
    const animatedEls = document.querySelectorAll(".animate-on-scroll");
    this.animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            this.animationObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedEls.forEach((el) => this.animationObserver.observe(el));
  }

  // ─── Mobile menu ──────────────────────────────────────────
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const menu = document.querySelector(".nav__menu");
    const burger = document.querySelector(".nav__burger");
    if (menu) menu.classList.toggle("nav__menu--open", this.isMobileMenuOpen);
    if (burger)
      burger.classList.toggle("nav__burger--active", this.isMobileMenuOpen);
    document.body.classList.toggle("no-scroll", this.isMobileMenuOpen);
  }

  // ─── Contact form via FormSubmit (AJAX, no redirect) ───────
  async handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    const submitBtn = form.querySelector('#contact-submit');

    // Validate
    if (!name || !name.value.trim()) {
      this.showToast("// Error: name is undefined", "error");
      return;
    }
    if (!email || !email.value.trim()) {
      this.showToast("// Error: email is undefined", "error");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      this.showToast("// TypeError: invalid email format", "error");
      return;
    }
    if (!message || !message.value.trim()) {
      this.showToast("// Error: message is empty", "error");
      return;
    }

    // Disable button while sending
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn__bracket">[</span> Sending... <span class="btn__bracket">]</span>';
    }

    try {
      const formData = new FormData();
      formData.append('name', name.value.trim());
      formData.append('email', email.value.trim());
      formData.append('message', message.value.trim());
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch(contactInfo.formAction, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        this.showToast("✓ Message sent successfully!", "success");
        form.reset();
      } else {
        this.showToast("// Error: server returned " + res.status, "error");
      }
    } catch (err) {
      this.showToast(`// Error: ${err.message || 'network failed'}`, "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn__bracket">[</span> Execute Send <span class="btn__bracket">]</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      }
    }
  }

  showToast(message, type = "success") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.style.fontFamily = "var(--ff-mono)";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("toast--visible"));
    setTimeout(() => {
      toast.classList.remove("toast--visible");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─── Typing effect for hero ───────────────────────────────
  initTypingEffect(element, words, typingSpeed = 100, pauseTime = 2000) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        element.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? typingSpeed / 2 : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        delay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    };

    type();
  }

  // ─── Navbar scroll effect ─────────────────────────────────
  initNavbarScroll() {
    const nav = document.querySelector(".nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INTERACTIVE EFFECTS — Mouse tracking & cursor animations
  // ═══════════════════════════════════════════════════════════

  // ─── Cursor glow follower ─────────────────────────────────
  initCursorGlow() {
    // Don't init on mobile/touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    this.cursorGlow = document.createElement("div");
    this.cursorGlow.className = "cursor-glow";
    document.body.appendChild(this.cursorGlow);

    // Secondary ring
    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    document.body.appendChild(cursorRing);

    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Glow follows instantly
      this.cursorGlow.style.left = `${e.clientX}px`;
      this.cursorGlow.style.top = `${e.clientY}px`;
    });

    // Ring follows with a smooth delay
    const animateRing = () => {
      ringX += (this.mouseX - ringX) * 0.08;
      ringY += (this.mouseY - ringY) * 0.08;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Scale up on interactive elements
    const interactiveEls = "a, button, .skill-card, .project-card, .cert-card, .edu-card, .exp-card__content, input";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveEls)) {
        this.cursorGlow.classList.add("cursor-glow--hover");
        cursorRing.classList.add("cursor-ring--hover");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveEls)) {
        this.cursorGlow.classList.remove("cursor-glow--hover");
        cursorRing.classList.remove("cursor-ring--hover");
      }
    });
  }

  // ─── 3D Card tilt effect ──────────────────────────────────
  initCardTilt() {
    if (window.matchMedia("(hover: none)").matches) return;

    const tiltCards = document.querySelectorAll(
      ".skill-card, .project-card, .cert-card, .edu-card, .exp-card__content"
    );

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Card spotlight — light follows cursor
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty("--spotlight-x", `${percentX}%`);
        card.style.setProperty("--spotlight-y", `${percentY}%`);
        card.classList.add("card--tilting");
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.classList.remove("card--tilting");
      });
    });
  }

  // ─── Hero parallax on mouse move ──────────────────────────
  initHeroParallax() {
    if (window.matchMedia("(hover: none)").matches) return;

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const content = hero.querySelector(".hero__content");
    const particles = hero.querySelector(".hero__particles");

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      if (content) {
        content.style.transform = `translate(${x * -15}px, ${y * -10}px)`;
      }
      if (particles) {
        particles.style.transform = `translate(${x * 25}px, ${y * 20}px)`;
      }
    });

    hero.addEventListener("mouseleave", () => {
      if (content) content.style.transform = "";
      if (particles) particles.style.transform = "";
    });
  }

  // ─── Magnetic button effect ───────────────────────────────
  initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;

    const buttons = document.querySelectorAll(".btn, .footer__social-link");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // ─── Text shimmer on scroll ───────────────────────────────
  initTextShimmer() {
    const titles = document.querySelectorAll(".section__title, .code-title");

    const shimmerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("text-shimmer");
            setTimeout(() => entry.target.classList.remove("text-shimmer"), 1200);
          }
        });
      },
      { threshold: 0.5 }
    );

    titles.forEach((t) => shimmerObserver.observe(t));
  }

  // ─── Staggered counter animation ──────────────────────────
  initCountUp() {
    const badges = document.querySelectorAll(".edu-card__grade-badge");
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("grade-pop");
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    badges.forEach((b) => countObserver.observe(b));
  }

  // ─── Smooth parallax for sections on scroll ───────────────
  initScrollParallax() {
    const sections = document.querySelectorAll(".section");
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const windowH = window.innerHeight;
            if (rect.top < windowH && rect.bottom > 0) {
              const progress = (windowH - rect.top) / (windowH + rect.height);
              const title = section.querySelector(".section__title");
              if (title) {
                title.style.transform = `translateY(${(0.5 - progress) * 30}px)`;
              }
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ─── Initialize everything ────────────────────────────────
  init() {
    this.initScrollObserver();
    this.initAnimations();
    this.initNavbarScroll();

    // Typing effect
    const typingEl = document.querySelector(".hero__typing");
    if (typingEl) {
      this.initTypingEffect(typingEl, [
        "Python Developer",
        "Backend Engineer",
        "API Architect",
      ]);
    }

    // Nav link clicks
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo(link.dataset.section);
      });
    });

    // Burger click
    const burger = document.querySelector(".nav__burger");
    if (burger) {
      burger.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Contact form
    const contactForm = document.getElementById('emailjs-form');
    if (contactForm) {
      contactForm.addEventListener("submit", (e) =>
        this.handleContactSubmit(e)
      );
    }

    // ── Interactive effects ──
    this.initCursorGlow();
    this.initCardTilt();
    this.initHeroParallax();
    this.initMagneticButtons();
    this.initTextShimmer();
    this.initCountUp();
    this.initScrollParallax();

    // Page load animation
    document.body.classList.add("loaded");
  }
}

export default AppViewModel;
