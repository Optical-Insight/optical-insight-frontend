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
    | "institute-heads"
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
      branches: userData?.type === "admin" || userData?.type === "sDirector",
      "institute-heads": userData?.type === "admin",
      "lab-technicians":
        userData?.type === "admin" ||
        userData?.type === "sDirector" ||
        userData?.type === "director",
      doctors:
        userData?.type === "admin" ||
        userData?.type === "sDirector" ||
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
  }, [isAuthenticated, userData, tab]);

  // Show a loading message or spinner until userData is available
  if (isAuthenticated && !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg">
        <Flex align="center" gap="middle">
          <Spin />
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
