// MODELS
import type { TablesInsert } from "@/models";

type Price = TablesInsert<"prices">;

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const postData = async <T>({ url, data }: { url: string; data?: { price: Price } }): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json() as Promise<T>;
};

export const toDateTime = (secs: number) => {
  const t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export function formatTime(time: number) {
  if (time === null) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency as string,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

export const calculateTrialEndUnixTimestamp = (trialPeriodDays: number | null | undefined) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (trialPeriodDays === null || trialPeriodDays === undefined || trialPeriodDays < 2) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};
