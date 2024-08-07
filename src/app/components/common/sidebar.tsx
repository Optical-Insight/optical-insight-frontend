import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SidebarItemProps } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";

const SidebarItem = ({
  iconSrc,
  iconSrcActive,
  label,
  isActive,
  handleTabChange,
  isShrunk,
}: SidebarItemProps & { isShrunk: boolean }) => (
  <div
    className={` flex flex-row items-center  ${
      isShrunk ? "w-[40px]" : "w-[230px]"
    } h-[44px] mb-[6px] cursor-pointer rounded-[7px] ${
      isActive
        ? "bg-sidebarFillBg text-sidebarText font-semibold"
        : "text-white"
    }`}
    onClick={() => handleTabChange(label.toLowerCase())}
  >
    <Image
      className={`${isShrunk ? "m-auto" : "mr-[18px] ml-[18px] "}`}
      src={isActive ? iconSrcActive : iconSrc}
      width={20.06}
      height={20.06}
      alt={label}
    />
    {!isShrunk && <div className="text-[16.05px]">{label}</div>}
  </div>
);

const AppSidebar = ({ tab }: { tab: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getClassNameFromLabel = (label: string) => {
    return label.toLowerCase().replace(/\s+/g, "-");
  };

  const handleTabChange = (pressedTab: string) => {
    setActiveTab(getClassNameFromLabel(pressedTab));
    router.push(`/dashboard/${pressedTab.replace(/\s+/g, "-")}`);
  };

  const handleLogout = () => {
    router.push("/");
  };

  const sidebarItems = [
    {
      iconSrc: "/assets/icons/home-sidebar.svg",
      iconSrcActive: "/assets/icons/home-sidebar-active.svg",
      label: "Home",
    },
    {
      iconSrc: "/assets/icons/institute-heads.svg",
      iconSrcActive: "/assets/icons/institute-heads-active.svg",
      label: "Institutes",
    },
    {
      iconSrc: "/assets/icons/institute-heads.svg",
      iconSrcActive: "/assets/icons/institute-heads-active.svg",
      label: "Institute Heads",
    },
    {
      iconSrc: "/assets/icons/institute-heads.svg",
      iconSrcActive: "/assets/icons/institute-heads-active.svg",
      label: "Lab Technicians",
    },
    {
      iconSrc: "/assets/icons/institute-heads.svg",
      iconSrcActive: "/assets/icons/institute-heads-active.svg",
      label: "Doctors",
    },
    {
      iconSrc: "/assets/icons/institute-heads.svg",
      iconSrcActive: "/assets/icons/institute-heads-active.svg",
      label: "Patients",
    },
    {
      iconSrc: "/assets/icons/notification-sidebar.svg",
      iconSrcActive: "/assets/icons/notification-sidebar-active.svg",
      label: "Notification",
    },
    {
      iconSrc: "/assets/icons/settings-sidebar.svg",
      iconSrcActive: "/assets/icons/settings-sidebar-active.svg",
      label: "Settings",
    },
  ];

  return (
    <div
      className={`bg-blueBg px-6 xl:px-8 w-fit flex flex-col justify-between `}
    >
      <div className="flex justify-between items-center h-[140px] ">
        <Image
          className={`m-auto ${isShrunk ? "hidden" : "block"}`}
          alt={"Optical Insight Logo"}
          src="/assets/images/logo.png"
          width={172}
          height={68}
        />
        <button
          className="text-white text-xl m-auto cursor-pointer"
          onClick={() => setIsShrunk(!isShrunk)}
        >
          {isShrunk ? <MdOutlineMenu /> : <IoIosArrowDropleft />}
        </button>
      </div>

      <div className="flex flex-col items-center flex-grow ">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            iconSrc={item.iconSrc}
            iconSrcActive={item.iconSrcActive}
            label={item.label}
            isActive={activeTab === getClassNameFromLabel(item.label)}
            handleTabChange={handleTabChange}
            isShrunk={isShrunk}
          />
        ))}
      </div>

      <div className="flex items-center py-10">
        {!isShrunk && (
          <>
            <Image
              className="cursor-pointer mr-[15px]"
              alt={"Optical Insight Logo"}
              src="/assets/images/profile-photo-sample.png"
              width={42.17}
              height={42.17}
            />
            <div className="flex flex-col text-white mr-[15px]">
              <div className="text-[12.65px] cursor-pointer">
                Kithmina Siriwardana
              </div>
              <div className="text-[12.65px]">kithmina.s@opticalin.com</div>
            </div>
          </>
        )}
        <Image
          className={`flex cursor-pointer ${isShrunk ? "mx-auto" : "ml-auto"}`}
          alt={"Optical Insight Logo"}
          src="/assets/icons/sign-out-sidebar.svg"
          width={21.08}
          height={21.08}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
