import React from 'react';
import { Flex } from "@aws-amplify/ui-react";

const COMMON_HOBBIES = [
  "Art & Painting", "Astronomy", "Baking", "Basketball", "Beach",
  "Board Games", "Bowling", "Boxing", "Camping", "Coffee",
  "Cooking", "Cycling", "Dancing", "DIY & Crafts", "Fashion",
  "Fishing", "Football", "Gaming", "Gardening", "Golf",
  "Guitar", "Gym & Fitness", "Hiking", "Home Decoration", "Karaoke",
  "Language Learning", "Meditation", "Movies & Netflix", "Museum Visits", "Music",
  "Photography", "Piano", "Podcasts", "Poetry", "Reading",
  "Rock Climbing", "Running", "Sailing", "Shopping", "Singing",
  "Skateboarding", "Skiing", "Soccer", "Surfing", "Swimming",
  "Tennis", "Theater", "Traveling", "Volunteering", "Wine Tasting",
  "Yoga"
];

const HobbySelector = ({ selectedHobbies, onChange }) => {
  const handleHobbySelection = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      onChange(selectedHobbies.filter(h => h !== hobby));
    } else if (selectedHobbies.length < 5) {
      onChange([...selectedHobbies, hobby]);
    }
  };

  return (
    <Flex 
      direction="column"
      style={{
        height: '35vh', // Reduced from 40vh
        maxHeight: '250px', // Reduced from 300px
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>
        {`
          .hobby-scroll-container::-webkit-scrollbar {
            width: 24px;
            background-color: #1a1e29;
            border-radius: 12px;
          }
          .hobby-scroll-container::-webkit-scrollbar-track {
            background: #1a1e29;
            border-radius: 12px;
            margin: 4px 0;
          }
          .hobby-scroll-container::-webkit-scrollbar-thumb {
            background: #02c18d;
            border-radius: 12px;
            border: 4px solid #1a1e29;
            min-height: 40px;
          }
          .hobby-scroll-container {
            scrollbar-width: auto;
            scrollbar-color: #02c18d #1a1e29;
          }
          .hobby-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #00a077;
          }
        `}
      </style>
      <Flex 
        wrap="wrap" 
        gap="10px" 
        justifyContent="center"
        className="hobby-scroll-container"
        style={{
          padding: '0 10px',
          overflowY: 'auto',
          height: '100%'
        }}
      >
        {COMMON_HOBBIES.map((hobby) => {
          const isSelected = selectedHobbies.includes(hobby);
          const isDisabled = !isSelected && selectedHobbies.length >= 5;
          
          return (
            <button
              key={hobby}
              onClick={() => handleHobbySelection(hobby)}
              disabled={isDisabled}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                backgroundColor: isSelected ? '#02c18d' : 'transparent',
                borderColor: isSelected ? '#02c18d' : '#5c80d8',
                color: isSelected ? '#0e274d' : 'white',
                opacity: isDisabled ? 0.5 : 1,
                transition: 'all 0.2s ease',
                margin: '4px',
                fontSize: '0.9rem',
                fontWeight: isSelected ? '600' : '400',
              }}
            >
              {hobby}
            </button>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default HobbySelector;