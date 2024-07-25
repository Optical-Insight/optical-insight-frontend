"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";

const CommonRegisterBtn = ({ label, onClick }: CommonBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center h-full bg-buttonPrimary text-buttonText text-sm md:text-base rounded-[7px] px-[15px]`}
      // dangerouslySetInnerHTML={{ __html: label }}
      // style={{
      //   width: width ? `${width}px` : "auto",
      //   height: height ? `${height}px` : "auto",
      // }}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-4 h-4 mr-2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      {label}
    </button>
  );
};

export default CommonRegisterBtn;