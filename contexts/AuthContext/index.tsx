"use client";

import { createContext, useEffect, useState } from "react";
// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// TYPES
import type { Session as SessionSupabase, AuthChangeEvent, QueryError } from "@supabase/supabase-js";
// MODELS
import type { User } from "@/models";
import type { Subscription } from "@/models/stripe";

interface Session extends Omit<SessionSupabase, "user"> {
  user: (User & { subscription?: Subscription }) | null;
}

const useContextValue = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthChangeEvent>("INITIAL_SESSION");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<QueryError | null>(null);

  const getUser = async (_session: Session | null) => {
    try {
      if (!_session) return;

      const { data: queryData, error: queryError } = await supabaseClient
        .from("users")
        .select("*, subscriptions(*)")
        .in("subscriptions.status", ["trialing", "active"])
        .maybeSingle();

      const { subscriptions, ...userData } = queryData || {};

      const user = { ...userData, subscription: subscriptions?.[0] } as typeof _session.user;

      const data = { ..._session, user };

      setSession(data);

      if (queryError) {
        setError(queryError);
        throw new Error(queryError.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

  const onAuthStateChange = (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
    let currentSession: Session | null;

    return supabaseClient.auth.onAuthStateChange((_event, _session) => {
      if (_event !== "INITIAL_SESSION" && _session?.user?.id === currentSession?.user?.id) return;

      currentSession = _session;
      callback(_event, _session);
      setStatus(_event);
    });
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange((_event, _session) => {
      if (_session || _event === "INITIAL_SESSION") {
        void getUser(_session);
      } else if (_event === "SIGNED_OUT") {
        setSession(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, status, error, isLoading };
};

export interface Store {
  session: Session | null;
  isLoading: boolean;
  error: QueryError | null;
}

const AuthContext = createContext({} as ReturnType<typeof useContextValue>);

export interface Props {
  [propName: string]: unknown;
}

export function AuthContextProvider(props: Props) {
  const value = useContextValue();

  return <AuthContext.Provider value={value} {...props} />;
}

export default AuthContext;
