import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import ShimmerPlaceHolder from './shimmer-placeholder';

describe('ShimmerPlaceHolder', () => {
  it('renders correctly with default props', async () => {
    render(<ShimmerPlaceHolder testID="shimmer-placeholder" />);
    await waitFor(() => {
      expect(screen.queryByTestId('shimmer-placeholder')).toBeTruthy();
    });
  });

  it('applies the testID prop correctly', async () => {
    render(<ShimmerPlaceHolder testID="shimmer-placeholder" />);
    expect(screen.getByTestId('shimmer-placeholder')).toBeTruthy();
  });
});
