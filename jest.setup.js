/* eslint-disable no-undef */
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({ children }) => children,
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    PanGestureHandler: jest.fn(),
    BaseButton: jest.fn(),
    RectButton: jest.fn(),
    BorderlessButton: jest.fn(),
    FlatList: jest.requireActual('react-native').FlatList,
    ScrollView: jest.requireActual('react-native').ScrollView,
    TouchableHighlight: jest.requireActual('react-native').TouchableHighlight,
    TouchableNativeFeedback: jest.requireActual('react-native').TouchableNativeFeedback,
    TouchableWithoutFeedback: jest.requireActual('react-native').TouchableWithoutFeedback,
    TouchableOpacity: jest.fn(({ children }) => children),

  };
});


jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn(({ children }) => children),
      Screen: jest.fn(() => null),
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn().mockImplementation(() => ({
      Navigator: jest.fn(({ children }) => children),
      Screen: jest.fn(() => null),
    })),
  };
});

jest.mock('react-native-vector-icons/Feather', () => 'Feather');

jest.mock('react-native-shimmer-placeholder', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Shimmer = (props) => <View {...props} />;
  return {
    createShimmerPlaceholder: () => Shimmer,
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});


jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn(({ children }) => children),
      Screen: jest.fn(() => null),
    }),
  };
});


jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist');
  return {
    ...actualReduxPersist,
    persistStore: jest.fn(() => ({
      purge: jest.fn(),
      flush: jest.fn(),
      pause: jest.fn(),
      persist: jest.fn(),
    })),
  };
});

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

const Reanimated = jest.requireActual('react-native-reanimated');

module.exports = {
  ...Reanimated,
  useSharedValue: jest.fn().mockReturnValue({ value: 0 }),
  useAnimatedStyle: jest.fn().mockReturnValue({ transform: [] }),
  withTiming: jest.fn().mockImplementation((value, config, callback) => {
    if (callback) {callback();}
    return value;
  }),
  withSpring: jest.fn().mockImplementation((value, config, callback) => {
    if (callback) {callback();}
    return value;
  }),
  Easing: {
    out: jest.fn(),
    exp: jest.fn(),
  },
};
