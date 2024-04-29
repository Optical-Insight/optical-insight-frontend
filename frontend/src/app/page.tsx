"use client";
import React from "react";
// import AdminLogin from "./auth/login/sys-admin";
import PatientLogin from "./auth/login/patient";

export default function Home() {
  return (
    <div>
      <PatientLogin />
    </div>
  );
}
