import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SidebarItemProps } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import ModalConfirm from "./modal-confirm";
import Footer from "@/app/components/common/footer";
const SidebarItem = ({
  iconSrc,
  iconSrcActive,
  label,
  isActive,
  handleTabChange,
  isShrunk,
}: SidebarItemProps) => (
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

const AppSidebar = ({
  tab,
  children,
}: {
  tab: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
  const [isShrunk, setIsShrunk] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isAuthenticated, logout, userData } = useAuth();

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
    if (isAuthenticated) logout();
  };

  const initialSidebarItems = [
    {
      iconSrc: "/assets/icons/home-sidebar.svg",
      iconSrcActive: "/assets/icons/home-sidebar-active.svg",
      label: "Home",
    },

    {
      iconSrc: "/assets/icons/patient-sidebar.svg",
      iconSrcActive: "/assets/icons/patient-sidebar-active.svg",
      label: "Patients",
    },
  ];

  const [sidebarItems, setSidebarItems] = useState(initialSidebarItems);

  const adminSidebarItems = [
    {
      iconSrc: "/assets/icons/institute-sidebar.svg",
      iconSrcActive: "/assets/icons/institute-sidebar-active.svg",
      label: "Institutes",
    },
    {
      iconSrc: "/assets/icons/institute-sidebar.svg",
      iconSrcActive: "/assets/icons/institute-sidebar-active.svg",
      label: "Branches",
    },
    {
      iconSrc: "/assets/icons/institute-sidebar.svg",
      iconSrcActive: "/assets/icons/institute-sidebar-active.svg",
      label: "Branch Heads",
    },
    {
      iconSrc: "/assets/icons/labtech-sidebar.svg",
      iconSrcActive: "/assets/icons/labtech-sidebar-active.svg",
      label: "Lab Technicians",
    },
    {
      iconSrc: "/assets/icons/doc-sidebar.svg",
      iconSrcActive: "/assets/icons/doc-sidebar-active.svg",
      label: "Doctors",
    },
  ];

  const sDirectorItems = [
    {
      iconSrc: "/assets/icons/institute-sidebar.svg",
      iconSrcActive: "/assets/icons/institute-sidebar-active.svg",
      label: "Branches",
    },
    {
      iconSrc: "/assets/icons/labtech-sidebar.svg",
      iconSrcActive: "/assets/icons/labtech-sidebar-active.svg",
      label: "Lab Technicians",
    },
    {
      iconSrc: "/assets/icons/doc-sidebar.svg",
      iconSrcActive: "/assets/icons/doc-sidebar-active.svg",
      label: "Doctors",
    },
  ];

  const directorItems = [
    {
      iconSrc: "/assets/icons/labtech-sidebar.svg",
      iconSrcActive: "/assets/icons/labtech-sidebar-active.svg",
      label: "Lab Technicians",
    },
    {
      iconSrc: "/assets/icons/doc-sidebar.svg",
      iconSrcActive: "/assets/icons/doc-sidebar-active.svg",
      label: "Doctors",
    },
  ];

  useEffect(() => {
    if (userData && userData.type === "admin") {
      setSidebarItems([...initialSidebarItems, ...adminSidebarItems]);
    } else if (userData && userData.type === "sdirector") {
      setSidebarItems([...initialSidebarItems, ...sDirectorItems]);
    } else if (userData && userData.type === "director") {
      setSidebarItems([...initialSidebarItems, ...directorItems]);
    } else {
      setSidebarItems(initialSidebarItems);
    }
  }, [userData]);

  // useEffect(() => {
  //   if (userData && userData.type === "admin") {
  //     setSidebarItems([...initialSidebarItems, ...adminSidebarItems]);
  //   } else {
  //     setSidebarItems(initialSidebarItems);
  //   }
  // }, [userData]);

  return (
    <div className="flex flex-row bg-lightBg h-screen overflow-hidden w-full">
      <div className={` bg-blueBg px-6 xl:px-8   flex flex-col h-screen fixed`}>
        <div className={`flex flex-col h-full`}>
          {/* Logo */}
          <div className="flex justify-between items-center h-[140px]">
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

          {/* Sidebar Items */}
          <div className="flex flex-col flex-grow items-center mt-8 gap-4">
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

          {/* User Info */}
          {userData && (
            <div className="flex items-center justify-start mt-auto mb-12 ">
              {!isShrunk && (
                <>
                  <Image
                    className="cursor-pointer mr-[15px]"
                    alt={"Optical Insight Logo"}
                    src="/assets/images/empty-profile.png"
                    width={42.17}
                    height={42.17}
                  />
                  <div className="flex flex-col text-white mr-[15px]">
                    <div className="text-[12.65px] cursor-pointer">
                      {userData?.name}
                    </div>
                    <div className="text-[12.65px] w-[12rem]">
                      {userData?.email}
                    </div>
                  </div>
                </>
              )}
              <Image
                className={`flex cursor-pointer ${
                  isShrunk ? "mx-auto" : "ml-auto"
                }`}
                alt={"Optical Insight Logo"}
                src="/assets/icons/sign-out-sidebar.svg"
                width={21.08}
                height={21.08}
                onClick={() => setShowDeleteModal(true)}
              />
            </div>
          )}
        </div>
      </div>{" "}
      <div
        className={`flex-grow ${
          isShrunk ? "ml-[9rem]" : "ml-[24rem]"
        }  h-screen  overflow-auto pr-[3vw]`}
      >
        <div className="min-h-[95vh]"> {children} </div>
        <Footer />
      </div>
      {/* Logout Confirm Modal */}
      <ModalConfirm
        title={`Confirm Logout`}
        // title={`Confirm Logout - ${userData?.name}`}
        message="Are you sure you want to logout from the system?"
        confirmLabel="Logout"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AppSidebar;
