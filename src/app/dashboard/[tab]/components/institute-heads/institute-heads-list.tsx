import React from "react";
import { InstituteListAllProps } from "@/utils/interfaces";
import CommonBtn from "@/app/components/common/button";
import SearchFilter from "@/app/components/common/search-filter";

const InstituteListAll = ({ setActiveHeading }: InstituteListAllProps) => {
  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px]">
          List of all Institute Heads
        </div>
        <div className="flex h-[42px]">
          <CommonBtn
            label="Register new Institute Head"
            onClick={() => setActiveHeading && setActiveHeading(2)}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for an Institute"
        labelSelectOne="Employment Status"
        labelSelectTwo="Location"
        placeholderSearch="Search by Name or Institute Name"
        optionsSelectOne={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ]}
        optionsSelectTwo={[
          { value: "colombo", label: "Colombo" },
          { value: "kandy", label: "Kandy" },
          { value: "gampaha", label: "Gampaha" },
        ]}
        onSearch={() => {}}
      />
    </div>
  );
};

export default InstituteListAll;
