import { View } from '@aws-amplify/ui-react';
import { StatusIndicator } from './StatusIndicator';

export const CreditPointsIndicators = () => {
  return (
    <View
      display="flex"
      flexDirection="column"
      gap="8px"
      position="absolute"
      top="20px"
      right="20px"
    >
      <StatusIndicator 
        icon="$"
        value="125"
        label="CREDITS"
      />
      <StatusIndicator 
        icon="+"
        value="120"
        label="PTS"
      />
    </View>
  );
};