import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface DownloadButtonProps {
  downloadAvatar: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadAvatar }) => {
  return (
    <button
      onClick={downloadAvatar}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mt-4 text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      <FontAwesomeIcon icon={faDownload} className="me-2" />
      Download Avatar as SVG
    </button>
  );
};

export default DownloadButton;
