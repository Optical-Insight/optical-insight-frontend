"use client";
import CommomBtn from "@/app/components/common/button";
import React from "react";
import HomeCard from "../../../../components/common/home-card";

const handleSubmit = () => {
  console.log("Button clicked");
};

const LabTechniciansPage = () => {
  return (
    <div className="bg-lightBg w-[76.222vw] h-[100vh]">
      <div className="w-full pl-[3.125vw] pr-[4.444vw] pt-[6.25vh] pb-[4.785vh]">
        {/* Top bar */}
        <div className="pt-[1.563vh] pb-[1.563vh] pl-[1.52vw] pr-[1.544vw] flex justify-between bg-lightBlueBg rounded-lg">
          <div className="w-[28.331vw] h-[4.688vh] flex">
            <input
              type="search"
              placeholder="Search Anything here..."
              className="w-full h-full bg-white rounded-lg"
            />
            <img
              src="/assets/icons/search.svg"
              alt="search"
              className="absolute justify-center items-center ml-[25.567vw] mt-[1.367vh]"
            />
          </div>
          <div className="flex items-center justify-center w-[3.317vw] h-[4.688vh] bg-white rounded-lg">
            <img
              src="/assets/icons/notifications_bell.svg"
              alt="notification icon"
            />
          </div>
        </div>

        {/* Welcome bar */}
        <div className="mt-[2.246vh] mb-[2.344vh] bg-transparent flex justify-between items-center">
          <div className="text-headerText text-[32px] font-semibold">
            Welcome back, John
          </div>
          <div className="flex gap-[0.556vw]">
            <div className="text-headerText text-[16px] w-[15.347vw] h-[4.102vh] font-medium ">
              <CommomBtn
                label="Add new Patient"
                onClick={handleSubmit}
                isFullWidth={true}
                height={4.102}
              />
            </div>
            <div className="text-headerText text-[16px] w-[15.347vw] h-[4.102vh] font-medium ">
              <CommomBtn
                label="Add new Doctor"
                onClick={handleSubmit}
                isFullWidth={true}
                height={4.102}
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="h-[14.551vh] flex justify-between bg-lightBlueBg rounded-lg pl-[1.528vw] pr-[1.528vw] pt-[1.563vh] pb-[1.563vh]">
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

        {/* Table */}
        <div className="flex justify-between pt-[1.758vh] pb-[2.246vh] pl-[1.528vw] pr-[1.528vw] mt-[0.781vh]  bg-lightBlueBg rounded-lg">
          <div className="w-[32.431vw] h-[51.125vh] bg-white rounded-lg"></div>
          <div className="w-[32.431vw] h-[51.125vh] bg-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LabTechniciansPage;
