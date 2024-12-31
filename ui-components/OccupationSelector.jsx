import React, { useState } from 'react';
import './styles/OccupationSelector.css';

const COMMON_OCCUPATIONS = [
  "Accountant",
  "Actor/Performer",
  "Administrative Professional",
  "Architect",
  "Artist",
  "Athlete",
  "Baker/Chef",
  "Banker",
  "Business Owner",
  "Consultant",
  "Customer Service Representative",
  "Dentist",
  "Designer",
  "Doctor",
  "Educator",
  "Engineer",
  "Entrepreneur",
  "Financial Advisor",
  "Firefighter",
  "Government Employee",
  "Healthcare Professional",
  "Hospitality Worker",
  "Human Resources Professional",
  "Insurance Agent",
  "IT Professional",
  "Journalist",
  "Lawyer",
  "Manager",
  "Marketing Professional",
  "Mechanic",
  "Military Personnel",
  "Musician",
  "Nurse",
  "Pharmacist",
  "Photographer",
  "Police Officer",
  "Real Estate Agent",
  "Researcher",
  "Retail Worker",
  "Sales Professional",
  "Scientist",
  "Social Worker",
  "Student", // Already included in alphabetical order
  "Technician",
  "Therapist",
  "Trade Worker",
  "Transportation Worker",
  "Veterinarian",
  "Writer/Editor"
].sort(); // Keeping the list alphabetically sorted for easier navigation

const OccupationSelector = ({ selectedOccupation, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (occupation) => {
    onChange(occupation);
    setIsOpen(false);
  };

  return (
    <div className="occupation-select-container">
      <div
        className={`occupation-display ${selectedOccupation ? 'has-value' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOccupation || 'Select an occupation'}
      </div>
      {isOpen && (
        <div className="occupation-options-dropdown">
          {COMMON_OCCUPATIONS.map((occupation) => (
            <div
              key={occupation}
              className={`occupation-option ${selectedOccupation === occupation ? 'selected' : ''}`}
              onClick={() => handleSelect(occupation)}
            >
              {occupation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OccupationSelector;