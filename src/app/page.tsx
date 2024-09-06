"use client"

import React, { useState } from "react";
import AvatarDisplay from "./components/avatar-display";
import NameInput from "./components/name-input";
import DownloadButton from "./components/download-button";

const Home: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const downloadAvatar = () => {
    const svgElement = document.getElementById("avatar-svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);

    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "avatar.svg"; 
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link); 
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md relative">
        <header className="p-3 border-b">
          <p className="font-bold text-center">Generate a new avatar!</p>
        </header>
        <div className="p-3">
          <NameInput setFirstName={setFirstName} setLastName={setLastName} />
        </div>
      </div>
  
      <div className="bg-white flex flex-col items-center shadow-md rounded-xl mt-6 p-3 w-full max-w-md relative">
        <AvatarDisplay firstName={firstName || " "} lastName={lastName || " "} />
  
        <div className="mt-4 w-full">
          <DownloadButton downloadAvatar={downloadAvatar} />
        </div>
      </div>
    </div>
  );
};

export default Home;
