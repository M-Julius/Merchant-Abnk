import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SettingItem from './setting-item';
import Entypo from 'react-native-vector-icons/Entypo';

describe('SettingItem', () => {
  it('should render setting item with icon and text', () => {
    const icon = <Entypo name="user" size={24} color="blue" />;
    const text = 'Profile Setting';

    render(<SettingItem icon={icon} text={text} />);

    expect(screen.getByTestId(`setting-item-${text}`)).toBeTruthy();
    expect(screen.getByText(text)).toBeTruthy();
  });
});
