const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const yearEl = document.getElementById("year");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

if (navLinks.length && nav) {
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    })
  );
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for stats animation
const statNumbers = document.querySelectorAll(".stat-number");
if (statNumbers.length > 0) {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated");
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

// Match hero image height to text content height
function alignHeroImage() {
  const heroText = document.querySelector(".hero__text");
  const heroMedia = document.querySelector(".hero__media");
  const heroImage = document.querySelector(".hero__media img");
  
  if (heroText && heroMedia && heroImage) {
    const textHeight = heroText.offsetHeight;
    heroImage.style.height = `${textHeight}px`;
    heroImage.style.objectFit = "cover";
  }
}

// Match feature/split image height to text content height
function alignFeatureImage() {
  const splitText = document.querySelector(".split__text");
  const splitMedia = document.querySelector(".split__media");
  const splitImage = document.querySelector(".split__media img:not(.first-image)");
  
  // Only apply height matching if it's not the about page (which has first-image class)
  if (splitText && splitMedia && splitImage && !splitImage.classList.contains("first-image")) {
    const textHeight = splitText.offsetHeight;
    splitImage.style.height = `${textHeight}px`;
    splitImage.style.objectFit = "cover";
  }
}

// Run on load and resize
function alignAllImages() {
  alignHeroImage();
  alignFeatureImage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", alignAllImages);
} else {
  alignAllImages();
}

window.addEventListener("resize", alignAllImages);

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize scroll animations on page load
function initScrollAnimations() {
  // Add animation classes to elements
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .value-card, .package-card, " +
    ".split__text, .split__media, .feature-list li, .capabilities-grid article, " +
    ".info-card, .mini-card, .client-item"
  );

  animateElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll", "fade-up");
    scrollObserver.observe(el);
  });

  // Special animations for split sections
  const splitTexts = document.querySelectorAll(".split__text");
  const splitMedias = document.querySelectorAll(".split__media");
  
  splitTexts.forEach((el) => {
    el.classList.add("animate-on-scroll", "fade-left");
    scrollObserver.observe(el);
  });

  splitMedias.forEach((el) => {
    el.classList.add("animate-on-scroll", "fade-right");
    scrollObserver.observe(el);
  });

  // Scale animation for buttons and CTAs
  const ctaButtons = document.querySelectorAll(".btn, .btn-icon-circle");
  ctaButtons.forEach((el) => {
    el.classList.add("animate-on-scroll", "scale-in");
    scrollObserver.observe(el);
  });
}

// Parallax effect for hero sections
function initParallax() {
  const heroSections = document.querySelectorAll(".hero, .page-hero");
  
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    
    heroSections.forEach((section) => {
      const rate = scrolled * 0.5;
      const gradient = section.querySelector(".hero__gradient, .page-hero::before");
      if (gradient) {
        section.style.transform = `translateY(${rate}px)`;
      }
    });
  });
}

// Smooth reveal animation for text
function initTextReveal() {
  const textElements = document.querySelectorAll("h1, h2, h3, p");
  
  textElements.forEach((el) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeUp 0.8s ease forwards";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(el);
  });
}

// Enhanced button ripple effect
function initButtonRipples() {
  const buttons = document.querySelectorAll(".btn, .btn-icon-circle");
  
  buttons.forEach((button) => {
    button.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Section visibility observer
function initSectionAnimations() {
  const sections = document.querySelectorAll(
    ".services-preview, .feature, .testimonials, .values, .packages, " +
    ".service-grid, .booking-form, .contact-section, .about, .stats, .clients"
  );

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// Image loading animation
function initImageLoading() {
  const images = document.querySelectorAll("img");
  
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
}

// Staggered list item animations
function initListAnimations() {
  const lists = document.querySelectorAll(".feature-list li, .capabilities-grid article");
  
  lists.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(item);
  });
}

// Stats section animations
function initStatsAnimations() {
  const statItems = document.querySelectorAll(".stats .stat-item");
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  statItems.forEach((item) => {
    statsObserver.observe(item);
  });
}

// Initialize all animations
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initParallax();
    initTextReveal();
    initButtonRipples();
    initSectionAnimations();
    initNavbarScroll();
    initImageLoading();
    initListAnimations();
    initStatsAnimations();
  });
} else {
  initScrollAnimations();
  initParallax();
  initTextReveal();
  initButtonRipples();
  initSectionAnimations();
  initNavbarScroll();
  initImageLoading();
  initListAnimations();
  initStatsAnimations();
}

