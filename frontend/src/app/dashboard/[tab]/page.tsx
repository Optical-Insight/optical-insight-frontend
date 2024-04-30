import React from "react";
import PageLayout from "./components/page-layout";

export function generateStaticParams() {
  return [
    { tab: "home" },
    { tab: "institutes" },
    { tab: "institute-heads" },
    { tab: "lab-technicians" },
    { tab: "doctors" },
    { tab: "patients" },
    { tab: "notification" },
    { tab: "settings" },
  ];
}

const Dashboard = ({ params: { tab } }: { params: { tab: string } }) => {
  return <PageLayout tab={tab} />;
};

export default Dashboard;
