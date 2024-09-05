import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import InputForm from './input-form';
import AppText from './app-text';

describe('InputForm Component', () => {
  test('renders with prefix and suffix components', () => {
    const Prefix = () => <AppText>Prefix</AppText>;
    const Suffix = () => <AppText>Suffix</AppText>;

    const {getByText} = render(
      <InputForm
        error={false}
        style={{}}
        placeholder="Enter text"
        value=""
        prefix={Prefix}
        suffix={Suffix}
        onChangeText={() => {}}
      />,
    );

    expect(getByText('Prefix')).toBeTruthy();
    expect(getByText('Suffix')).toBeTruthy();
  });

  test('displays error message when error prop is true', () => {
    const {getByText} = render(
      <InputForm
        style={{}}
        placeholder="Enter text"
        value=""
        error={true}
        errorString="This field is required"
        onChangeText={() => {}}
      />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  test('calls onPress when readonly is true and component is pressed', () => {
    const Prefix = () => <AppText>Prefix</AppText>;

    const onPress = jest.fn();
    const {getByText} = render(
      <InputForm
        error={false}
        style={{}}
        placeholder="Enter text"
        value=""
        prefix={Prefix}
        readonly={true}
        onPress={onPress}
        onChangeText={() => {}}
      />,
    );

    fireEvent.press(getByText('Prefix'));
    expect(onPress).toHaveBeenCalled();
  });
});
