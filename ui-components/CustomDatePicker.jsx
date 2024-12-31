import React from "react";
import DatePicker from "react-datepicker";
import { Flex, Text } from "@aws-amplify/ui-react";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/CustomDatePicker.css";

const CustomDatePicker = ({
  label,
  name,
  value,
  onChange,
  minDate,
  maxDate,
  hasError,
  errorMessage,
  ...props
}) => {
  return (
    <Flex direction="column" gap="0.5rem">
      {label && (
        <Text
          as="label"
          fontSize="0.875rem"
          fontWeight="500"
          color="white"
        >
          {label}
        </Text>
      )}
      <div className="amplify-datepicker-wrapper">
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => onChange({ target: { name, value: date }})}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="MM/dd/yyyy"
          className={`amplify-field-group__control amplify-input ${
            hasError ? "amplify-field--error" : ""
          } ${value ? 'has-value' : ''}`}
          placeholderText="MM/DD/YYYY"
          onKeyDown={(e) => e.preventDefault()}
          {...props}
        />
      </div>
      {hasError && errorMessage && (
        <Text
          as="span"
          fontSize="0.75rem"
          color="#ff4d4d"
        >
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

export default CustomDatePicker;