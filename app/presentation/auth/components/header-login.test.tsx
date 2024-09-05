import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HeaderLogin from './header-login';

describe('HeaderLogin', () => {
  it('renders correctly with all text elements', () => {
    render(<HeaderLogin />);

    // Check if the text elements are rendered
    expect(screen.getByText('Abnk')).toBeTruthy();
    expect(screen.getByText('Sign In')).toBeTruthy();
    expect(screen.getByText('Please sign in to see all merchant')).toBeTruthy();
  });
});
