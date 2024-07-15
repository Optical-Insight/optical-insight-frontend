import React from "react";
import { InstituteListAllProps } from "@/utils/interfaces";
import CommonBtn from "@/app/components/common/button";
import SearchFilter from "@/app/components/common/search-filter";

const InstituteListAll = ({ setActiveHeading }: InstituteListAllProps) => {
  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px] ">
          List of all Institute Heads
        </div>
        <div className="flex h-[42px] w-[260px] ">
          <CommonBtn
            label="Register new Institute Head"
            onClick={() => setActiveHeading && setActiveHeading(2)}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for an Institute"
        placeholderSearch="Search Institute by name"
        labelSelectOne="Status"
        labelSelectTwo="Location"
        onSearch={() => {}}
      />
    </div>
  );
};

export default InstituteListAll;
