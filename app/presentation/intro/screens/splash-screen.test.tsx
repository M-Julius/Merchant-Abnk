import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SplashScreen from './splash-screen';

describe('SplashScreen', () => {
  test('should render SplashScreen correctly', () => {
    render(<SplashScreen />);
    const splashScreen = screen.getByTestId('splash-screen');
    expect(splashScreen).toBeTruthy();
  });

  test('should animate text correctly', () => {
    render(<SplashScreen />);
    const text = screen.getByTestId('text-intro');
    expect(text).toBeTruthy();
  });
});
