"use client";
import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Image from "next/image";
import InstituteRegistration from "./patients-reg";
import InstituteListAll from "./patient-list";
import PatientProfile from "./patient-profile";
import PatientRecordNew from "./patients-new-record";

const PatientsPage = () => {
  const [activeHeading, setActiveHeading] = useState(3);
  const [activeStep, setActiveStep] = useState(1);

  const handleBreadcrumbClick = (value: number) => {
    if (value === activeHeading) return;
    setActiveHeading(value);
    setActiveStep(1);
  };

  return (
    <div className="overflow-auto">
      {/* Breadcrumb */}
      <div className="mt-[50px] mb-[16px]">
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
          {/* All Patients */}
          <div
            color="inherit"
            className={`flex items-center cursor-pointer ${
              activeHeading === 1 && "bg-sidebarFillBg text-blueText"
            } rounded-md`}
            onClick={() => handleBreadcrumbClick(1)}
          >
            <Image
              className="mr-[0.44vw]"
              src={
                activeHeading === 1
                  ? "/assets/icons/apartment-active.svg"
                  : "/assets/icons/apartment.svg"
              }
              width={25.3}
              height={25.3}
              alt="apartment"
            />
            <div className="font-semibold text-[13.7px] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
              All Patients
            </div>
          </div>

          {/* Register a Patient */}
          {activeHeading === 2 && (
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

          {/* Patient Profile */}
          {activeHeading === 3 && (
            <div
              color="inherit"
              className={`flex items-center cursor-pointer ${
                activeHeading === 3 && "bg-sidebarFillBg text-blueText"
              } rounded-md`}
              onClick={() => handleBreadcrumbClick(2)}
            >
              <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                Patient Profile
              </div>
            </div>
          )}

          {/* New Patient Profile */}
          {activeHeading === 4 && (
            <div className="flex flex-row">
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading !== 4 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(2)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  Patient Profile
                </div>
              </div>
              <Image
                src="/assets/icons/arrow_forward.svg"
                width={15.81}
                height={15.81}
                alt="separator"
              />
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading === 4 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(2)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  New Test Record
                </div>
              </div>
            </div>
          )}
        </Breadcrumbs>
      </div>

      {/* All Patients */}
      {activeHeading === 1 && (
        <InstituteListAll setActiveHeading={setActiveHeading} />
      )}

      {/* Register a Patient */}
      {activeHeading === 2 && (
        <InstituteRegistration
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {/* Patient Profile */}
      {activeHeading === 3 && (
        <PatientProfile setActiveHeading={setActiveHeading} />
      )}

      {/* New Patient Record */}
      {activeHeading === 4 && (
        <PatientRecordNew
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

export default PatientsPage;
