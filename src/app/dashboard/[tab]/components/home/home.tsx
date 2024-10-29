"use client";
import CommonBtn from "@/app/components/common/button";
import React, { useEffect, useState } from "react";
import HomeCard from "../../../../components/common/home-card";
import ReportsList from "./reports-list";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  GET_ALL_INSTITUTES_URL,
  GET_ALL_REPORTS,
  GET_ALL_USERS_BY_TYPE_URL,
} from "@/constants/config";
import axios from "axios";
import { PatientsAllProps } from "@/utils/patient";

const HomePage = () => {
  const router = useRouter();
  const { storedAuthData, userData } = useAuth();
  // const [isLoading, setIsLoading] = useState(false);
  const [patientCount, setPatientCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [institueCount, setInstituteCount] = useState(0);
  const [totalTests, setTotalTests] = useState(0);

  const handleSubmit = () => {
    router.push(`/dashboard/patients`);
  };

  const fetchAllPatients = async () => {
    if (storedAuthData.userType !== "admin") {
      try {
        // setIsLoading(true);
        const response = await axios.get(GET_ALL_USERS_BY_TYPE_URL, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // Filter patients based on their type and branchId
        const filteredPatients = response.data.filter(
          (patient: PatientsAllProps) =>
            patient.type === "patient" &&
            userData &&
            patient.branchId &&
            patient.branchId === userData.branchId
        );

        //Get total patients count
        const totalPatients = filteredPatients.length;
        setPatientCount(totalPatients);

        // setIsLoading(false);
      } catch (err: any) {
        console.error(
          "Error in retrieving data",
          err.response?.data || err.message
        );
      }
    } else {
      try {
        // setIsLoading(true);
        const response = await axios.get(GET_ALL_USERS_BY_TYPE_URL, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // Filter patients based on their type
        const filteredPatients = response.data.filter(
          (patient: PatientsAllProps) => patient.type === "patient"
        );

        //Get total patients count
        const totalPatients = filteredPatients.length;
        setPatientCount(totalPatients);

        // setIsLoading(false);
      } catch (err: any) {
        console.error(
          "Error in retrieving data",
          err.response?.data || err.message
        );
      }
    }
  };

  const fetchAllDoctors = async () => {
    if (storedAuthData.userType !== "admin") {
      try {
        // setIsLoading(true);
        const response = await axios.get(GET_ALL_USERS_BY_TYPE_URL, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // Filter patients based on their type and branchId
        const filteredPatients = response.data.filter(
          (patient: PatientsAllProps) =>
            patient.type === "doctor" &&
            userData &&
            patient.branchId &&
            patient.branchId === userData.branchId
        );

        //Get total patients count
        const totalPatients = filteredPatients.length;
        setDoctorsCount(totalPatients);

        // setIsLoading(false);
      } catch (err: any) {
        console.error(
          "Error in retrieving data",
          err.response?.data || err.message
        );
      }
    } else {
      try {
        // setIsLoading(true);
        const response = await axios.get(GET_ALL_USERS_BY_TYPE_URL, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // Filter patients based on their type
        const filteredPatients = response.data.filter(
          (patient: PatientsAllProps) => patient.type === "doctor"
        );

        //Get total patients count
        const totalPatients = filteredPatients.length;
        setDoctorsCount(totalPatients);

        // setIsLoading(false);
      } catch (err: any) {
        console.error(
          "Error in retrieving data",
          err.response?.data || err.message
        );
      }
    }
  };

  const fetchAllInstitutes = async () => {
    // setIsLoading(true);
    await axios
      .get(GET_ALL_INSTITUTES_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //Get total institutes count
        const totalInstitutes = response.data.length;
        setInstituteCount(totalInstitutes);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error in retrieving data", err.response.data);
      });
  };

  const fetchAllReports = async () => {
    try {
      // setIsLoading(true);
      await axios
        .get(GET_ALL_REPORTS, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          //Get total tests count
          const totalTestsLength = res.data.length;
          setTotalTests(totalTestsLength);
          // setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchAllPatients();
    fetchAllDoctors();
    fetchAllInstitutes();
    fetchAllReports();
  }, [storedAuthData]);

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
            count={patientCount}
            percentage={12}
          />
          <HomeCard
            iconSrc="/assets/icons/dashboard_02.svg"
            title="Total Doctors"
            count={doctorsCount}
            percentage={14}
          />
          {storedAuthData.userType === "admin" && (
            <HomeCard
              iconSrc="/assets/icons/dashboard_03.svg"
              title="Total Institutes"
              count={institueCount}
              percentage={21}
            />
          )}
          <HomeCard
            iconSrc="/assets/icons/dashboard_04.svg"
            title="Total Tests"
            count={totalTests}
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
