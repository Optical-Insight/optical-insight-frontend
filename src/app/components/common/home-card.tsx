import React from "react";
import { HomeCardProps } from "@/utils/interfaces";
import Image from "next/image";

const HomeCard = ({ iconSrc, title, count, percentage }: HomeCardProps) => {
  return (
    <div className="h-[11.328vh] w-auto md:w-auto lg:w-[15.556vw] bg-white rounded-lg">
      <div className="flex items-center h-[3.125vh] ml-[0.694vw] mr-[1.039vw] mt-[0.977vh] justify-between">
        <div className="flex ">
          <div className="relative h-[3.125vh] w-[2.222vw] bg-dashbordIconBg rounded-md flex justify-center items-center ">
            <Image
              src={iconSrc}
              alt="dashboard 01 icon"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
          <div className="text-[14px] text-lightText ml-[0.556vw] ">
            {title}
          </div>
        </div>
        <div className="relative">
          <Image
            src="/assets/icons/three_dots.svg"
            alt="three_dots icon"
            height={5}
            width={5}
          />
        </div>
      </div>

      <div className="flex items-center h-[4.688vh] ml-[0.694vw] mr-[1.667vw] mt-[1.563vh] mb-[0.977vh] justify-between">
        <div className="text-[40px] text-blueText font-semibold">
          {count < 10 ? `0${count}` : count}
        </div>

        <div className="relative w-auto pl-1 pr-1 h-[2.441vh] bg-buttonPrimary rounded-2xl flex items-center justify-center">
          <Image
            src="/assets/icons/up_arrow.svg"
            alt="up arrow icon"
            height={14}
            width={14}
          />
          <div className="text-[10.77px] text-white">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
