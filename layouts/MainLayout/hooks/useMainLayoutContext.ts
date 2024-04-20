import { useContext } from "react";
// CONTEXTS
import { MainLayoutContext } from "@/layouts/MainLayout";

export default function useMainLayoutContext(): React.ContextType<typeof MainLayoutContext> {
  const context = useContext(MainLayoutContext);

  if (context === undefined) throw new Error("useMainLayoutContext must be used within MainLayout");

  return context;
}
