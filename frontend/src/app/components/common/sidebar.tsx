import React from "react";
import Image from "next/image";
import { SidebarItemProps } from "@/utils/interfaces";

const SidebarItem = ({ iconSrc, label }: SidebarItemProps) => (
  <div className="flex flex-row items-center w-[18.455vw] h-[4.31vh] mb-[1.374vw] cursor-pointer">
    <Image
      className="mr-[0.835vw] ml-[0.835vw]"
      src={iconSrc}
      width={20.06}
      height={20.06}
      alt={label}
    />
    <div className="text-[16.05px]">{label}</div>
  </div>
);

const AppSidebar = ({ tab }: { tab: string }) => {
  //   const [isContentLoaded, setIsContentLoaded] = useState(false);
  //   const [collapsed, setCollapsed] = useState(false);

  console.log(tab);

  const sidebarItems = [
    { iconSrc: "/assets/icons/home-sidebar.svg", label: "Home" },
    { iconSrc: "/assets/icons/institute-heads.svg", label: "Institutes" },
    { iconSrc: "/assets/icons/institute-heads.svg", label: "Institute Heads" },
    { iconSrc: "/assets/icons/institute-heads.svg", label: "Lab Technicians" },
    { iconSrc: "/assets/icons/institute-heads.svg", label: "Doctors" },
    { iconSrc: "/assets/icons/institute-heads.svg", label: "Patients" },
    {
      iconSrc: "/assets/icons/notification-sidebar.svg",
      label: "Notification",
    },
    { iconSrc: "/assets/icons/settings-sidebar.svg", label: "Settings" },
  ];

  return (
    <div className="w-[22.778vw] h-[100vh] bg-blueBg">
      <Image
        className="m-auto mt-[6.25vh] mb-[9vh]"
        alt={"Optical Insight Logo"}
        src="/assets/images/logo.png"
        width={172}
        height={68}
      />

      <div className="flex flex-col items-center">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} iconSrc={item.iconSrc} label={item.label} />
        ))}
      </div>

      <div className="flex flex-row items-center w-[18.455vw] mt-[6vh] ml-[1.684vw]">
        <Image
          className="ml-[0.878vw] mr-[1.172vw] cursor-pointer"
          alt={"Optical Insight Logo"}
          src="/assets/images/profile-photo-sample.png"
          width={42.17}
          height={42.17}
        />
        <div className="flex flex-col w-[10.835vw] mr-[1.172vw]">
          <div className="text-[12.65px] cursor-pointer">
            Kithmina Siriwardana
          </div>
          <div className="text-[12.65px]">kithmina.s@opticalin.com</div>
        </div>
        <Image
          className="flex cursor-pointer"
          alt={"Optical Insight Logo"}
          src="/assets/icons/sign-out-sidebar.svg"
          width={21.08}
          height={21.08}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
