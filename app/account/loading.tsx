"use client";

// PLUGINS
import { BounceLoader } from "react-spinners";
// COMPONENTS
import Box from "@/components/Box";

export default function Loading() {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader className="[&>*]:!bg-brand" size={40} />
    </Box>
  );
}
