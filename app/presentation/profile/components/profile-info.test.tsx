import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProfileInfo from './profile-info';

describe('ProfileInfo', () => {
  it('should render profile info with setting items', () => {
    render(<ProfileInfo />);

    expect(screen.getByTestId('account-setting')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Profile Setting')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Change Password')).toBeTruthy();
    expect(screen.getByTestId('setting-item-Chat Support')).toBeTruthy();
  });
});
