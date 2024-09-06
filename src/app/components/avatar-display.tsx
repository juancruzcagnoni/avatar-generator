import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const colorCombinations = [
  { background: "#FFD717", text: "#0DA574" },
  { background: "#C22828", text: "#FFD717" },
  { background: "#0DA574", text: "#D19FEB" },
  { background: "#D19FEB", text: "#C22828" },
];

interface AvatarDisplayProps {
  firstName: string;
  lastName: string;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  firstName,
  lastName,
}) => {
  const [colors, setColors] = useState({
    background: "#FFD717",
    text: "#0DA574",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    const randomColorCombination =
      colorCombinations[Math.floor(Math.random() * colorCombinations.length)];
    setColors(randomColorCombination);
  }, [firstName, lastName]);

  const refreshAvatar = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomColorCombination =
        colorCombinations[Math.floor(Math.random() * colorCombinations.length)];
      setColors(randomColorCombination);
      setIsGenerating(false); 
    }, 1500); 
  };

  return (
    <div className="relative group">
      {" "}
      <svg
        id="avatar-svg"
        width="150"
        height="150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="75" cy="75" r="75" fill={colors.background} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="75"
          fill={colors.text}
          fontWeight="bold"
          letterSpacing="-3px"
          style={{ fontFamily: "'inter', serif" }} 
        >
          {initials}
        </text>
      </svg>
      {isGenerating && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 rounded-full">
          <button onClick={refreshAvatar} className="text-white animate-spin">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      )}
      <button
        onClick={refreshAvatar}
        className="absolute inset-0 flex justify-center items-center z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FontAwesomeIcon icon={faArrowsRotate} className="text-white" />
      </button>
    </div>
  );
};

export default AvatarDisplay;
