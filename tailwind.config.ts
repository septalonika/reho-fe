import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "SF Mono", "monospace"],
      },
      colors: {
        // Warm cream base (Editorial Luxury)
        canvas: "#FDFBF7",
        surface: "#F5F2EC",
        "surface-2": "#EDE9E0",
        ink: "#1A1714",
        "ink-2": "#2F2B27",
        "ink-muted": "#8C8070",
        border: "rgba(26,23,20,0.08)",
        "border-strong": "rgba(26,23,20,0.14)",
        // Admin soft white (Soft Structuralism)
        admin: {
          bg: "#F9F9F8",
          surface: "#FFFFFF",
          border: "rgba(0,0,0,0.06)",
        },
        accent: {
          warm: "#C4A882",
          "warm-fg": "#6B4E2A",
          red: { DEFAULT: "#FDEBEC", fg: "#9F2F2D" },
          green: { DEFAULT: "#EAF3EA", fg: "#2D6B35" },
          yellow: { DEFAULT: "#FBF3DB", fg: "#956400" },
          blue: { DEFAULT: "#E8F0FE", fg: "#1F6C9F" },
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        "2xl": "32px",
        pill: "9999px",
      },
      boxShadow: {
        // Soft Structuralism ambient shadows
        "ambient-sm": "0 4px 20px -4px rgba(26,23,20,0.06), 0 1px 4px rgba(26,23,20,0.04)",
        "ambient-md": "0 8px 40px -8px rgba(26,23,20,0.10), 0 2px 8px rgba(26,23,20,0.05)",
        "ambient-lg": "0 20px 60px -12px rgba(26,23,20,0.14), 0 4px 16px rgba(26,23,20,0.06)",
        // Glass inner highlight
        "inner-highlight": "inset 0 1px 1px rgba(255,255,255,0.6)",
        "inner-highlight-dark": "inset 0 1px 1px rgba(255,255,255,0.15)",
        card: "0 2px 12px rgba(26,23,20,0.06), 0 1px 3px rgba(26,23,20,0.04)",
      },
      maxWidth: {
        "8xl": "1400px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.32,0.72,0,1) forwards",
        "fade-in": "fade-in 500ms ease forwards",
        shimmer: "shimmer 2s infinite linear",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32,0.72,0,1)",
        "spring-back": "cubic-bezier(0.34,1.56,0.64,1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
      },
    },
  },
  plugins: [animate],
};

export default config;
