"use client";
import CommonBtn from "@/app/components/common/button";
import React from "react";
import HomeCard from "../../../../components/common/home-card";
import Image from "next/image";

const handleSubmit = () => {
  console.log("Button clicked");
};

const LabTechniciansPage = () => {
  return (
    <div className=" pl-[3.125vw] pr-[4.444vw] pt-[6.25vh] pb-[4.785vh]">
      {/* Top bar */}
      <div className="pt-[1.563vh] pb-[1.563vh] pl-[1.52vw] pr-[1.544vw] flex justify-between bg-lightBlueBg rounded-lg">
        <div className="relative w-[30vw] h-[4.688vh] flex  bg-white rounded-lg">
          <input
            type="search"
            placeholder="  Search Anything here..."
            className="w-full h-full bg-white rounded-lg text-sm xl:text-base "
          />

          <div className="flex items-center mr-[6px]">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              height={20}
              width={20}
            />
          </div>
        </div>
        <div className="relative flex items-center justify-center w-[3.317vw] h-[4.688vh] bg-white  rounded-lg">
          <Image
            src="/assets/icons/notifications_bell.svg"
            alt="notification icon"
            height={24}
            width={24}
          />
        </div>
      </div>

      {/* Welcome bar */}
      <div className="mt-[2.246vh] mb-[2.344vh] bg-transparent flex justify-between items-center">
        <div className="text-headerText text-[24px] xl:text-[32px] font-semibold">
          Welcome back, John
        </div>
        <div className="flex gap-[0.556vw]">
          <div className="text-headerText text-sm xl:text-[16px] w-[15.347vw] h-[4.102vh] font-medium ">
            <CommonBtn
              label="Add new Patient"
              onClick={handleSubmit}
              isFullWidth={true}
              height={42}
            />
          </div>
          <div className="text-headerText text-sm xl:text-[16px] w-[15.347vw] h-[4.102vh] font-medium ">
            <CommonBtn
              label="Add new Doctor"
              onClick={handleSubmit}
              isFullWidth={true}
              height={42}
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between bg-lightBlueBg rounded-lg p-[1.563vh] gap-4 lg:gap-4">
        <HomeCard
          iconSrc="/assets/icons/dashboard_01.svg"
          title="Total Patients"
          count={580}
          percentage={12}
        />
        <HomeCard
          iconSrc="/assets/icons/dashboard_02.svg"
          title="Total Appoinments"
          count={156}
          percentage={14}
        />
        <HomeCard
          iconSrc="/assets/icons/dashboard_03.svg"
          title="Total Tests"
          count={465}
          percentage={21}
        />
        <HomeCard
          iconSrc="/assets/icons/dashboard_04.svg"
          title="Total Requests"
          count={172}
          percentage={2}
        />
      </div>
    </div>
  );
};

export default LabTechniciansPage;
