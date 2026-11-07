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

  const sections = document.querySelectorAll("main section");

  const backToTop = document.querySelector(".back-to-top");

  const copyright = document.querySelector(".copyright");

  // ==========================================
  // 2. SMOOTH SCROLLING
  // ==========================================

  const allInternalLinks = document.querySelectorAll('a[href^="#"]');

  allInternalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      const navigationHeight = navigation ? navigation.offsetHeight : 0;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        navigationHeight -
        12;

      window.scrollTo({
        top: targetPosition,

        behavior: "smooth",
      });
    });
  });

  // ==========================================
  // 3. CREATE SCROLL PROGRESS BAR
  // ==========================================

  const progressBar = document.createElement("div");

  progressBar.className = "scroll-progress";

  document.body.appendChild(progressBar);

  // ==========================================
  // 4. UPDATE NAVIGATION AND SCROLL PROGRESS
  // ==========================================

  function updateScroll() {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollProgress =
      scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

    progressBar.style.width = scrollProgress + "%";

    // Highlight active navigation link

    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 160) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + currentSection;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Show or hide Back to Top button

    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 450);
    }
  }

  window.addEventListener("scroll", updateScroll, {
    passive: true,
  });

  updateScroll();

  // ==========================================
  // 5. REVEAL ANIMATIONS
  // ==========================================

  const revealElements = document.querySelectorAll(
    ".hero-content, " +
      ".section-title, " +
      ".section-description, " +
      ".skill-card, " +
      ".project-card, " +
      ".learning-item, " +
      ".goal-card, " +
      ".goals-summary, " +
      ".contact-details",
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  // Check browser support for IntersectionObserver

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);
          }
        });
      },

      {
        threshold: 0.12,
      },
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("revealed");
    });
  }

  // ==========================================
  // 6. CARD ANIMATION DELAYS
  // ==========================================

  const cardGroups = document.querySelectorAll(
    ".skills-grid, " +
      ".projects-grid, " +
      ".learning-content, " +
      ".goals-content",
  );

  cardGroups.forEach(function (group) {
    Array.from(group.children).forEach(function (card, index) {
      const delay = (index % 4) * 90;

      card.style.setProperty("--reveal-delay", delay + "ms");
    });
  });

  // ==========================================
  // 7. AUTOMATIC COPYRIGHT YEAR
  // ==========================================

  if (copyright) {
    copyright.innerHTML =
      "&lt;&lt; &copy; " +
      new Date().getFullYear() +
      " Abubeker Hussen. All rights reserved. &gt;&gt;";
  }

  // ==========================================
  // 8. CONTACT LINK INTERACTION
  // ==========================================

  const contactLinks = document.querySelectorAll(".contact-details a");

  contactLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      this.classList.add("contact-link-clicked");

      setTimeout(function () {
        link.classList.remove("contact-link-clicked");
      }, 500);
    });
  });

  // ==========================================
  // 9. WELCOME MESSAGE IN CONSOLE
  // ==========================================

  console.log("Welcome to Abubeker Hussen's Portfolio!");

  console.log("Website JavaScript loaded successfully.");
});
