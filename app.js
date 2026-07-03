// Client JavaScript Operations - Under Construction Landing Page

document.addEventListener("DOMContentLoaded", () => {
  // Check if CONFIG is loaded, otherwise create a local fallback
  const config = typeof CONFIG !== "undefined" ? CONFIG : {
    seo: { title: "Coming Soon", description: "Website is under construction" },
    hero: { statusBadge: "COMING SOON", headline: "Under Construction", description: "We are building our website.", progressPercentage: 50, launchDate: new Date().toISOString() },
    theme: { defaultMode: "dark", colors: { accentHue: "250", accentSaturation: "85%", accentLightnessDark: "60%", accentLightnessLight: "50%" } },
    socials: [],
    emailServiceUrl: ""
  };

  // 1. Dynamic Config and Theme Injection
  initSEOAndBranding(config);
  initContent(config);
  initTheme(config);
  initSocials(config);

  // 2. Interactive Canvas Particles
  initParticles(config);

  // 3. Countdown Timer Ticker
  initCountdown(config.hero.launchDate);

  // 4. Form Actions & Modal Controllers
  initForms(config);
  initModal();
});

/**
 * Injects SEO tags, keywords, and general site settings
 */
function initSEOAndBranding(config) {
  document.title = config.seo.title;
  
  // Set meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", config.seo.description);
  
  // Set meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) metaKeywords.setAttribute("content", config.seo.keywords || "");

  // Update OG/Twitter Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", config.seo.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", config.seo.description);

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg && config.seo.ogImage) ogImg.setAttribute("content", config.seo.ogImage);

  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", config.seo.title);

  const twitterDesc = document.querySelector('meta[property="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute("content", config.seo.description);

  const twitterImg = document.querySelector('meta[property="twitter:image"]');
  if (twitterImg && config.seo.ogImage) twitterImg.setAttribute("content", config.seo.ogImage);
}

/**
 * Populates landing page content fields
 */
function initContent(config) {
  // Header logo text
  const logoTextEl = document.getElementById("site-logo-text");
  if (logoTextEl && config.seo.title) {
    // Take first word of site title or default to Alpha
    const brand = config.seo.title.split("|")[0].trim().split(" ")[0];
    logoTextEl.textContent = brand;
  }

  // Hero headline
  const headlineEl = document.getElementById("main-headline");
  if (headlineEl) headlineEl.textContent = config.hero.headline;

  // Hero description
  const descriptionEl = document.getElementById("main-description");
  if (descriptionEl) descriptionEl.textContent = config.hero.description;

  // Badge text
  const badgeEl = document.getElementById("status-badge");
  if (badgeEl) badgeEl.textContent = config.hero.statusBadge;

  // Progress Bar
  const progressValEl = document.getElementById("progress-val");
  const progressBarEl = document.getElementById("progress-bar");
  if (progressValEl && progressBarEl) {
    const percent = Math.min(Math.max(parseInt(config.hero.progressPercentage) || 0, 0), 100);
    progressValEl.textContent = `${percent}%`;
    // Delay slightly to trigger the CSS transition on page load
    setTimeout(() => {
      progressBarEl.style.width = `${percent}%`;
    }, 300);
  }

  // Footer emails
  const footerEmailText = document.getElementById("footer-email-text");
  if (footerEmailText) {
    footerEmailText.textContent = config.hero.contactEmail || "hello@website.com";
  }

  const copyrightText = document.getElementById("copyright-text");
  if (copyrightText && config.seo.title) {
    const year = new Date().getFullYear();
    const brandName = config.seo.title.split("|")[0].trim();
    copyrightText.innerHTML = `&copy; ${year} ${brandName}. All rights reserved.`;
  }
}

/**
 * Sets CSS Custom Variables for accent hue shifts and handles active theme
 */
function initTheme(config) {
  const root = document.documentElement;
  
  if (config.theme && config.theme.colors) {
    const colors = config.theme.colors;
    if (colors.accentHue) root.style.setProperty("--accent-h", colors.accentHue);
    if (colors.accentSaturation) root.style.setProperty("--accent-s", colors.accentSaturation);
    if (colors.accentLightnessDark) root.style.setProperty("--accent-l", colors.accentLightnessDark);
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  // Resolve active theme: localStorage -> config default -> system preference
  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = config.theme.defaultMode || "dark";
  }

  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(activeTheme);
  });

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (config.theme && config.theme.colors && config.theme.colors.accentLightnessLight) {
        root.style.setProperty("--accent-l", config.theme.colors.accentLightnessLight);
      }
    } else {
      document.body.classList.remove("light-theme");
      if (config.theme && config.theme.colors && config.theme.colors.accentLightnessDark) {
        root.style.setProperty("--accent-l", config.theme.colors.accentLightnessDark);
      }
    }
    localStorage.setItem("theme", theme);
  }
}

/**
 * Returns raw SVG icon path based on service name
 */
function getSocialIconSvg(name) {
  switch (name.toLowerCase()) {
    case "twitter":
    case "twitter / x":
    case "x":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>`;
    case "github":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
    case "linkedin":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
    case "instagram":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
    case "facebook":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  }
}

/**
 * Injects social media accounts buttons dynamically
 */
function initSocials(config) {
  const container = document.getElementById("social-links-container");
  if (!container) return;
  container.innerHTML = "";

  if (!config.socials || config.socials.length === 0) {
    container.style.display = "none";
    return;
  }

  config.socials.forEach(social => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "social-btn";
    link.setAttribute("aria-label", social.name);
    link.title = social.name;
    link.innerHTML = getSocialIconSvg(social.icon || social.name);
    container.appendChild(link);
  });
}

/**
 * Injects canvas particle floating animation
 */
function initParticles(config) {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;
  let particlesArray = [];
  
  // Track mouse coordinates
  const mouse = {
    x: null,
    y: null,
    radius: 130
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle Resize
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener("resize", handleResize);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particle blueprint class
  class Particle {
    constructor(x, y, directionX, directionY, size, opacity) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.baseOpacity = opacity;
      this.opacity = opacity;
    }

    draw() {
      // Pull color parameters dynamically from root css custom vars values
      const rootStyle = getComputedStyle(document.documentElement);
      const hue = rootStyle.getPropertyValue("--accent-h").trim() || "250";
      const sat = rootStyle.getPropertyValue("--accent-s").trim() || "85%";
      const light = rootStyle.getPropertyValue("--accent-l").trim() || "60%";
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = `hsla(${hue}, ${sat}, ${light}, ${this.opacity})`;
      ctx.fill();
    }

    update() {
      // Screen edge bounce
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Check mouse interactive collision/push-force
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Push particles slightly away from cursor
          const force = (mouse.radius - distance) / mouse.radius;
          const forceX = (dx / distance) * force * 1.5;
          const forceY = (dy / distance) * force * 1.5;
          
          this.x -= forceX;
          this.y -= forceY;
          
          // Boost opacity near cursor
          this.opacity = Math.min(this.baseOpacity * 2, 0.7);
        } else {
          // Smooth return to base opacity
          if (this.opacity > this.baseOpacity) {
            this.opacity -= 0.01;
          }
        }
      } else {
        if (this.opacity > this.baseOpacity) {
          this.opacity -= 0.01;
        }
      }

      // Standard movement
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function createParticles() {
    particlesArray = [];
    // Number of particles responsive to size
    const quantity = Math.floor((canvas.width * canvas.height) / 18000);
    const limit = Math.min(Math.max(quantity, 30), 100);

    for (let i = 0; i < limit; i++) {
      let size = (Math.random() * 3) + 1;
      let x = Math.random() * (canvas.width - size * 2) + size;
      let y = Math.random() * (canvas.height - size * 2) + size;
      
      // Slower, subtle speeds for floating aesthetics
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let opacity = (Math.random() * 0.15) + 0.1;

      particlesArray.push(new Particle(x, y, directionX, directionY, size, opacity));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/**
 * Initiates the target countdown clock loop
 */
function initCountdown(targetDateString) {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetDate = new Date(targetDateString).getTime();

  if (isNaN(targetDate)) {
    console.error("Invalid launch date provided in config.js");
    return;
  }

  function updateClock() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      
      const badgeEl = document.getElementById("status-badge");
      if (badgeEl) badgeEl.textContent = "LAUNCHED";
      
      clearInterval(clockInterval);
      return;
    }

    // Calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Dynamic padding injection
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateClock();
  const clockInterval = setInterval(updateClock, 1000);
}

/**
 * Handles Form submissions, validation structures, and webhooks
 */
function initForms(config) {
  const subscribeForm = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("subscriber-email");
  const inputGroup = document.querySelector(".input-group");
  const validationError = document.getElementById("validation-error");
  const successCard = document.getElementById("subscribe-success");

  if (!subscribeForm || !emailInput) return;

  // Simple Email Regex validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear validation styling on typing
  emailInput.addEventListener("input", () => {
    inputGroup.classList.remove("invalid");
    validationError.style.display = "none";
  });

  subscribeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!emailRegex.test(email)) {
      inputGroup.classList.add("invalid");
      validationError.style.display = "block";
      return;
    }

    // Lock Submit UI
    const submitBtn = subscribeForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Subscribing...</span>";

    try {
      if (config.emailServiceUrl && config.emailServiceUrl.trim() !== "") {
        // Real Post request to service URL (Formspree, Webhook etc.)
        const response = await fetch(config.emailServiceUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ email: email, subscribed_at: new Date().toISOString() })
        });

        if (response.ok) {
          handleSuccess();
        } else {
          throw new Error("Failed to subscribe via service URL");
        }
      } else {
        // Fallback: Save local mock storage & trigger fake load response
        await new Promise(resolve => setTimeout(resolve, 800));
        let list = JSON.parse(localStorage.getItem("subscribers")) || [];
        if (!list.includes(email)) {
          list.push(email);
          localStorage.setItem("subscribers", JSON.stringify(list));
        }
        handleSuccess();
      }
    } catch (err) {
      console.error(err);
      inputGroup.classList.add("invalid");
      validationError.textContent = "Submission failed. Please try again later.";
      validationError.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }

    function handleSuccess() {
      // Hide input form and show success state
      subscribeForm.style.display = "none";
      successCard.style.display = "flex";
      emailInput.value = "";
    }
  });

  // 4.2 Contact message Form validation
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const contactName = document.getElementById("contact-name");
  const contactEmail = document.getElementById("contact-email");
  const contactMessage = document.getElementById("contact-message");
  const contactSuccess = document.getElementById("contact-success");
  const contactSubmit = document.getElementById("contact-submit-btn");

  const fields = [
    { input: contactName, group: contactName.parentElement },
    { input: contactEmail, group: contactEmail.parentElement, validation: (val) => emailRegex.test(val) },
    { input: contactMessage, group: contactMessage.parentElement }
  ];

  fields.forEach(field => {
    field.input.addEventListener("input", () => {
      field.group.classList.remove("invalid");
    });
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isAllValid = true;

    fields.forEach(field => {
      const val = field.input.value.trim();
      let isValid = val !== "";
      if (isValid && field.validation) {
        isValid = field.validation(val);
      }
      
      if (!isValid) {
        field.group.classList.add("invalid");
        isAllValid = false;
      } else {
        field.group.classList.remove("invalid");
      }
    });

    if (!isAllValid) return;

    // Block UI & mock submission
    contactSubmit.disabled = true;
    contactSubmit.textContent = "Sending Message...";

    // Mock send delay
    await new Promise(resolve => setTimeout(resolve, 900));

    // Save contact message locally
    const messages = JSON.parse(localStorage.getItem("contact_messages")) || [];
    messages.push({
      name: contactName.value.trim(),
      email: contactEmail.value.trim(),
      message: contactMessage.value.trim(),
      sent_at: new Date().toISOString()
    });
    localStorage.setItem("contact_messages", JSON.stringify(messages));

    // Toggle fields success display
    contactForm.style.display = "none";
    contactSuccess.style.display = "flex";
    
    // Clear fields
    contactName.value = "";
    contactEmail.value = "";
    contactMessage.value = "";
  });
}

/**
 * Manages modal display toggling
 */
function initModal() {
  const modal = document.getElementById("contact-modal");
  const openBtn = document.getElementById("open-contact-modal-btn");
  const closeBtn = document.getElementById("close-contact-modal-btn");
  const footerBtn = document.getElementById("footer-contact-link");
  const doneBtn = document.getElementById("contact-done-btn");
  
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");
  const contactSubmit = document.getElementById("contact-submit-btn");

  if (!modal || !openBtn || !closeBtn) return;

  const toggleTriggers = [openBtn, closeBtn];
  if (footerBtn) toggleTriggers.push(footerBtn);

  toggleTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = modal.classList.contains("open");
      if (isOpen) {
        closeModal();
      } else {
        openModal();
      }
    });
  });

  if (doneBtn) {
    doneBtn.addEventListener("click", closeModal);
  }

  // Close modal if background is clicked
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll behind
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable scroll
    
    // Reset contact form after animation completes
    setTimeout(() => {
      if (contactForm && contactSuccess && contactSubmit) {
        contactForm.style.display = "block";
        contactSuccess.style.display = "none";
        contactSubmit.disabled = false;
        contactSubmit.textContent = "Send Message";
      }
    }, 300);
  }
}
