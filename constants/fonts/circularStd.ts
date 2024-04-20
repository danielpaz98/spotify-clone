// FONTS
import localFont from "next/font/local";

const CircularStd = localFont({
  display: "swap",
  style: "normal",
  fallback: ["system-ui", "helvetica", "arial", "sans-serif"],
  src: [
    {
      path: "../../assets/fonts/CircularStd-Light.woff2",
      weight: "300",
    },
    {
      path: "../../assets/fonts/CircularStd-Book.woff2",
      weight: "400",
    },
    {
      path: "../../assets/fonts/CircularStd-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../assets/fonts/CircularStd-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../assets/fonts/CircularStd-Black.woff2",
      weight: "900",
    },
  ],
});

export default CircularStd;
