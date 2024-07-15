"use client";
import CommonBtn from "@/app/components/common/button";
import Image from "next/image";
import React, { useState } from "react";

function PatientLogin() {
  const [loginLabel, setLoginLabel] = useState("Email");

  const handleSubmitLogin = () => {
    console.log("Login clicked");
  };

  const handleChangeLoginMethod = () => {
    setLoginLabel(loginLabel === "Email" ? "Phone" : "Email");
  };

  return (
    <div className="relative w-screen h-screen flex flex-col md:flex-row justify-center items-center">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src={"/assets/images/patient-login-bg.png"}
          alt={"patient login bg"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* LEFT SECTION */}
      <div className="w-1/2 flex justify-center items-center z-10 mb-10 md:mb-0">
        <div className="w-[218px]">
          <Image
            className="m-auto"
            alt={"Optical Insight Logo"}
            src="/assets/images/logo.png"
            width={281}
            height={111.81}
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-[80%] md:w-1/2 flex justify-center items-center z-10">
        <div className="w-full md:w-[90%] md:pl-3 md:pr-3 border border-buttonText rounded-2xl bg-lightBg pt-5 pb-5">
          <div className="text-4xl text-center md:text-5xl text-headerText font-bold mb-5">
            Login
          </div>
          <div className="ml-4 mr-4">
            <label className="block text-sm  text-labelText">
              {loginLabel === "Email" ? "Email Address" : "Phone Number"}
            </label>
            <input
              placeholder={
                loginLabel === "Email" ? "kamal@opticin.com" : "0123456789"
              }
              className="w-full rounded-[7px] text-sm h-8 md:h-12"
            />
          </div>
          <div className="mx-auto flex justify-center mt-5 ml-4 mr-4 h-9 md:h-12">
            <CommonBtn label="Login" onClick={handleSubmitLogin} />
          </div>
          <div
            className="mt-3 mx-auto w-full flex justify-center text-buttonPrimary text-sm  cursor-pointer "
            onClick={handleChangeLoginMethod}
          >
            Or continue with {loginLabel === "Email" ? "Phone" : "Email"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
