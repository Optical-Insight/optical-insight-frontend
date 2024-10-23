"use client";
import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Image from "next/image";
import BranchRegistration from "./branch-reg";
import BranchListAll from "./branch-list";
import { BranchAllRowProps } from "@/utils/branch";

const BranchesPage = () => {
  const [activeHeading, setActiveHeading] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [clickedRow, setClickedRow] = useState<BranchAllRowProps | null>(null);

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
              alt="separator"
            />
            <div className="font-semibold text-[13.7px] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
              All Branches
            </div>
          </div>
          {activeHeading >= 2 && (
            <div
              color="inherit"
              className={`flex items-center cursor-pointer ${
                activeHeading === 2 && "bg-sidebarFillBg text-blueText"
              } rounded-md`}
              onClick={() => handleBreadcrumbClick(2)}
            >
              <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                Register an Branch
              </div>
            </div>
          )}
        </Breadcrumbs>
      </div>

      {/* All Branches */}
      {activeHeading === 1 && (
        <BranchListAll
          setActiveHeading={setActiveHeading}
          clickedRow={clickedRow}
          setClickedRow={setClickedRow}
        />
      )}

      {/* Register an Branch */}
      {activeHeading === 2 && (
        <BranchRegistration
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setActiveHeading={setActiveHeading}
          clickedRow={clickedRow}
        />
      )}
    </div>
  );
};

export default BranchesPage;