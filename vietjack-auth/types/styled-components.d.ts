import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    breakpoints: ThemeBreakpoint;
    spacing: ThemeSpacing;
    fontSize: ThemeFontSize;
    fontFamily: ThemeFontFamily;
    getFontSizeByKeys: GetFontSizeByKeys;
    getFontFamilyByKeys: GetFontFamilyByKeys;
  }

  export interface ThemeSpacing {
    headerHeight: number;
  }

  export type ThemeFontSizeKeys = keyof ThemeFontSize;

  export interface ThemeFontSize {
    sm: number;
    sl: number;
    ssl: number;
    md: number;
    xs: number;
    xm: number;
    xl: number;
    xxl: number;
  }

  export type ThemeFontFamilyKeys = keyof ThemeFontFamily;

  export interface ThemeFontFamily {
    InterBlack: string;
    InterBlackItalic: string;
    InterBold: string;
    InterBoldItalic: string;
    InterExtraBold: string;
    InterExtraBoldItalic: string;
    InterExtraLight: string;
    InterExtraLightItalic: string;
    InterItalic: string;
    InterLight: string;
    InterLightItalic: string;
    InterMedium: string;
    InterMediumItalic: string;
    InterRegular: string;
    InterSemiBold: string;
    InterSemiBoldItalic: string;
    InterThin: string;
    InterThinItalic: string;
    InterV: string;
  }

  export interface ThemeBreakpoint {
    sm: number;
  }

  export type ThemeColorsKeys = keyof ThemeColors;

  export interface ThemeColors {
    textColor: string;
    white: string;
    black: string;
    arsenic: string;
    secondary25: string;
    secondary50: string;
    secondary100: string;
    secondary200: string;
    secondary400: string;
    secondary500: string;
    secondary600: string;
    secondary800: string;

    neutral0: string;
    neutral25: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;

    orange25: string;
    orange50: string;
    orange100: string;
    orange200: string;
    orange300: string;
    orange400: string;
    orange500: string;
    orange600: string;
    orange700: string;
    orange800: string;
    orange900: string;
    orangeRyb: string;

    wash: string;
    wash50: string;
    wash100: string;
    gray25: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
    primary25: string;
    primary50: string;
    primary100: string;
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;
    primary900: string;
    primary1100: string;

    error25: string;
    error50: string;
    error100: string;
    error200: string;
    error300: string;
    error400: string;
    error500: string;
    error600: string;
    error700: string;
    error800: string;
    error900: string;
    error950: string;

    warning25: string;
    warning50: string;
    warning100: string;
    warning200: string;
    warning300: string;
    warning400: string;
    warning500: string;
    warning600: string;
    warning700: string;
    warning800: string;
    warning900: string;
    yellow25: string;
    yellow50: string;
    yellow100: string;
    yellow200: string;
    yellow300: string;
    yellow400: string;
    yellow500: string;
    yellow600: string;
    yellow700: string;
    yellow800: string;
    yellow900: string;
    yellowDark50: string;
    yellowDark200: string;
    yellowDark400: string;
    success25: string;
    success50: string;
    success100: string;
    success200: string;
    success300: string;
    success400: string;
    success500: string;
    success600: string;
    success700: string;
    success800: string;
    success900: string;
    blue50: string;
    blue400: string;
    blue500: string;
    blue900: string;
  }

  export type GetFontSizeByKeys = (key: ThemeFontSizeKeys) => number;
  export type GetFontFamilyByKeys = (key: ThemeFontFamilyKeys) => string;
}
