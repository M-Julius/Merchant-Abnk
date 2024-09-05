import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import LoginScreen from '../../presentation/auth/screens/login-screen';
import LoginOtpScreen from '../../presentation/auth/screens/login-otp-screen';
import SplashScreen from '../../presentation/intro/screens/splash-screen';
import HomeScreen from '../../presentation/home/screens/home-screen';
import ProfileScreen from '../../presentation/profile/screens/profile-screen';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../theme/app-colors';
import TabBar from '../components/tab-bar';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabBar() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Feather
                name="home"
                size={24}
                color={focused ? AppColors.orchid : AppColors.medium_grey}
                testID="home-screen"
              />
            ),
            tabBarTestID: 'home-screen',
          }}
        />
        <Tab.Screen
          name="History"
          component={HomeScreen}
          options={{
            title: 'History',
            headerShown: false,
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Feather
                name="list"
                size={24}
                color={focused ? AppColors.orchid : AppColors.medium_grey}
                testID="history-screen"
              />
            ),
            tabBarTestID: 'history-screen',
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            title: 'Inbox',
            headerShown: false,
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? AppColors.orchid : AppColors.medium_grey}
                testID="inbox-screen"
              />
            ),
            tabBarTestID: 'inbox-screen',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Feather
                name="user"
                size={24}
                color={focused ? AppColors.orchid : AppColors.medium_grey}
                testID="profile-screen"
              />
            ),
            tabBarTestID: 'profile-screen',
          }}
        />
      </Tab.Navigator>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: AppColors.white}} />
    </>
  );
}

function RootNavigation() {
  const [isSplash, setIsSplash] = useState(true);
  const {token} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token ? (
        <Stack.Screen name="HomeScreen" component={BottomTabBar} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginOtpScreen" component={LoginOtpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigation;
