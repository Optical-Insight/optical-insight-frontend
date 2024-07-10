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
    <div className="relative w-screen h-screen flex">
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
      <div className="w-1/2 flex justify-center items-center z-10">
        <div className="w-[50vw]">
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
      <div className="w-1/2 flex justify-center items-center z-10">
        <div className="w-[50vw]">
          <div className="w-[41.528vw]  border border-buttonText rounded-2xl bg-lightBg">
            <div className="text-[47.97px] text-headerText font-bold mt-[7.706vh] ml-[5.278vw]">
              Login
            </div>
            <div className="mt-[2.768vh] ml-[5.278vw]">
              <label className="block text-[15.99px] text-labelText">
                {loginLabel === "Email" ? "Email Address" : "Phone Number"}
              </label>
              <input
                placeholder={
                  loginLabel === "Email" ? "kamal@opticin.com" : "0123456789"
                }
                className="w-[30.962vw] h-[5.563vh] mt-[0.781vh] rounded-[7px] text-[16.99px]"
              />
            </div>
            <div className="mt-[2.768vh] mx-auto w-[30.962vw] h-[5.557vh] flex justify-center">
              <CommonBtn
                label="Login"
                onClick={handleSubmitLogin}
                isFullWidth={true}
                height={5.557}
              />
            </div>
            <div
              className="mt-[0.781vh] mx-auto w-[30.962vw] h-[5.557vh] flex justify-center text-buttonPrimary text-[15.99px] cursor-pointer"
              onClick={handleChangeLoginMethod}
            >
              Or continue with {loginLabel === "Email" ? "Phone" : "Email"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
