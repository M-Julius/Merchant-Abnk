import React from 'react';
import {render, screen, act} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import OtpCounter from './otp-counter';

jest.useFakeTimers();

describe('OtpCounter', () => {
  it('should display the timer correctly and update every second', () => {
    const retryTimestamp = new Date().getTime() + 2 * 60 * 1000;

    render(<OtpCounter retryTimestamp={retryTimestamp} />);

    expect(screen.getByText(/02:00/)).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/01:59/)).toBeTruthy();
  });

  it('should clear the timer and not display any text when time has elapsed', () => {
    const retryTimestamp = new Date().getTime() - 10 * 1000;

    render(<OtpCounter retryTimestamp={retryTimestamp} />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Check if the timer is cleared and no timer text is displayed
    expect(screen.queryByText(/00:00/)).toBeNull();
  });

  it('should call onPress when the timer finishes and is clickable', () => {
    const onPressMock = jest.fn();
    const retryTimestamp = new Date().getTime() - 10 * 1000;

    render(
      <OtpCounter
        retryTimestamp={retryTimestamp}
        clickable
        onPress={onPressMock}
      />,
    );

    // Fast-forward time to trigger onPress
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Simulate press
    screen.getByText(/Resend/).props.onPress();

    // Check if onPress was called
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
