import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Flex,
  Text,
  View
} from "@aws-amplify/ui-react";
import MoveOnButton from './MoveOnButton';
import HobbySelector from './HobbySelector';
import CustomDatePicker from './CustomDatePicker';
import HeightSelector from './HeightSelector';
import NextSelectButton from './NextSelectButton';
import OccupationSelector from './OccupationSelector';
import logo from '@/assets/flirtmaster-logo.png'

const UserCreateForm = ({ onSubmit, onSuccess, onError, onValidate, onChange, clearOnSuccess, ...rest }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const totalSteps = 14;

  // Function to get fields for current step
  const getFieldsForStep = (step) => {
    const stepFields = {
      1: ['firstName', 'lastName'],
      2: ['birthDate'],
      3: ['height'],
      4: ['favoritePlaceToTravel', 'whyFavoritePlaceToTravel'],
      5: ['favoriteBook', 'whyFavoriteBook'],
      6: ['favoriteMovie', 'whyFavoriteMovie'],
      7: ['favoriteSeries', 'whyFavoriteSeries'],
      8: ['favoriteFood', 'whyFavoriteFood'],
      9: ['textingSkillRating'],
      10: ['mostPopularDatingPlatform'],
      11: ['occupation'],
      12: ['currentResidence'],
      13: ['hobbies'],
    };
    return stepFields[step] || [];
  };

  // Function to check if current step is complete
  const isCurrentStepComplete = () => {
    const currentStepFields = getFieldsForStep(currentStep);
    
    // Special validation for birthDate step
    if (currentStep === 2) {
      return !!formData.birthDate;
    }

    if (currentStep === 4 || currentStep === 5 || currentStep === 6 || currentStep === 7 || currentStep === 8) {
      const mainField = currentStepFields[0];
      const whyField = currentStepFields[1];
      return formData[mainField] && formData[whyField];
    }

    // Special validation for hobbies step
    if (currentStep === 14) {
      const selectedHobbies = formData.hobbies ? formData.hobbies.split(',').filter(hobby => hobby.trim()) : [];
      return selectedHobbies.length >= 3;
    }

    // Default validation for other steps
    return currentStepFields.every(field => {
      const value = formData[field];
      return value !== undefined && value !== null && value !== '';
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (onChange) {
      const updatedFields = {
        ...formData,
        [name]: value
      };
      onChange(updatedFields);
    }
  };

  const isLastStep = currentStep === totalSteps;

  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">Basic Information</Text>
            <TextField
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              placeholder="First name"
              maxLength={35}
            />
            <TextField
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              placeholder="Last name"
              maxLength={35}
            />
          </div>
        );
      case 2:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">When were you born?</Text>
            <CustomDatePicker
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              minDate={new Date(1900, 0, 1)}
              maxDate={new Date()}
            />
          </div>
        );
      case 3: 
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What's your height?</Text>
            <HeightSelector
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>
        );
      case 4:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your favorite travel destination?</Text>
            <TextField
              name="favoritePlaceToTravel"
              value={formData.favoritePlaceToTravel || ''}
              onChange={handleInputChange}
              placeholder="Your favorite travel destination"
              maxLength={35}
              required
            />
            <textarea
              name="whyFavoritePlaceToTravel"
              value={formData.whyFavoritePlaceToTravel || ''}
              onChange={handleInputChange}
              placeholder="Tell us why you love this place"
              maxLength={100}
              className="amplify-textarea"
              required
            />
          </div>
        );
      case 5:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your favorite book?</Text>
            <TextField
              name="favoriteBook"
              value={formData.favoriteBook || ''}
              onChange={handleInputChange}
              placeholder="Your favorite book"
              maxLength={35}
              required
            />
            <textarea
              name="whyFavoriteBook"
              value={formData.whyFavoriteBook || ''}
              onChange={handleInputChange}
              placeholder="Tell us why you love this book"
              maxLength={100}
              className="amplify-textarea"
              required
            />
          </div>
        );
      case 6:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your favorite movie?</Text>
            <TextField
              name="favoriteMovie"
              value={formData.favoriteMovie || ''}
              onChange={handleInputChange}
              placeholder="Your favorite movie"
              maxLength={35}
              required
            />
            <textarea
              name="whyFavoriteMovie"
              value={formData.whyFavoriteMovie || ''}
              onChange={handleInputChange}
              placeholder="Tell us why you love this movie"
              maxLength={100}
              className="amplify-textarea"
              required
            />
          </div>
        );
      case 7:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your favorite series?</Text>
            <TextField
              name="favoriteSeries"
              value={formData.favoriteSeries || ''}
              onChange={handleInputChange}
              placeholder="Your favorite series"
              maxLength={35}
              required
            />
            <textarea
              name="whyFavoriteSeries"
              value={formData.whyFavoriteSeries || ''}
              onChange={handleInputChange}
              placeholder="Tell us why you love this series"
              maxLength={100}
              className="amplify-textarea"
              required
            />
          </div>
        );
      case 8:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your favorite food?</Text>
            <TextField
              name="favoriteFood"
              value={formData.favoriteFood || ''}
              onChange={handleInputChange}
              placeholder="Your favorite food"
              maxLength={35}
              required
            />
            <textarea
              name="whyFavoriteFood"
              value={formData.whyFavoriteFood || ''}
              onChange={handleInputChange}
              placeholder="Tell us why you love this food"
              maxLength={100}
              className="amplify-textarea"
              required
            />
          </div>
        );
      case 9:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">How would you rate your texting skills with women from 1 to 4?</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'textingSkillRating', value: '1' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                4-I'm damn good in that!
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'textingSkillRating', value: '2' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                3-I'm ok but need some tips.
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'textingSkillRating', value: '3' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                2-I'm pretty bad in that.
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'textingSkillRating', value: '4' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                1-Please... Help!
              </NextSelectButton>
            </div>
          </div>
        );
      case 10:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What dating app/platform<br></br> do you use the most for dating?</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'mostPopularDatingPlatform', value: 'Tinder' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                Tinder
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'mostPopularDatingPlatform', value: 'Bumble' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                Bumble
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'mostPopularDatingPlatform', value: 'OkCupid' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                OkCupid
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'mostPopularDatingPlatform', value: 'Hinge' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                Hinge
              </NextSelectButton>
              <NextSelectButton
                onClick={() => {
                  handleInputChange({
                    target: { name: 'mostPopularDatingPlatform', value: 'Other' }
                  });
                  setCurrentStep(prev => prev + 1);
                }}
              >
                Other
              </NextSelectButton>
            </div>
          </div>
        );
      case 11:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">What is your occupation? <br></br> (in case she will ask)</Text>
            <OccupationSelector
              selectedOccupation={formData.occupation ? formData.occupation : ''}
              onChange={(selectedOccupation) => {
                handleInputChange({
                  target: {
                    name: 'occupation',
                    value: selectedOccupation
                  }
                });
              }}
            >
            </OccupationSelector>
          </div>
        );
      case 12:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">Where do you currently live?</Text>
            <TextField
              name="currentResidence"
              value={formData.currentResidence || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      case 13:
        return (
          <div class="form-inputs-wrapper">
            <Text class="wizard-title" fontSize="1.5rem" fontWeight="bold">Select 3 to 5 hobbies</Text>
            <HobbySelector
              selectedHobbies={formData.hobbies ? formData.hobbies.split(',') : []}
              onChange={(selectedHobbies) => {
                handleInputChange({
                  target: {
                    name: 'hobbies',
                    value: selectedHobbies.join(',')
                  }
                });
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSubmit) {
      try {
        const validatedFields = await onSubmit(formData);
        if (onSuccess) {
          onSuccess(validatedFields);
          if (clearOnSuccess) {
            setFormData({});
          }
        }
      } catch (error) {
        if (onError) {
          onError(formData, error.message);
        }
      }
    }
  };

  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '60vh', // Ensures minimum height for proper spacing
        justifyContent: 'space-between' // Pushes content apart
      }}
    >
      {/* Header with FlirtMaster title and progress bar */}
      <Flex 
        direction="column" 
        gap="15px"
        padding="20px"
        position="fixed"    
        top="40px"          
        left="50%"          
        transform="translateX(-50%)" 
        width="100%"        
        maxWidth="600px"     
        zIndex="1"
      >
        {/* Back Button and Title Container */}
        <div className="wizard-nav-container">
          {/* Back Button - with circular background on click */}
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="wizard-back-button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Title Content */}
          <div className="wizard-title-container">
            <img
              src={logo}
              alt="FlirtMaster Logo"
              className="wizard-logo"
            />
            <Text
              id='shared-onboarding-title'
            >
              2 minutes info for FlirtMaster about you, <br></br> to improve your texting with women
            </Text>
          </div>
        </div>

        {/* Progress Bar */}
        <View
          backgroundColor="rgba(255, 255, 255, 0.2)"
          borderRadius="full"
          padding="2px"
        >
          <View
            backgroundColor="#62fdd5"
            width={`${progress}%`}
            height="4px"
            borderRadius="full"
            transition="width 0.3s ease-in-out"
          />
        </View>
      </Flex>

      {/* Form Content */}
      <Flex 
        direction="column" 
        gap="15px"
        marginTop="60px"
        padding="20px"
        width="100%"
        maxWidth="600px"
        margin="60px auto 0"
        alignSelf="center"
      >
        <View 
          style={{ 
            minHeight: '300px',
            width: '100%'
          }}
        >
          {renderStep()}
        </View>

        <Flex 
          justifyContent="space-between"
          width="100%"
          margin-top="0px"
        >
          {isLastStep ? (
            <Button
              type="submit"
              variation="primary"
              isDisabled={!isCurrentStepComplete()}
              width="100%"
            >
              Submit
            </Button>
          ) : (
            currentStep !== 9 && currentStep !== 10 && (
              <MoveOnButton
                className="move-on-button"
                id="next-button-create-form"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isCurrentStepComplete()}
              >
                Let's move on
              </MoveOnButton>
            )
          )}
        </Flex>
      </Flex>
    </Grid>
  );
};

export default UserCreateForm;