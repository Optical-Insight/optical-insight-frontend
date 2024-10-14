"use client";
import React from "react";
import PageContent from "./page-content";
import AppSidebar from "@/app/components/common/sidebar";
import Footer from "@/app/components/common/footer";

// import PageHeader from "./page-header";

function PageLayout({ tab }: { tab: string }) {
  return (
    <>
      <AppSidebar tab={tab}>
        <PageContent tab={tab} />
      </AppSidebar>{" "}
      <Footer />
    </>
  );
}

export default PageLayout;
