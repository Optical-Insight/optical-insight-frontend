import React from "react";

function Footer() {
  return (
    <footer className=" bg-lightBg text-gray-700 py-4 text-center  ">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Optical Insight. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
