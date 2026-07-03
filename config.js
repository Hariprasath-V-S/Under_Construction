// Under Construction Landing Page Configuration
const CONFIG = {
  // SEO & General Site Settings
  seo: {
    title: "Project Alpha | Launching Soon",
    description: "Something incredible is currently being built. Sign up to get early notifications and exclusive access when we launch.",
    keywords: "under construction, coming soon, landing page, responsive, animated, countdown",
    ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop" // Placeholder high-quality mesh graphic
  },

  // Hero Section Details
  hero: {
    statusBadge: "LAUNCHING SOON",
    headline: "We're Crafting Something Special",
    description: "Our team is working hard behind the scenes to deliver an out-of-this-world experience. Subscribe to get notified exactly when we launch.",
    progressPercentage: 74, // Current building progress (integer from 0 to 100)
    launchDate: "2026-10-25T10:00:00+05:30", // ISO 8601 target launch date (YYYY-MM-DDTHH:MM:SS[+/-HH:MM])
    contactEmail: "hello@website.com"
  },

  // Style Customization (CSS variables override)
  theme: {
    defaultMode: "dark", // Options: "dark" | "light"
    // Palette parameters (Hue, Saturation, Lightness values)
    colors: {
      accentHue: "250", // Indigo theme color by default (0-360)
      accentSaturation: "85%",
      accentLightnessDark: "60%", // Color on dark background
      accentLightnessLight: "50%"  // Color on light background
    }
  },

  // Social Connections
  socials: [
    {
      name: "Twitter / X",
      icon: "twitter", // Used to select appropriate SVG template
      url: "https://x.com"
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com"
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com"
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com"
    }
  ],

  // Form Submission
  // To use a form provider like Formspree, paste your endpoint URL here. 
  // e.g., "https://formspree.io/f/your_form_id"
  // If empty, the page will store emails in local storage and simulate a successful API call.
  emailServiceUrl: ""
};

// Export configuration so it can be referenced in our app script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
