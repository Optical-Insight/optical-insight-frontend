"use client";
import Image from "next/image";
import React from "react";

function PatientLogin() {
  // const handleForgotPassword = () => {
  //   console.log("Forgot password clicked");
  // };

  const handleSubmitLogin = () => {
    console.log("Login clicked");
  };

  return (
    <div className="relative w-screen h-screen flex">
      <Image
        src={"/assets/images/patient-login-bg.png"}
        alt={"patient login bg"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <Image
        className=" absolute ml-[13.333vw] mt-[39.355vh]"
        alt={"Optical Insight Logo"}
        src="/assets/images/logo.png"
        width={281}
        height={111.81}
      />

      <div className="absolute inset-0 flex ml-[52.917vw] mt-[27.051vh] ">
        <div className="w-[41.528vw] h-[45.898vh] border border-buttonText rounded-2xl bg-lightBg">
          <div className="text-[47.97px] text-headerText font-bold mt-[7.706vh] ml-[5.278vw]">
            Login
          </div>
          <div className="mt-[2.768vh] ml-[5.278vw]">
            <label className="block text-[15.99px] text-labelText">
              Email Address
            </label>
            <input
              placeholder="kamal@opticin.com"
              className="w-[30.962vw] h-[5.563vh] mt-[0.781vh] rounded-[7px] text-[16.99px]"
            />
          </div>
          <div className="mt-[2.768vh] mx-auto w-[30.962vw] h-[5.557vh] flex justify-center">
            <button
              onClick={handleSubmitLogin}
              className="w-full h-full bg-buttonPrimary text-buttonText rounded-[7px]"
            >
              Login
            </button>
          </div>

          <div className="mt-[0.781vh] mx-auto w-[30.962vw] h-[5.557vh] flex justify-center text-buttonPrimary text-[15.99px]">
            Or Continue With Phone
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
