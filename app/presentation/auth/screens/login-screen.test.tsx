import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react-native';
import {useDispatch} from 'react-redux';
import LoginScreen from './login-screen';
import {loginWithPhoneNumber} from '../../../core/store/redux/authSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../core/store/redux/authSlice', () => ({
  loginWithPhoneNumber: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the login screen correctly', () => {
    const {getByTestId} = render(<LoginScreen />);
    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('should update phone input and submit form', async () => {
    const mockPhone = '1234567890';
    const mockAction = {
      type: 'auth/loginWithPhoneNumber/fulfilled',
    };

    // Mock the dispatch function to return the fulfilled action
    (loginWithPhoneNumber as unknown as jest.Mock).mockReturnValue(mockAction);
    mockDispatch.mockResolvedValue(mockAction);

    // Render the component
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);

    // Update the phone input
    fireEvent.changeText(
      getByPlaceholderText('insert phone number'),
      mockPhone,
    );

    // Submit the form
    fireEvent.press(getByText('Sign in'));

    // Ensure the dispatch function is called with the correct parameters
    await act(async () => {
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          loginWithPhoneNumber({
            countryDiallingCode: '65',
            mobileNumber: mockPhone,
          }),
        );
      });
    });
  });

  it('should display an error message if login fails', async () => {
    const mockPhone = '1234567890';
    const mockAction = {
      type: 'auth/loginWithPhoneNumber/rejected',
      error: {message: 'Please try again later!'},
    };

    // Mock the dispatch function to return the rejected action
    (loginWithPhoneNumber as unknown as jest.Mock).mockReturnValue(mockAction);
    mockDispatch.mockResolvedValue(mockAction);

    const {getByPlaceholderText, getByText} = render(<LoginScreen />);

    // Simulate user input and submission
    fireEvent.changeText(
      getByPlaceholderText('insert phone number'),
      mockPhone,
    );
    fireEvent.press(getByText('Sign in'));

    // Ensure the error message is displayed
    await act(async () => {
      await waitFor(() => {
        expect(getByText('Please try again later!')).toBeTruthy();
      });
    });
  });

  it('should clear the phone input when close icon is pressed', async () => {
    const mockPhone = '1234567890';

    const {getByPlaceholderText, getByTestId} = render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('insert phone number'),
      mockPhone,
    );

    const clearIcon = getByTestId('clear-input');
    fireEvent.press(clearIcon);

    await act(async () => {
      await waitFor(() => {
        expect(getByPlaceholderText('insert phone number').props.value).toBe(
          '',
        );
      });
    });
  });

  it('should open country picker when prefix is pressed', () => {
    const {getByTestId, getByText} = render(<LoginScreen />);

    act(() => {
      fireEvent.press(getByTestId('country-code'));
    });

    expect(getByText('Popular Countries')).toBeTruthy();
  });

  it('should disable the sign-in button when loading', async () => {
    const mockAction = {
      type: 'auth/loginWithPhoneNumber/pending',
    };

    // Mock the dispatch function to return the pending action
    (loginWithPhoneNumber as unknown as jest.Mock).mockReturnValue(mockAction);
    mockDispatch.mockResolvedValue(mockAction);

    const {getByTestId} = render(<LoginScreen />);

    // Simulate pressing the sign-in button
    await act(async () => {
      fireEvent.press(getByTestId('app-button-sign-in'));

      // Wait for the state to update
      await waitFor(() => {
        const signInButton = getByTestId('app-button-sign-in');

        // Check if the button is disabled
        expect(signInButton.props.onPress).toBeUndefined();
      });
    });
  });
});
