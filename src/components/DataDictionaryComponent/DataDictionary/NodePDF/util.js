import { Font } from '@react-pdf/renderer';
import NunitoExtraBold from './assets/fonts/Nunito-ExtraBold.ttf';
import NunitoBold from './assets/fonts/Nunito-Bold.ttf';
import NunitoExtraLightItalic from './assets/fonts/Nunito-ExtraLightItalic.ttf';
import NunitoNormal from './assets/fonts/Nunito-Medium.ttf';

export const getFont = (path) => {
  switch (path) {
    case 'NunitoExtraBold':
      return NunitoExtraBold;
    case 'NunitoBold':
      return NunitoBold;
    case 'NunitoExtraLightItalic':
      return NunitoExtraLightItalic;
    case 'NunitoNormal':
      return NunitoNormal;
    default:
      return NunitoNormal;
  }
};

export const FontRegistry = (font) => {
  const fontConfig = { src: getFont(font), family: font };
  Font.register(fontConfig);
  return font;
};

export const formatEnumValues = (enums) => {
  if (Array.isArray(enums)) {
    let concatEnums = '';
    enums.forEach((value) => {
      concatEnums += "'{}'; ".replace('{}', value);
    });
    return concatEnums;
  }
  return JSON.stringify(enums);
};