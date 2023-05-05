import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const responsiveFontSize = (size: number) => size / fontScale;
