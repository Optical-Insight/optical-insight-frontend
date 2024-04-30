"use client";
import React from "react";
import HomePage from "./home/home";
import InstitutesPage from "./intitutes/institutes";
import InstituteHeadsPage from "./institute-heads/institute-heads";
import LabTechniciansPage from "./lab-technicians/lab-technicians";
import DoctorsPage from "./doctors/doctors";
import PatientsPage from "./patients/patients";
import NotificationsPage from "./notifications/notifications";
import SettingsPage from "./settings/settings";

function PageContent({ tab }: { tab: string }) {
  switch (tab) {
    case "home":
      return <HomePage />;

    case "institutes":
      return <InstitutesPage />;

    case "institute-heads":
      return <InstituteHeadsPage />;

    case "lab-technicians":
      return <LabTechniciansPage />;

    case "doctors":
      return <DoctorsPage />;

    case "patients":
      return <PatientsPage />;

    case "notification":
      return <NotificationsPage />;

    case "settings":
      return <SettingsPage />;

    default:
      return <HomePage />;
  }
}

export default PageContent;
