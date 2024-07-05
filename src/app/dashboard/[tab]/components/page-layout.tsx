"use client";
import React from "react";
import PageContent from "./page-content";
import AppSidebar from "@/app/components/common/sidebar";
// import PageHeader from "./page-header";

function PageLayout({ tab }: { tab: string }) {
  // const [activeTab, setActiveTab] = useState(tab);
  // console.log(tab);
  // const { replace } = useRouter();

  return (
    <div className="flex flex-row bg-lightBg min-h-screen min-w-screen">
      <AppSidebar tab={tab} />

      <div className="w-full">
        {/* <PageHeader tab={tab} /> */}
        <PageContent tab={tab} />
      </div>
    </div>
  );
}

export default PageLayout;
