"use client";
import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Image from "next/image";
import PatientRegistration from "./patient-reg";
import PatientListAll from "./patient-list";
import PatientProfilePage from "./patient-profile";
import AddNewTestPage from "./patient-new-test";

const PatientsPage = () => {
  const [activeHeading, setActiveHeading] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  const handleBreadcrumbClick = (value: number) => {
    if (value === activeHeading) return;
    setActiveHeading(value);
    setActiveStep(1);
  };

  return (
    <div className="overflow-auto">
      <div className="ml-[3.137vw] mr-[4.444vw]">
        {/* Breadcrumb */}
        <div className="mt-[6.301vh] mb-[1.647vh]">
          <Breadcrumbs
            separator={
              <Image
                src="/assets/icons/arrow_forward.svg"
                width={15.81}
                height={15.81}
                alt="separator"
              />
            }
            aria-label="breadcrumb"
          >
            <div
              color="inherit"
              className={`flex items-center cursor-pointer ${
                activeHeading === 1 && "bg-sidebarFillBg text-blueText"
              } rounded-md`}
              onClick={() => handleBreadcrumbClick(1)}
            >
              <Image
                className="mr-[0.44vw] ml-[0.732vw] "
                src={
                  activeHeading === 1
                    ? "/assets/icons/apartment-active.svg"
                    : "/assets/icons/apartment.svg"
                }
                width={25.3}
                height={25.3}
                alt="separator"
              />
              <div className="font-semibold text-[13.7px] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                Patients
              </div>
            </div>
            {activeHeading == 2 && (
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading === 2 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(2)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  Register a Patient
                </div>
              </div>
            )}
            {activeHeading >= 3 && (
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading === 3 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(3)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  Patient Profile
                </div>
              </div>
            )}
            {activeHeading == 4 && (
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading === 4 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(4)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  Add New Test Data
                </div>
              </div>
            )}
          </Breadcrumbs>
        </div>

        {/* All Patients */}
        {activeHeading === 1 && (
          <PatientListAll
            setActiveHeading={setActiveHeading}
            handleBreadcrumbClick={handleBreadcrumbClick}
          />
        )}

        {/* Register an Patient */}
        {activeHeading === 2 && (
          <PatientRegistration
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}

        {/* Patient Profile */}
        {activeHeading === 3 && (
          <PatientProfilePage
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleBreadcrumbClick={handleBreadcrumbClick}
          />
        )}
        {/* New Test Report */}
        {activeHeading === 4 && (
          <AddNewTestPage
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
