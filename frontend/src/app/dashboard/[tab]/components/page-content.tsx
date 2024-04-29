"use client";
import React from "react";
import HomePage from "./home/home";

function PageContent({ tab }: { tab: string }) {
  switch (tab) {
    case "home":
      return <HomePage />;
    default:
      return <HomePage />;
  }
}

export default PageContent;
