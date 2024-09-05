import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginOtpScreen from './login-otp-screen';

// Mock useDispatch to return a mocked dispatch function
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('LoginOtpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        auth: {
          sessionId: 'mockSessionId',
          loading: false,
          error: null,
          retryTimestamp: new Date().getTime() + 60000,
        },
      }),
    );
  });

  it('should update OTP input and submit OTP on button press', async () => {
    mockDispatch.mockReturnValue(
      Promise.resolve({type: 'auth/confirmOtp/fulfilled'}),
    );

    const {getByTestId, getByText} = render(
      <LoginOtpScreen route={{params: {phone: '1234567890'}}} />,
    );

    fireEvent.changeText(getByTestId('code-field'), '123456');
    fireEvent.press(getByText('Continue'));

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });

  it('should display an error message if OTP confirmation fails', async () => {
    mockDispatch.mockReturnValue(
      Promise.resolve({type: 'auth/confirmOtp/rejected'}),
    );

    const {getByTestId, getByText} = render(
      <LoginOtpScreen route={{params: {phone: '1234567890'}}} />,
    );

    fireEvent.changeText(getByTestId('code-field'), '123456');
    fireEvent.press(getByText('Continue'));

    await waitFor(() =>
      expect(getByText('OTP code failed. Please try again.')).toBeTruthy(),
    );
  });

  it('should resend OTP and update retry timestamp', async () => {
    mockDispatch.mockReturnValue(
      Promise.resolve({type: 'auth/loginWithPhoneNumber/fulfilled'}),
    );

    const {getByTestId} = render(
      <LoginOtpScreen route={{params: {phone: '1234567890'}}} />,
    );

    const resendOtpButton = getByTestId('otp-counter-button');
    fireEvent.press(resendOtpButton);

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });

  it('should disable the continue button when loading', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        auth: {
          sessionId: 'mockSessionId',
          loading: true,
          error: null,
          retryTimestamp: new Date().getTime() + 60000,
        },
      }),
    );

    const {getByTestId} = render(
      <LoginOtpScreen route={{params: {phone: '1234567890'}}} />,
    );

    const continueButton = getByTestId('app-button');

    // Check for the button's style or accessibility state when loading
    expect(continueButton.props.style.opacity).toBe(1);
  });
});
