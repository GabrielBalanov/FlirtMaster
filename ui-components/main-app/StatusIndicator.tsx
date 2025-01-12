import { View, Text } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

export const StatusIndicator = ({ icon, value, label }) => {
  return (
    <View
      backgroundColor="rgba(0, 0, 0, 0.4)"
      padding="6px 12px"
      borderRadius="20px"
      display="flex"
      alignItems="center"
      gap="8px"
      style={{
        backdropFilter: 'blur(5px)',
        maxWidth: '150px'
      }}
    >
      <Text
        color="white"
        fontSize="1rem"
        fontWeight="500"
      >
        {icon}
      </Text>
      <Text
        color="white"
        fontSize="0.9rem"
        fontWeight="500"
      >
        {label} : {value}
      </Text>
    </View>
  );
};

StatusIndicator.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired
};