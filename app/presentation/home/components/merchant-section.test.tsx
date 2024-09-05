import React from 'react';
import {render} from '@testing-library/react-native';
import MerchantSection from './merchant-section';
import {Merchant} from '../../../core/model/types';
import '@testing-library/jest-native/extend-expect';

describe('MerchantSection', () => {
  const mockMerchants: Merchant[] = [
    {
      slug: 'merchant1',
      name: 'Merchant 1',
      logo: 'https://example.com/logo1.png',
      categories: [],
      description: '',
      website: '',
      highlighted_products: [],
      min_in_store_checkout_order_grand_total: '',
      stores: [],
    },
    {
      slug: 'merchant2',
      name: 'Merchant 2',
      logo: 'https://example.com/logo2.png',
      categories: [],
      description: '',
      website: '',
      highlighted_products: [],
      min_in_store_checkout_order_grand_total: '',
      stores: [],
    },
  ];

  it('renders loading state correctly', () => {
    const {getByTestId, queryByText} = render(
      <MerchantSection merchants={[]} loading={true} />,
    );

    // Check if shimmer placeholders are rendered
    expect(getByTestId('shimmer-title')).toBeTruthy();
    expect(getByTestId('shimmer-all')).toBeTruthy();

    // Check if actual text is not rendered during loading state
    expect(queryByText('Merchant')).toBeNull();
    expect(queryByText('See all')).toBeNull();
  });

  it('renders loaded state correctly', () => {
    const {getByText} = render(
      <MerchantSection merchants={mockMerchants} loading={false} />,
    );

    // Check if actual content is rendered
    expect(getByText('Merchant')).toBeTruthy();
    expect(getByText('See all')).toBeTruthy();

    // Check if merchant items are rendered
    mockMerchants.forEach(merchant => {
      expect(getByText(merchant.name)).toBeTruthy();
    });
  });
});
