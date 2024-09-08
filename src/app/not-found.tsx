"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg">
      <h1 className="text-6xl text-blueText font-bold mb-4">Oops!</h1>
      <Image
        src="/assets/images/not-found.png"
        alt="404"
        width={300}
        height={300}
        className="mb-4"
      />
      <h1 className="text-4xl text-blueText font-bold mb-4">Page Not Found</h1>
      <p className="mb-4 text-disabledText">
        The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <button
        className="btn-primary bg-buttonPrimary py-2 px-3 rounded-md"
        onClick={() => router.replace("/dashboard/home")}
      >
        Go back to Home
      </button>
    </div>
  );
};

export default Custom404;
