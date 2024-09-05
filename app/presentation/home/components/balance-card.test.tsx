import React from 'react';
import {render} from '@testing-library/react-native';
import BalanceCard from './balance-card';

describe('BalanceCard', () => {
  it('renders ShimmerCard when loading is true', () => {
    const {getByTestId} = render(<BalanceCard loading={true} />);

    expect(getByTestId('shimmer-title')).toBeTruthy();
    expect(getByTestId('shimmer-card')).toBeTruthy();
  });

  it('renders actual content when loading is false', () => {
    const {getByText} = render(<BalanceCard loading={false} />);

    expect(getByText('Account')).toBeTruthy();
    expect(getByText('Current Balance')).toBeTruthy();
    expect(getByText('$12.000')).toBeTruthy();
    expect(getByText('*******3121')).toBeTruthy();
  });
});
