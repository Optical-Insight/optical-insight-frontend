"use client";
import CommonBtn from "@/app/components/common/button";
import { PatientNewTestDataProps } from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

const PatientProfilePage = ({
  handleBreadcrumbClick,
}: PatientNewTestDataProps) => {
  return (
    <div>
      <div className="bg-lightBlueBg pt-[1.563vh] pb-[2.148vh] flex flex-col items-center rounded-lg">
        <div className="bg-white h-[16.309vh] w-[67.986vw] rounded-lg"></div>
        <div className="mt-[1.563vh] w-[67.986vw] h-[30.664vh] flex justify-between">
          <div className="bg-white h-full w-[18.542vw] rounded-lg"></div>
          <div className="bg-white h-full w-[48.611vw] rounded-lg pt-[0.977vh] pl-[0.694vw] pr-[1.528vw]">
            <div className="flex justify-between items-center h-[3.125vh] ">
              <div className="flex">
                <div className="relative h-[3.125vh] w-[2.222vw]  bg-dashbordIconBg rounded-md flex justify-center items-center">
                  {/* <img
                    src="/assets/icons/dashboard_01.svg"
                    alt="dashboard 01 icon"
                  /> */}
                  <Image
                    src="/assets/icons/dashboard_01.svg"
                    alt="dashboard 01 icon"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="text-[14px] text-lightText ml-[0.556vw] font-semibold">
                  Medical History
                </div>
              </div>

              <div className="h-[3.118vh] w-[11.667vw] rounded-lg">
                <CommonBtn
                  label="Add new Test Report"
                  onClick={() => handleBreadcrumbClick(4)}
                  width={11.667}
                  height={3.118}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1.563vh] w-[67.986vw] h-[30.664vh] flex justify-between">
          <div className="bg-white h-full w-[18.542vw] rounded-lg"></div>
          <div className="bg-white h-full w-[48.611vw] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
