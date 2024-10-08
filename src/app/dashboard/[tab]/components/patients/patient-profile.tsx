import CommonBtn from "@/app/components/common/button";
import {
  ListAllPatientProps,
  PatientProfileCardTextProps,
  PatientProfileIconTextProps,
} from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

const PatientProfile = ({
  setActiveHeading,
  clickedRow,
}: ListAllPatientProps) => {
  const handleSubmitLogin = () => {
    console.log("Login clicked");
  };

  console.log("clickedRow: ", clickedRow);

  const PatientProfileIcons = ({
    src,
    alt,
    text,
  }: PatientProfileIconTextProps) => {
    return (
      <div className="flex flex-row gap-1 items-center text-black">
        <div className="relative h-[12px] w-[12px]">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className="text-[10px] lg:text-[14px] text-black">{text}</div>
      </div>
    );
  };

  const PatientProfileIconCard = ({
    src,
    alt,
    text,
    value,
  }: PatientProfileCardTextProps) => {
    return (
      <div className="flex flex-col p-[6px] min-w-[100px] flex-grow h-[56px] lg:h-[70px] bg-lightBlueBg rounded-md">
        <div className="flex flex-row items-center gap-[4px]">
          <div className="relative flex justify-center items-center h-[18px] w-[18px] rounded-md bg-lightBlueBgThree">
            <div className="relative h-[12px] w-[12px] rounded bg-lightBlueBgThree">
              <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="text-[10px] lg:text-[14px] text-black">{text}</div>
        </div>
        <div className="flex justify-end mt-[4px] text-[16px] lg:text-[22px] font-semibold text-black">
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-lightBlueBgTwo p-[16px] lg:p-[18px] xl:p-[20px]">
      <div className="flex space-x-3 w-full">
        <div className="relative h-[167px] lg:h-[210px] w-[120px] lg:w-[150px] rounded-md border border-red-500">
          <Image
            src={"/assets/images/profile-pic.jpg"}
            alt="dashboard 01 icon"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className="relative h-[167px] lg:h-[210px] flex flex-grow flex-col justify-between rounded-md bg-white py-[4px] px-[8px] lg:py-[8px] lg:px-[14px] ">
          {/* Details */}
          {clickedRow && (
            <div className="flex w-full ">
              <div className="flex flex-col flex-grow mr-[30px] h-[72px] lg:h-[80px] justify-between">
                <h3 className="font-bold lg:text-[24px] text-black">
                  {clickedRow.sex === "Male" ? "Mr. " : "Ms. "}{" "}
                  {clickedRow.name}
                </h3>
                <div className="">
                  <div className="flex gap-5 xl:gap-8">
                    <PatientProfileIcons
                      src="/assets/icons/gender.svg"
                      alt="gender icon"
                      text={clickedRow.sex}
                    />
                    <PatientProfileIcons
                      src="/assets/icons/profession.svg"
                      alt="profession icon"
                      text={"Software Engineer"}
                    />
                    <PatientProfileIcons
                      src="/assets/icons/phone.svg"
                      alt="phone icon"
                      text={clickedRow.phone}
                    />
                  </div>
                  <div className="flex mt-[6px] gap-5 xl:gap-8">
                    <PatientProfileIcons
                      src="/assets/icons/email.svg"
                      alt="email icon"
                      text={clickedRow.email}
                    />
                    <PatientProfileIcons
                      src="/assets/icons/location.svg"
                      alt="address icon"
                      text={clickedRow.address}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-[72px] lg:h-[80px] items-center justify-end space-y-2">
                <div className="w-24 h-8 xl:h-9 xl:w-32 flex flex-col">
                  <CommonBtn label="Edit" onClick={handleSubmitLogin} />
                </div>
                <div className="w-24 h-8 xl:h-9 xl:w-32 flex flex-col">
                  <CommonBtn
                    label="Delete"
                    onClick={handleSubmitLogin}
                    type={"Delete"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="flex flex-row space-x-3 w-full pb-[4px]">
            <PatientProfileIconCard
              src="/assets/icons/weight.svg"
              alt="Weight icon"
              text="Weight"
              value="65kg"
            />
            <PatientProfileIconCard
              src="/assets/icons/height.svg"
              alt="Height icon"
              text="Height"
              value="170cm"
            />
            <PatientProfileIconCard
              src="/assets/icons/bmi.svg"
              alt="Age"
              text="Age"
              value={String(clickedRow?.age)}
            />
            <PatientProfileIconCard
              src="/assets/icons/pressure.svg"
              alt="Pressure icon"
              text="B. Pressure"
              value="124/80"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end my-[16px] h-[42px] w-full">
        <CommonBtn
          label="Add New Test Record"
          onClick={() => setActiveHeading && setActiveHeading(4)}
        />
      </div>
    </div>
  );
};

export default PatientProfile;
