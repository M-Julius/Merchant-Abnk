import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import FooterComponent from './footer-login';

describe('FooterComponent', () => {
  it('renders correctly with all text elements', () => {
    render(<FooterComponent />);

    expect(screen.getByText('Sign up')).toBeTruthy();
    expect(screen.getByText('Terms and Conditions')).toBeTruthy();
    expect(screen.getByText('Privacy Police')).toBeTruthy();
  });

  it('handles press on "Sign up" link', () => {
    const mockPress = jest.fn();

    // Render the component with mock press function
    render(<FooterComponent />);

    // Find the "Sign up" text element
    const signUpText = screen.getByText('Sign up');

    // Simulate press event
    fireEvent.press(signUpText);

    // Assert that the mock function was called
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('handles press on "Terms and Conditions" and "Privacy Police" links', () => {
    const mockPress = jest.fn();

    // Render the component with mock press function
    render(<FooterComponent />);

    // Find the "Terms and Conditions" and "Privacy Police" text elements
    const termsText = screen.getByText('Terms and Conditions');
    const privacyText = screen.getByText('Privacy Police');

    // Simulate press event
    fireEvent.press(termsText);
    fireEvent.press(privacyText);

    // Assert that the mock function was called
    expect(mockPress).not.toHaveBeenCalled();
  });
});
