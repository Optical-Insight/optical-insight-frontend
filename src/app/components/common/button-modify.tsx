"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";
import { Flex, Spin } from "antd";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const ModifyBtn = ({
  label,
  onClick,
  // type,
  isLoading,
  isBtnDisabled,
}: CommonBtnProps) => {
  return (
    <button
      disabled={isLoading || isBtnDisabled}
      onClick={onClick}
      className={`h-full text-buttonText text-sm md:text-base rounded-[7px] px-[15px] 
        ${
          label === "Delete"
            ? "bg-btnDanger"
            : isLoading || isBtnDisabled
            ? "bg-btnDisabled"
            : "bg-buttonPrimary"
        }  
        ${(label === "Next" || "Submit") && "w-full"}
        `}
    >
      <div className="w-full flex justify-center">
        <Flex align="center" gap="middle">
          {isLoading ? (
            <Spin />
          ) : label === "Update" ? (
            <MdEdit size={21} />
          ) : (
            <MdDeleteForever size={23} />
          )}
        </Flex>
      </div>
    </button>
  );
};

export default ModifyBtn;
