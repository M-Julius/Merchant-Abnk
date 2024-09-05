import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import RootNavigation from './root-navigation';
import {act} from 'react-test-renderer';

// Mock dependencies
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: ({children}: any) => children,
    Screen: ({component}: any) => component(),
  })),
}));
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: ({children}: any) => children,
    Screen: ({component}: any) => component(),
  })),
}));
jest.mock('../../presentation/intro/screens/splash-screen', () => {
  const {Text} = require('react-native');
  return jest.fn(() => <Text>Splash Screen</Text>);
});
jest.mock('../../presentation/auth/screens/login-screen', () => {
  const {Text} = require('react-native');
  return jest.fn(() => <Text>Login Screen</Text>);
});
jest.mock('../../presentation/auth/screens/login-otp-screen', () => {
  const {Text} = require('react-native');
  return jest.fn(() => <Text>Login OTP Screen</Text>);
});

// Mock Feather icon if needed
jest.mock('react-native-vector-icons/Feather', () => {
  const {Text} = require('react-native');
  return ({name}: {name: string}) => <Text>{name}</Text>;
});

// Mock data for merchants
jest.mock('../../presentation/home/components/merchant-item.tsx', () => {
  const {Text} = require('react-native');
  return jest.fn(() => (
    <Text>Merchant Item</Text>
  ));
});

describe('RootNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should render SplashScreen initially', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({token: null});

    const {getByText} = render(<RootNavigation />);

    expect(getByText('Splash Screen')).toBeTruthy();
  });

  it('should render login screens when no token is present after splash', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({token: null});

    const {queryByText} = render(<RootNavigation />);

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      await waitFor(() => {
        expect(queryByText('Splash Screen')).toBeNull();
        expect(queryByText('Login Screen')).not.toBeNull();
      });
    });
  });

  test('should render HomeScreen when token is present after splash', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: 'dummy-token',
      merchants: [],
    });

    const {queryByText, getAllByTestId} = render(<RootNavigation />);

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      await waitFor(() => {
        expect(queryByText('Splash Screen')).toBeNull();
        expect(getAllByTestId('home-screen')).not.toBeNull();
      });
    });
  });

  test('should render BottomTabBar with token', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: 'dummy-token',
      merchants: [],
    });

    const {getAllByTestId} = render(<RootNavigation />);

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      await waitFor(() => {
        expect(getAllByTestId('home-screen')).toBeTruthy();
      });
    });
  });

  test('should render correct icons in BottomTabBar', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: 'dummy-token',
      merchants: [],
    });

    const {getAllByTestId} = render(<RootNavigation />);

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      await waitFor(() => {
        expect(getAllByTestId('home-screen')).toBeTruthy();
        expect(getAllByTestId('profile-header')).toBeTruthy();
      });
    });
  });
});
