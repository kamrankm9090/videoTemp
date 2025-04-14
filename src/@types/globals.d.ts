import React, {ReactNode} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TextInputProps, TextStyle, ViewProps, ViewStyle} from 'react-native';
import {User as UserType} from '~/graphql/generated';

declare global {
  type ReactChildren = ReactNode;

  type NavigationProp = NativeStackHeaderProps;

  type EnvType = 'DEV' | 'QA' | 'STG' | 'PRD';

  type StorageKeys =
    | 'isUserLoggedIn'
    | 'id_token'
    | 'userData'
    | 'isOnboardingViewed'
    | 'FCM_TOKEN';

  type User = UserType;

  type AuthDataType = {
    token?: string | null;
    expireDate?: string | null;
    refreshToken?: string | null;
    refreshTokenExpiryTime?: string | null;
  };

  type UserDataStoreType = {
    userData?: User;
    isOnboardingViewed: boolean;
    isUserLoggedIn: boolean;
    token?: string;
    authData?: AuthDataType;
    setUserData: (userData: User) => void;
    setIsOnboardingViewed: (isOnboardingViewed: boolean) => void;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    setToken: (token: string) => void;
    setAuthData: (authData: AuthDataType) => void;
  };
  type AgoraStoreType = {
    appId: string;
    token: string;
    tokenCreatedDate?: number;
    channelName?: string;
    setAppId: (appId: string) => void;
    setToken: (token: string) => void;
    setTokenCreatedDate: (tokenCreatedDate: number) => void;
    setChannelName: (channelName: string) => void;
  };
  export interface ZustandStorageType {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => unknown | Promise<unknown>;
    removeItem: (name: string) => unknown | Promise<unknown>;
  }

  type IndicatorSize = 'small' | 'large';

  type FontFamily = {
    bold: string;
    light: string;
    medium: string;
    regular: string;
    thin: string;
  };

  type FontSize = {
    extraLarge: number;
    xxxxLarge: number;
    tooLarge: number;
    xxxLarge: number;
    xxLarge: number;
    xLarge: number;
    large: number;
    xMedium: number;
    medium: number;
    xNormal: number;
    normal: number;
    small: number;
    tiny: number;
    xTiny: number;
    xxTiny: number;
    xxxTiny: number;
    heading1: number;
    heading2: number;
    heading3: number;
    heading4: number;
    heading5: number;
    heading6: number;
  };

  interface StackProps extends ViewProps {
    borderStyle?: ViewStyle['borderStyle'];
    opacity?: ViewStyle['opacity'];
    flexDirection?: ViewStyle['flexDirection'];
    flexGrow?: ViewStyle['flexGrow'];
    flexWrap?: ViewStyle['flexWrap'];
    flexShrink?: ViewStyle['flexShrink'];
    m?: ViewStyle['margin'];
    mb?: ViewStyle['marginBottom'];
    mt?: ViewStyle['marginTop'];
    mr?: ViewStyle['marginRight'];
    ms?: ViewStyle['marginStart'];
    ml?: ViewStyle['marginLeft'];
    me?: ViewStyle['marginEnd'];
    mx?: ViewStyle['marginHorizontal'];
    my?: ViewStyle['marginVertical'];
    p?: ViewStyle['padding'];
    pb?: ViewStyle['paddingBottom'];
    pt?: ViewStyle['paddingTop'];
    pr?: ViewStyle['paddingRight'];
    pl?: ViewStyle['paddingLeft'];
    ps?: ViewStyle['paddingStart'];
    pe?: ViewStyle['paddingEnd'];
    px?: ViewStyle['paddingHorizontal'];
    py?: ViewStyle['paddingVertical'];
    bg?: ViewStyle['backgroundColor'];
    h?: ViewStyle['height'];
    w?: ViewStyle['width'];
    maxW?: ViewStyle['maxWidth'];
    maxH?: ViewStyle['maxHeight'];
    minW?: ViewStyle['minWidth'];
    minH?: ViewStyle['minHeight'];
    alignItems?: ViewStyle['alignItems'];
    alignSelf?: ViewStyle['alignSelf'];
    justifyContent?: ViewStyle['justifyContent'];
    flex?: ViewStyle['flex'];
    overflow?: ViewStyle['overflow'];
    rounded?: ViewStyle['borderRadius'];
    borderRadius?: ViewStyle['borderRadius'];
    borderBottomEndRadius?: ViewStyle['borderBottomEndRadius'];
    borderBottomStartRadius?: ViewStyle['borderBottomStartRadius'];
    borderTopStartRadius?: ViewStyle['borderTopStartRadius'];
    borderTopEndRadius?: ViewStyle['borderTopEndRadius'];
    borderTopRightRadius?: ViewStyle['borderTopRightRadius'];
    borderTopLeftRadius?: ViewStyle['borderTopLeftRadius'];
    borderBottomLeftRadius?: ViewStyle['borderBottomLeftRadius'];
    borderBottomRightRadius?: ViewStyle['borderBottomRightRadius'];
    borderColor?: ViewStyle['borderColor'];
    borderBottomColor?: ViewStyle['borderBottomColor'];
    borderTopColor?: ViewStyle['borderTopColor'];
    borderRightColor?: ViewStyle['borderRightColor'];
    borderLeftColor?: ViewStyle['borderLeftColor'];
    borderStartColor?: ViewStyle['borderStartColor'];
    borderStartWidth?: ViewStyle['borderStartWidth'];
    borderEndWidth?: ViewStyle['borderEndWidth'];
    borderEndColor?: ViewStyle['borderEndColor'];
    borderWidth?: ViewStyle['borderWidth'];
    borderBottomWidth?: ViewStyle['borderBottomWidth'];
    borderTopWidth?: ViewStyle['borderTopWidth'];
    borderRightWidth?: ViewStyle['borderRightWidth'];
    borderLeftWidth?: ViewStyle['borderLeftWidth'];
    left?: ViewStyle['left'];
    right?: ViewStyle['right'];
    start?: ViewStyle['start'];
    end?: ViewStyle['end'];
    top?: ViewStyle['top'];
    bottom?: ViewStyle['bottom'];
    position?: ViewStyle['position'];
    zIndex?: ViewStyle['zIndex'];
    display?: ViewStyle['display'];
    shadow?: number;
    inverted?: boolean;
    gap?: ViewStyle['gap'];
    rowGap?: ViewStyle['rowGap'];
    style?: ViewProps['style'];
  }

  type HStackProps = {space?: ViewStyle['gap']} & StackProps;

  type VStackProps = {space?: ViewStyle['gap']} & StackProps;

  type FlexProps = StackProps & ViewProps;

  type CenterProps = StackProps & ViewProps;

  type FabProps = {
    onPress?: () => void;
    style?: ViewStyle;
    size?: number;
    backgroundColor?: string;
    shadow?: number;
    bottom?: number;
    left?: number;
    icon?: ReactNode;
  };

  type DividerProps = {
    size?: number;
    style?: ViewStyle | ViewStyle[];
    orientation?: 'vertical' | 'horizontal';
    backgroundColor?: string;
    flex?: ViewStyle['flex'];
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    my?: ViewStyle['marginVertical'];
    mt?: ViewStyle['marginTop'];
    mb?: ViewStyle['marginBottom'];
    mx?: ViewStyle['marginHorizontal'];
  };

  type AppLinkProps = {
    text?: string | null;
    onPress?: () => void;
    link?: string;
    mb?: ViewStyle['marginBottom'];
    mt?: ViewStyle['marginBottom'];
    m?: ViewStyle['margin'];
    p?: ViewStyle['padding'];
    flex?: ViewStyle['flex'];
    color?: string;
    fontSize?: TextStyle['fontSize'];
    fontFamily?: keyof FontFamily;
    underline?: boolean;
    leftIcon?: JSX.Element;
  };

  type AppInputProps = {
    placeholder?: TextInputProps['placeholder'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    spellCheck?: TextInputProps['spellCheck'];
    autoCorrect?: TextInputProps['autoCorrect'];
    multiline?: TextInputProps['multiline'];
    fontSize?: number;
    fontFamily?: keyof FontFamily;
    borderWidth?: ViewStyle['borderWidth'];
    borderColor?: ViewStyle['borderColor'];
    rounded?: ViewStyle['borderRadius'];
    w?: ViewStyle['width'];
    style?: TextInputProps['style'];
    textAlign?: TextStyle['textAlign'];
  } & TextInputProps &
    HStackProps;

  type ModalRefType = {
    open: () => void;
    close: () => void;
  };

  type ModalRef = React.Ref<ModalRefType>;

  type authenticationStoreType = {
    email: string;
    isForResetPassword: boolean;
    verificationCode: string;
    setEmail: (email: string) => void;
    setIsForResetPassword: (isForResetPassword: boolean) => void;
    setVerificationCode: (verificationCode: string) => void;
  };
}
