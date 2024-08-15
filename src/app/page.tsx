"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { replace } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated: ", isAuthenticated);
      replace("/dashboard/home");
    } else {
      console.log("User is not authenticated: ", isAuthenticated);
      replace("/auth/login/sys-admin");
    }
  }, []);

  return <div></div>;
}
