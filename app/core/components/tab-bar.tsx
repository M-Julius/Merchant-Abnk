import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from './app-text';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import AppColors from '../theme/app-colors';

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        // Handle tab press
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Handle long press on the tab
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? AppColors.orchid : AppColors.medium_grey, size: 24 })}
            <AppText
              style={[
                styles.label,
                { color: isFocused ? AppColors.orchid : AppColors.medium_grey },
              ]}
            >
              {label as string}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    elevation: 3,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    marginTop: 5,
  },
});

export default TabBar;
