import React from 'react';
import {render} from '@testing-library/react-native';
import MerchantItem from './merchant-item';
import {Merchant} from '../../../core/model/types';
import AppColors from '../../../core/theme/app-colors';

describe('MerchantItem', () => {
  const mockMerchant: Merchant = {
      slug: 'mock-merchant',
      logo: 'https://example.com/logo.png',
      name: 'Mock Merchant',
      categories: [],
      description: '',
      website: '',
      highlighted_products: [],
      min_in_store_checkout_order_grand_total: '',
      stores: [],
  };

  it('renders merchant logo correctly', () => {
    const {getByTestId} = render(<MerchantItem item={mockMerchant} />);
    const logoImage = getByTestId('image-merchant');
    expect(logoImage).toHaveProp('source', {uri: mockMerchant.logo});
  });

  it('renders merchant name correctly', () => {
    const {getByText} = render(<MerchantItem item={mockMerchant} />);
    expect(getByText(mockMerchant.name)).toBeTruthy();
  });

  it('applies correct styles to merchant name', () => {
    const {getByText} = render(<MerchantItem item={mockMerchant} />);
    const merchantName = getByText(mockMerchant.name);
    expect(merchantName.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({color: AppColors.medium_grey}),
    ]));
  });
});
