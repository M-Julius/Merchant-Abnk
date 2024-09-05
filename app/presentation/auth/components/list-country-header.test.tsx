import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ListHeaderCountry from './list-country-header';
import AppColors from '../../../core/theme/app-colors';
import AppStyles from '../../../core/theme/app-styles';

describe('ListHeaderCountry', () => {
  it('renders correctly with all text elements and styles', () => {
    render(<ListHeaderCountry />);

    // Check if the "Popular Countries" text is rendered
    expect(screen.getByText('Popular Countries')).toBeTruthy();

    // Check the styles of the "Popular Countries" text
    const popularCountriesText = screen.getByText('Popular Countries');
    expect(popularCountriesText).toHaveStyle({
      ...AppStyles.textBody14,
      color: AppColors.dark_grey,
    });
  });
});
