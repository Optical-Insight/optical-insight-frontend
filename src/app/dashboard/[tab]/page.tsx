import React from "react";
import PageLayout from "./components/page-layout";

export function generateStaticParams() {
  return [
    { tab: "home" },
    { tab: "institutes" },
    { tab: "branch-heads" },
    { tab: "lab-technicians" },
    { tab: "doctors" },
    { tab: "patients" },
    { tab: "notification" },
    { tab: "settings" },
  ];
}

type TabType =
  | "home"
  | "branch-heads"
  | "lab-technicians"
  | "doctors"
  | "patients"
  | "branches";

const Dashboard = ({ params: { tab } }: { params: { tab: TabType } }) => {
  return <PageLayout tab={tab} />;
};

export default Dashboard;

// import React from "react";
// import PageLayout from "./components/page-layout";

// export function generateStaticParams() {
//   return [
//     { tab: "home" },
//     { tab: "institutes" },
//     { tab: "branch-heads" },
//     { tab: "lab-technicians" },
//     { tab: "doctors" },
//     { tab: "patients" },
//     { tab: "notification" },
//     { tab: "settings" },
//   ];
// }

// const Dashboard = ({ params: { tab } }: { params: { tab: string } }) => {
//   return <PageLayout tab={tab} />;
// };

// export default Dashboard;
