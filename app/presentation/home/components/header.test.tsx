import React from 'react';
import {render} from '@testing-library/react-native';
import Header from './header';

describe('Header', () => {
  it('renders shimmer placeholders correctly when loading is true', () => {
    const {getByTestId} = render(<Header keyword="" setKeyword={() => {}} loading={true} />);

    expect(getByTestId('shimmer-profile')).toBeTruthy();
    expect(getByTestId('shimmer-input-form')).toBeTruthy();
    expect(getByTestId('shimmer-bell-icon')).toBeTruthy();
  });

  it('renders actual content correctly when loading is false', () => {
    const {getByPlaceholderText} = render(
      <Header keyword="test" setKeyword={() => {}} loading={false} />,
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });
});
