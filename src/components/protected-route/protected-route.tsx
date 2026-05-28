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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });
  }, []);

  if (session === null) return null;
  if (!session) return <Navigate to="/click-and-xperience" replace />;
  return children;
}
