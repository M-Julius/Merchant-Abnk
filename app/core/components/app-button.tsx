import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import AppColors from '../theme/app-colors';
import AppText from './app-text';
import AppStyles from '../theme/app-styles';

export type AppButtonStyleProps = {
  button?: ViewStyle | TextStyle | ImageStyle;
  text?: ViewStyle | TextStyle | ImageStyle;
  disabledButton?: ViewStyle | TextStyle | ImageStyle;
  disabledText?: ViewStyle | TextStyle | ImageStyle;
};

export const AppButtonThemes = {
  outline: {
    button: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: AppColors.orchid,
    },
    disabledButton: {
      borderColor: AppColors.medium_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  filled: {
    button: {
      backgroundColor: AppColors.white,
    },
    text: {
      textAlign: 'center',
      color: AppColors.black,
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  filled_teal: {
    button: {
      backgroundColor: AppColors.orchid,
    },
    text: {
      textAlign: 'center',
      color: '#FFF',
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
  danger: {
    button: {
      backgroundColor: AppColors.red,
    },
    text: {
      textAlign: 'center',
      color: '#FFF',
    },
    disabledButton: {
      backgroundColor: AppColors.light_grey,
    },
    disabledText: {
      color: AppColors.medium_grey,
    },
  } as AppButtonStyleProps,
};

type AppButtonProps = {
  testID?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  btnStyle?: AppButtonStyleProps;
  onClick?: (event: GestureResponderEvent) => void;
  enabled?: boolean;
  textStyle?: TextStyle;
};

export function AppButton({
  testID = 'app-button',
  children = '',
  style = {},
  btnStyle = AppButtonThemes.filled,
  enabled = true,
  onClick = () => null,
  textStyle = {},
}: AppButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={enabled ? onClick : undefined}
      style={[
        styles.button,
        btnStyle?.button ?? {},
        enabled ? {} : btnStyle?.disabledButton ?? {},
        style,
      ]}
      activeOpacity={enabled ? 0.8 : 1.0}>
      <AppText
        style={[
          AppStyles.textButton16,
          btnStyle?.text ?? {},
          enabled ? {} : btnStyle?.disabledText ?? {},
          textStyle,
        ]}>
        {children}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
