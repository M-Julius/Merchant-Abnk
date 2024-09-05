import React from 'react';
import {View} from 'react-native';
import {
  SafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

export type ToggleableSafeAreaProps = NativeSafeAreaViewProps & {
  active: boolean;
  children?: React.ReactNode;
};

export default function ToggleableSafeArea({
  active,
  children,
  ...props
}: ToggleableSafeAreaProps) {
  if (active) {
    return (
      <SafeAreaView style={{alignSelf: 'stretch'}} {...props}>
        {children}
      </SafeAreaView>
    );
  }
  return (
    <View style={{alignSelf: 'stretch'}} {...props}>
      {children}
    </View>
  );
}
