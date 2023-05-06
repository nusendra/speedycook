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
  children?: ReactNode;
  customStyle: StyleProp<ViewStyle>;
}

const RoundedButton: React.FC<PropsType> = ({
  title,
  children,
  customStyle,
}) => {
  return (
    <>
      <TouchableOpacity style={[customStyle, styles.actionButton]}>
        <XStack>
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
    width: 330,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});

export default RoundedButton;
