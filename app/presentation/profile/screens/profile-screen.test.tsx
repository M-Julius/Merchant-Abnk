import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../../../core/store/redux/authSlice';
import ProfileScreen from './profile-screen';

// Mock store setup
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

describe('ProfileScreen', () => {
  it('should render ProfileHeader and ProfileInfo', () => {
    render(
      <Provider store={store}>
        <ProfileScreen />
      </Provider>
    );

    // Check if ProfileHeader and ProfileInfo are rendered
    expect(screen.getByTestId('profile-header')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Profile Setting')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Change Password')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Chat Support')).toBeTruthy();
  });

  it('should call handleLogout on button press', () => {
    const dispatch = jest.fn();
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <ProfileScreen />
      </Provider>
    );

    // Find and press the logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.press(logoutButton);

    // Check if dispatch was called with logout action
    expect(dispatch).toHaveBeenCalledWith(expect.anything());
  });
});
