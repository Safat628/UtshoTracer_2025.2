document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    hamburger.innerHTML = mobileMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Dark/Light Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved user preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Solutions Tab Switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Form submission handling (prevent default)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert(
        "Form submitted! In a real implementation, this would send data to your backend."
      );
      this.reset();
    });
  });

  // Update year in footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Contact section animations
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate info items sequentially
          const infoItems = document.querySelectorAll(".info-item");
          infoItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate");
            }, index * 200);
          });

          // Animate form
          const formCard = document.querySelector(".contact-form-card");
          formCard.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  const contactSection = document.querySelector(".contact");
  if (contactSection) {
    contactObserver.observe(contactSection);
  }

  // Floating label functionality
  document
    .querySelectorAll(".floating-input input, .floating-textarea textarea")
    .forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentNode.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (this.value === "") {
          this.parentNode.classList.remove("focused");
        }
      });

      // Initialize if already has value
      if (input.value !== "") {
        input.parentNode.classList.add("focused");
      }
    });
});
