import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faHourglassHalf } from "@fortawesome/free-solid-svg-icons"; // Importa ambos íconos

interface NameInputProps {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ setFirstName, setLastName }) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const handleGenerate = () => {
    const newErrors: { firstName?: string; lastName?: string } = {};

    if (!firstNameInput.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastNameInput.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setFirstName(firstNameInput);
      setLastName(lastNameInput);
      setIsGenerating(false);
      setErrors({});

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500); 
  };

  return (
    <div className="flex flex-col items-end">
      <div className="w-full">
        <label htmlFor="first-name" className={`text-sm ${errors.firstName ? 'text-red-600' : 'text-slate-500'}`}>
          First name
        </label>
        <div className="w-full">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
            placeholder={errors.firstName || "First Name"}
            className={`border w-full rounded-lg py-1 px-2 text-sm ${errors.firstName ? 'border-red-600' : ''}`}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <label htmlFor="last-name" className={`text-sm ${errors.lastName ? 'text-red-600' : 'text-slate-500'}`}>
          Last name
        </label>
        <div className="w-full">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="family-name"
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
            placeholder={errors.lastName || "Last Name"}
            className={`border w-full rounded-lg py-1 px-2 text-sm ${errors.lastName ? 'border-red-600' : ''}`}
          />
        </div>
      </div>

      {isGenerating ? (
        <div className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mt-4 text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center">
          <FontAwesomeIcon icon={faHourglassHalf} className="animate-spin" />
          <span className="ml-2">Generating avatar...</span>
        </div>
      ) : (
        <button
          onClick={handleGenerate}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mt-4 text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faWandMagicSparkles} className="me-2" />
          Generate Avatar
        </button>
      )}
    </div>
  );
};

export default NameInput;
