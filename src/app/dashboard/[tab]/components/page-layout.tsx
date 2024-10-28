"use client";
import React, { useEffect } from "react";
import PageContent from "./page-content";
import AppSidebar from "@/app/components/common/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function PageLayout({
  tab,
}: {
  tab:
    | "home"
    | "institutes"
    | "branches"
    | "institutes"
    | "institute-heads"
    | "lab-technicians"
    | "doctors"
    | "patients";
}) {
  const { isAuthenticated, userData } = useAuth();
  const router = useRouter();

  const isAuthorized = (tabSelected: keyof typeof accessControl) => {
    // Define roles or conditions required for each tab
    const accessControl = {
      home: true, // Accessible to all authenticated users
      institutes: userData?.type === "admin",
      branches: userData?.type === "admin",
      "institute-heads": userData?.type === "admin",
      "lab-technicians": userData?.type === "admin",
      doctors: userData?.type === "admin" || userData?.type === "doctor",
      patients: userData?.type === "admin" || userData?.type === "staff",
    };

    return accessControl[tabSelected];
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (!isAuthorized(tab)) {
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      <AppSidebar tab={tab}>
        <PageContent tab={tab} />
      </AppSidebar>
    </>
  );
}

export default PageLayout;

// "use client";
// import React from "react";
// import PageContent from "./page-content";
// import AppSidebar from "@/app/components/common/sidebar";

// // import PageHeader from "./page-header";

// function PageLayout({ tab }: { tab: string }) {
//   return (
//     <>
//       <AppSidebar tab={tab}>
//         <PageContent tab={tab} />
//       </AppSidebar>{" "}
//     </>
//   );
// }

// export default PageLayout;
