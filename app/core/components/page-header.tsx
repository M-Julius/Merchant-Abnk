import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ColorValue, Pressable, View, ViewStyle } from 'react-native';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import AppColors from '../theme/app-colors';
import ToggleableSafeArea from './toggleable-safearea';
import AppStyles from '../theme/app-styles';
import Visible from './visible';
import Entypo from 'react-native-vector-icons/Entypo';

type PageHeaderProps = NativeSafeAreaViewProps & {
  withBack?: boolean;
  withSafeArea?: boolean;
  withBorder?: boolean;
  children?: React.ReactNode;
  background?: ColorValue;
  headerTheme?: 'light' | 'dark';
  backStyle?: ViewStyle;
  onBack?: null | void;
  iconColor?: string;
};

export default function PageHeader({
  withBack = false,
  withSafeArea = false,
  withBorder = false,
  children = null,
  headerTheme = 'light',
  background = undefined,
  style = {},
  backStyle = {},
  onBack = null,
  iconColor = '',
  ...props
}: PageHeaderProps) {
  const navigation = useNavigation();
  const theme = useMemo(
    () => ({
      background: headerTheme === 'light' ? AppColors.white : AppColors.black,
      icon: headerTheme === 'light' ? AppColors.black : AppColors.orchid,
    }),
    [headerTheme],
  );
  return (
    <ToggleableSafeArea
      edges={['top']}
      style={[
        withBorder ? AppStyles.headerBorderBottom : {},
        { backgroundColor: background ?? theme.background },
        style,
      ]}
      active={withSafeArea!}
      testID="toggleable-safearea"
      {...props}
    >
      <View style={AppStyles.appbar} testID="appbar">
        <Visible visible={withBack!}>
          <Pressable
            style={backStyle}
            onPress={onBack || navigation.goBack}
            testID="back-button"
          >
            <Entypo
              name="chevron-left"
              size={24}
              color={iconColor || theme.icon}
            />
          </Pressable>
        </Visible>
        {children}
      </View>
    </ToggleableSafeArea>
  );
}
