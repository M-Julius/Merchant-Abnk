import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AppButton, AppButtonThemes} from './app-button';
import AppColors from '../theme/app-colors';

describe('AppButton Component', () => {
  it('should render correctly with default props', () => {
    const {getByText} = render(<AppButton>Click Me</AppButton>);
    const buttonText = getByText('Click Me');
    expect(buttonText).toBeTruthy();
  });

  it('should apply correct styles based on theme', () => {
    const {getByTestId} = render(
      <AppButton btnStyle={AppButtonThemes.danger}>Danger</AppButton>,
    );
    const button = getByTestId('app-button');
    expect(button).toHaveStyle({backgroundColor: AppColors.red});
  });

  it('should call onClick when pressed', () => {
    const onClick = jest.fn();
    const {getByText} = render(
      <AppButton onClick={onClick}>Click Me</AppButton>,
    );
    fireEvent.press(getByText('Click Me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    const {getByText} = render(
      <AppButton onClick={onClick} enabled={false}>
        Disabled
      </AppButton>,
    );
    fireEvent.press(getByText('Disabled'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should apply additional styles passed via props', () => {
    const {getByTestId} = render(
      <AppButton style={{backgroundColor: 'blue'}} textStyle={{color: 'white'}}>
        Styled Button
      </AppButton>,
    );
    const button = getByTestId('app-button');
    expect(button).toHaveStyle({backgroundColor: 'blue'});
    const buttonText = getByTestId('app-button').children[0];
    expect(buttonText).toHaveStyle({color: 'white'});
  });
});
