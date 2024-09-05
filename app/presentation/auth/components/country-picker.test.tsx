import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CountryPickerComponent from './country-picker';

// Mock the CountryPicker component since it is a third-party component
jest.mock('react-native-country-codes-picker', () => ({
  CountryPicker: jest
    .fn()
    .mockImplementation(({ListHeaderComponent, ...props}) => (
      <ListHeaderComponent {...props} />
    )),
}));

describe('CountryPickerComponent', () => {
  const mockSetShowCountry = jest.fn();
  const mockSetCountryCode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ListHeaderCountry component', () => {
    render(
      <CountryPickerComponent
        showCountry={true}
        setShowCountry={mockSetShowCountry}
        setCountryCode={mockSetCountryCode}
      />,
    );

    // Check if ListHeaderCountry is rendered
    expect(screen.getByText('Popular Countries')).toBeTruthy();
  });

  it('applies correct styles', () => {
    render(
      <CountryPickerComponent
        showCountry={true}
        setShowCountry={mockSetShowCountry}
        setCountryCode={mockSetCountryCode}
      />,
    );

    const header = screen.getByText('Popular Countries');
    expect(header).toHaveStyle({
      color: '#5A5C61',
    });
  });
});
