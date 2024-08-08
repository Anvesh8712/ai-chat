"use client";

import { useAuth } from "../Authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardContent from "../DashboardContent";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (!user) return null;

  return <DashboardContent user={user} onLogout={handleLogout} />;
}
