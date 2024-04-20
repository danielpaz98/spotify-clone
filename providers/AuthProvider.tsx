"use client";

// CONTEXTS
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
