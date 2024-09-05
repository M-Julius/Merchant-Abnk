import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProfileHeader from './profile-header';

describe('ProfileHeader', () => {
  it('should render profile header with profile image and user info', () => {
    render(<ProfileHeader />);

    expect(screen.getByTestId('profile-header')).toBeTruthy();
    expect(screen.getByTestId('profile-image')).toBeTruthy();
    expect(screen.getByText('M. Julius Saputra')).toBeTruthy();
    expect(screen.getByText('+65-81231231')).toBeTruthy();
  });
});
