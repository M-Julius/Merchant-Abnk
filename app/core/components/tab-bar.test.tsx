import React from 'react';
import {render} from '@testing-library/react-native';
import TabBar from '../components/tab-bar';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  BottomTabDescriptor,
  BottomTabDescriptorMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

// Mock Feather component
jest.mock('react-native-vector-icons/Feather', () => {
  return {
    __esModule: true,
    default: jest.fn(() => null),
  };
});

// Mock NavigationHelpers
const mockNavigation = {
  emit: jest.fn(),
  navigate: jest.fn(),
} as unknown as NavigationHelpers<ParamListBase, any>;

// Mock TabNavigationState
const mockState = {
  index: 0,
  routeNames: ['Home', 'History', 'Inbox', 'Profile'],
  routes: [
    {key: 'home', name: 'Home'},
    {key: 'history', name: 'History'},
    {key: 'inbox', name: 'Inbox'},
    {key: 'profile', name: 'Profile'},
  ],
  key: 'tab',
  stale: false,
  type: 'tab',
} as unknown as TabNavigationState<ParamListBase>;

// Mock BottomTabDescriptorMap
const mockDescriptors: BottomTabDescriptorMap = {
  home: {
    route: {key: 'home', name: 'Home'},
    navigation: mockNavigation,
    render: () => null,
    options: {
      tabBarLabel: 'Home',
      tabBarIcon: jest.fn(() => null),
      tabBarTestID: 'home-screen',
    },
  } as unknown as BottomTabDescriptor,
  history: {
    route: {key: 'history', name: 'History'},
    navigation: mockNavigation,
    render: () => null,
    options: {
      tabBarLabel: 'History',
      tabBarIcon: jest.fn(() => null),
      tabBarTestID: 'history-screen',
    },
  } as unknown as BottomTabDescriptor,
  inbox: {
    route: {key: 'inbox', name: 'Inbox'},
    navigation: mockNavigation,
    render: () => null,
    options: {
      tabBarLabel: 'Inbox',
      tabBarIcon: jest.fn(() => null),
      tabBarTestID: 'inbox-screen',
    },
  } as unknown as BottomTabDescriptor,
  profile: {
    route: {key: 'profile', name: 'Profile'},
    navigation: mockNavigation,
    render: () => null,
    options: {
      tabBarLabel: 'Profile',
      tabBarIcon: jest.fn(() => null),
      tabBarTestID: 'profile-screen',
    },
  } as unknown as BottomTabDescriptor,
};

describe('TabBar', () => {
  it('renders the correct number of tabs', () => {
    const {getByTestId} = render(
      <TabBar
        state={mockState}
        descriptors={mockDescriptors}
        navigation={mockNavigation}
      />,
    );

    // Check if the tabs are rendered with their respective testID
    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByTestId('history-screen')).toBeTruthy();
    expect(getByTestId('inbox-screen')).toBeTruthy();
    expect(getByTestId('profile-screen')).toBeTruthy();
  });

  it('renders the correct icons for each tab', () => {
    const {} = render(
      <TabBar
        state={mockState}
        descriptors={mockDescriptors}
        navigation={mockNavigation}
      />,
    );

    // Check if icons are rendered (you might need to adapt this based on how icons are rendered)
    expect(mockDescriptors.home.options.tabBarIcon).toHaveBeenCalled();
    expect(mockDescriptors.history.options.tabBarIcon).toHaveBeenCalled();
    expect(mockDescriptors.inbox.options.tabBarIcon).toHaveBeenCalled();
    expect(mockDescriptors.profile.options.tabBarIcon).toHaveBeenCalled();
  });
});
