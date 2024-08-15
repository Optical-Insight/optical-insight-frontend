"use client";
import React from "react";
import PageContent from "./page-content";
import AppSidebar from "@/app/components/common/sidebar";
import { AuthProvider } from "@/context/AuthContext";
// import PageHeader from "./page-header";

function PageLayout({ tab }: { tab: string }) {
  return (
    <div className="flex flex-row bg-lightBg min-h-screen min-w-full w-fit">
      <AuthProvider>
        <AppSidebar tab={tab} />

        <div className="flex-grow ml-[3vw] mr-[3vw] ">
          {/* <PageHeader tab={tab} /> */}
          <PageContent tab={tab} />
        </div>
      </AuthProvider>
    </div>
  );
}

export default PageLayout;
