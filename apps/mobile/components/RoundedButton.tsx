import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import { XStack, Stack } from 'tamagui';

interface PropsType {
  title: string;
  width?: number | string;
  children?: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const RoundedButton: React.FC<PropsType> = ({
  title,
  children,
  customStyle,
  onPress,
  width = 330,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[customStyle, styles.actionButton, { width }]}
        onPress={onPress}
      >
        <XStack f={1} jc="center" ai="center">
          <Stack>{children}</Stack>
          <Text style={styles.buttonText}>{title}</Text>
        </XStack>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  actionButton: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});

export default RoundedButton;
