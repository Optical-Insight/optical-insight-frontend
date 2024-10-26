"use client";
import React from "react";
import HomePage from "./home/home";
import InstitutesPage from "./intitutes/institutes";
import BranchesPage from "./branches/branches";
import InstituteHeadsPage from "./institute-heads/institute-heads";
import LabTechniciansPage from "./lab-technicians/lab-technicians";
import DoctorsPage from "./doctors/doctors";
import PatientsPage from "./patients/patients";

function PageContent({ tab }: { tab: string }) {
  switch (tab) {
    case "home":
      return <HomePage />;

    case "institutes":
      return <InstitutesPage />;

    case "branches":
      return <BranchesPage />;

    case "institute-heads":
      return <InstituteHeadsPage />;

    case "lab-technicians":
      return <LabTechniciansPage />;

    case "doctors":
      return <DoctorsPage />;

    case "patients":
      return <PatientsPage />;

    default:
      return <HomePage />;
  }
}

export default PageContent;
