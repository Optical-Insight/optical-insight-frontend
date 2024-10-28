"use client";
import CommonBtn from "@/app/components/common/button";
import React from "react";
import HomeCard from "../../../../components/common/home-card";
import ReportsList from "./reports-list";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const { userData } = useAuth();

  const handleSubmit = () => {
    router.push(`/dashboard/patients`);
  };

  return (
    <div className="overflow-auto">
      <div className="mt-[50px] mb-[16px]">
        {/* Welcome bar */}
        <div className="mt-[2.246vh] mb-[2.344vh] bg-transparent flex justify-between items-center">
          <div className="text-headerText  font-semibold text-4xl lg:text-[40px]">
            Welcome back, {userData?.name?.split(" ")[0]}
          </div>
          <div className="flex gap-[20px] xl:gap-[20px]">
            <div className="text-headerText text-sm xl:text-[16px] h-[42px] font-medium ">
              <CommonBtn label="Add new Patient" onClick={handleSubmit} />
            </div>
            {/* <div className="text-headerText text-sm xl:text-[16px] h-[42px] font-medium ">
            <CommonBtn label="Download Report" onClick={fetchPdf} />
          </div> */}
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
            title="Total Doctors"
            count={156}
            percentage={14}
          />
          <HomeCard
            iconSrc="/assets/icons/dashboard_03.svg"
            title="Total Institutes"
            count={465}
            percentage={21}
          />
          <HomeCard
            iconSrc="/assets/icons/dashboard_04.svg"
            title="Total Tests"
            count={172}
            percentage={2}
          />
        </div>

        {/* Reports */}
        <ReportsList />
      </div>
    </div>
  );
};

export default HomePage;
