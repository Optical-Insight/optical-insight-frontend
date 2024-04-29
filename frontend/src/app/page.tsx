"use client";
import { useEffect } from "react";
// import AdminLogin from "./auth/login/sys-admin";
// import PatientLogin from "./auth/login/patient";
import { useRouter } from "next/navigation";

export default function Home() {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/dashboard/home");
  }, []);

  // return (
  //   <div>
  //     <AdminLogin />
  //   </div>
  // );
}
