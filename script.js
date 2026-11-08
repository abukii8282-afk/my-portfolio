/* =====================================================
   ABUBEKER HUSSEN - PERSONAL PORTFOLIO WEBSITE
   Interactive JavaScript Features
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. SELECT HTML ELEMENTS
  // ==========================================

  const navigation = document.querySelector(".main-navigation");
  const navLinks = document.querySelectorAll(".nav-list a");
  const sections = document.querySelectorAll("main section[id]");
  const backToTop = document.querySelector(".back-to-top");
  const copyright = document.querySelector(".copyright");

  // Check whether the user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ==========================================
  // 2. ADD JAVASCRIPT STYLES
  // ==========================================

  const style = document.createElement("style");

  style.textContent = `
    html {
      scroll-behavior: ${prefersReducedMotion ? "auto" : "smooth"};
    }

    .nav-list a.active {
      color: var(--primary-color, #38bdf8);
      font-weight: bold;
    }

    .js-reveal {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .js-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 4px;
      background: linear-gradient(90deg, #38bdf8, #6366f1);
      z-index: 9999;
      pointer-events: none;
    }

    .back-to-top {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .js-reveal,
      .back-to-top {
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  // ==========================================
  // 3. SMOOTH SCROLLING
  // ==========================================

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        targetSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });

        history.replaceState(null, "", targetId);
      }
    });
  });

  // ==========================================
  // 4. ACTIVE NAVIGATION HIGHLIGHTING
  // ==========================================

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const linkTarget = link.getAttribute("href");

      if (linkTarget === "#" + currentSection) {
        link.classList.add("active");
        link.setAttribute("aria-current", "location");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavigation);
  updateActiveNavigation();

  // ==========================================
  // 5. SCROLL REVEAL ANIMATIONS
  // ==========================================

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(
      ".about-section, .skill-card, .project-card, " +
        ".learning-item, .goal-card, .goals-summary, .contact-section",
    );

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach(function (element) {
      element.classList.add("js-reveal");
      revealObserver.observe(element);
    });
  }

  // ==========================================
  // 6. SCROLL PROGRESS INDICATOR
  // ==========================================

  const progressBar = document.createElement("div");

  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");

  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  // ==========================================
  // 7. BACK TO TOP BUTTON
  // ==========================================

  if (backToTop) {
    function updateBackToTop() {
      if (window.scrollY > 400) {
        backToTop.style.opacity = "1";
        backToTop.style.pointerEvents = "auto";
        backToTop.style.transform = "translateY(0)";
      } else {
        backToTop.style.opacity = "0.7";
        backToTop.style.pointerEvents = "auto";
        backToTop.style.transform = "translateY(3px)";
      }
    }

    window.addEventListener("scroll", updateBackToTop);
    updateBackToTop();

    backToTop.addEventListener("click", function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      history.replaceState(null, "", window.location.pathname);
    });
  }

  // ==========================================
  // 8. AUTOMATIC COPYRIGHT YEAR
  // ==========================================

  if (copyright) {
    const currentYear = new Date().getFullYear();

    copyright.innerHTML =
      "&lt;&lt; &copy; " +
      currentYear +
      " Abubeker Hussen. All rights reserved. &gt;&gt;";
  }

  // ==========================================
  // 9. EXTERNAL LINKS SECURITY
  // ==========================================

  const externalLinks = document.querySelectorAll('a[target="_blank"]');

  externalLinks.forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });

  // ==========================================
  // 10. WELCOME MESSAGE
  // ==========================================

  console.log("Portfolio JavaScript loaded successfully!");
  console.log("Welcome to Abubeker Hussen's Portfolio Website.");
});
console.log("Thank you for visiting! Feel free to explore and connect.");
