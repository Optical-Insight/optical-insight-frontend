"use client";
import React, { useEffect } from "react";
import PageContent from "./page-content";
import AppSidebar from "@/app/components/common/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Flex, Spin } from "antd";

function PageLayout({
  tab,
}: {
  tab:
    | "home"
    | "institutes"
    | "branches"
    | "branch-heads"
    | "lab-technicians"
    | "doctors"
    | "patients";
}) {
  const { isAuthenticated, userData } = useAuth();
  const router = useRouter();

  const isAuthorized = (tabSelected: keyof typeof accessControl) => {
    const accessControl = {
      home: true, // Accessible to all authenticated users
      institutes: userData?.type === "admin",
      branches: userData?.type === "admin" || userData?.type === "sdirector",
      "branch-heads": userData?.type === "admin",
      "lab-technicians":
        userData?.type === "admin" ||
        userData?.type === "sdirector" ||
        userData?.type === "director",
      doctors:
        userData?.type === "admin" ||
        userData?.type === "sdirector" ||
        userData?.type === "director",
      patients: true, // Accessible to all authenticated users
    };

    return accessControl[tabSelected];
  };

  useEffect(() => {
    if (isAuthenticated && userData) {
      if (!isAuthorized(tab)) {
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated, userData]);

  // Show a loading message or spinner until userData is available
  if (isAuthenticated && !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg">
        <p className="text-black text-xl font-semibold">
          User Not Authenitcated.
        </p>
        <p className="text-black text-xl font-semibold mb-10">Retrying...</p>
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  return (
    <>
      <AppSidebar tab={tab}>
        <PageContent tab={tab} />
      </AppSidebar>
    </>
  );
}

export default PageLayout;
