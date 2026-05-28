import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    // Escucha expiración, logout, refresh en tiempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === null) return null;
  if (!session) return <Navigate to="/click-and-xperience" replace />;
  return children;
}
