"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";

const CommomBackBtn = ({ label, onClick }: CommonBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-full bg-buttonPrimary text-buttonText text-sm md:text-base rounded-[7px] px-[15px]`}
      // dangerouslySetInnerHTML={{ __html: label }}
    >
      {label}
    </button>
  );
};

export default CommomBackBtn;
