import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "476px",
        sm: "640px",
        md: "800px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        "cod-gray": "#121212",
        "eerie-black": "#181818",
        "dark-gray": "#3e3e3e",
        "gray-70": "#b3b3b3",
        "fuscous-gray": "#535353",
        "wood-smoke": "#1a1a1a",
        "dire-wolf": "#282828",
        "blue-gem": "#5038a0",
        nero: "#2a2a2a",
        highlight: "#f6f6f6",
        shark: "#242424",
        info: "#0d72ea",
        brand: {
          DEFAULT: "#1ed760",
        },
      },
      backgroundImage: ({ theme }) => ({
        "main-noise-gradient": `linear-gradient(rgba(0,0,0,.6) 0, ${theme(
          "colors.cod-gray",
        )} 100%),var(--background-noise)`,
        "transparent-noise-gradient": `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), var(--background-noise)`,
      }),
      transitionDuration: {
        "33ms": "33ms",
        "1s": "0.1s",
        "2s": "0.2s",
        "3s": "0.3s",
        "4s": "0.4s",
      },
      keyframes: {
        "heart-beat": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "heart-beat": "heart-beat .5s ease-out",
      },
    },
    variables: {
      DEFAULT: {
        "content-max-width": "1955px",
        "content-spacing":
          "clamp(16px,16px + (100vw - var(--left-sidebar-width,0px) - var(--panel-width,0px) - 600px)/424*8,24px)",
        "left-sidebar-width": "280px",
        "header-height": "64px",
        "playing-bar-height": "72px",
        "background-noise":
          "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=)",
      },
    },
  },
  plugins: [require("@mertasan/tailwindcss-variables"), require("tailwindcss-animate")],
} satisfies Config;
