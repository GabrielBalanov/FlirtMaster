import React, { useState, useEffect, useRef } from 'react';
import { Flex } from "@aws-amplify/ui-react";
import './styles/HeightSelector.css';

const HeightSelector = ({ value, onChange }) => {
  const [unit, setUnit] = useState('ft');
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("5'7\"");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Initialize with default value on mount
  useEffect(() => {
    if (!value) {
      onChange({ target: { name: 'height', value: "5'7\"" }});
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    // Update display value whenever the actual value changes
    if (value) {
      setDisplayValue(unit === 'cm' ? `${value}cm` : value);
    } else {
      setDisplayValue("5'7\"");
    }
  }, [value, unit]);

  const cmToFeetInches = (cm) => {
    if (!cm) return '';
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    
    // Handle case where rounding inches results in 12
    if (inches === 12) {
      return `${feet + 1}'0"`;
    }
    return `${feet}'${inches}"`;
  };

  const feetInchesToCm = (feetInches) => {
    if (!feetInches) return '';
    const [feet, inches] = feetInches.replace('"', '').split("'").map(num => parseInt(num));
    const totalInches = (feet * 12) + inches;
    return Math.round(totalInches * 2.54);
  };

  const handleUnitChange = (selectedUnit) => {
    if (value) {
      const convertedValue = selectedUnit === 'cm' 
        ? feetInchesToCm(value)
        : cmToFeetInches(value);
      onChange({ target: { name: 'height', value: convertedValue }});
    }
    setUnit(selectedUnit);
  };

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    onChange({ target: { name: 'height', value: selectedValue }});
    setIsOpen(false);
  };

  const getHeightOptions = () => {
    if (unit === 'cm') {
      return Array.from({ length: 181 }, (_, i) => i + 60);
    } else {
      const options = [];
      // Generate heights from 2'0" to 7'11"
      for (let feet = 2; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
          options.push(`${feet}'${inches}"`);
        }
      }
      return options;
    }
  };

  return (
    <Flex direction="column" gap="1rem" width="100%">
      <Flex gap="1rem" justifyContent="center">
        <button
          onClick={() => handleUnitChange('cm')}
          className={`unit-button ${unit === 'cm' ? 'selected' : ''}`}
        >
          Centimeters
        </button>
        <button
          onClick={() => handleUnitChange('ft')}
          className={`unit-button ${unit === 'ft' ? 'selected' : ''}`}
        >
          Feet & Inches
        </button>
      </Flex>

      <div className="height-select-container">
        <button 
          ref={buttonRef}
          className="height-display has-value"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayValue}
        </button>
        
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="height-options-dropdown"
          >
            {getHeightOptions().map((height) => (
              <button
                key={height}
                className={`height-option ${value === height.toString() ? 'selected' : ''}`}
                onClick={() => handleSelect({ target: { value: height.toString() }})}
              >
                {unit === 'cm' ? `${height}cm` : height}
              </button>
            ))}
          </div>
        )}
      </div>
    </Flex>
  );
};

export default HeightSelector;