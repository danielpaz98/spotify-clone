import { useContext } from "react";
// CONTEXTS
import AuthContext from "@/contexts/AuthContext";

export default function useAuth(): React.ContextType<typeof AuthContext> {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("useAuth must be used within AuthContextProvider");

  return context;
}
