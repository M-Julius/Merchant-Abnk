import React, {useState, useEffect, useRef} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';

export type OtpCounterProps = {
  testID?: string;
  retryTimestamp: number;
  clickable?: boolean;
  style?: StyleProp<ViewStyle | TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const OtpCounter: React.FC<OtpCounterProps> = ({
  retryTimestamp,
  clickable = true,
  style = {},
  testID = '',
  onPress,
}) => {
  const [timer, setTimer] = useState<string | undefined>(undefined);
  const timerId = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const current = retryTimestamp - new Date().getTime();
      if (current <= 0) {
        setTimer(undefined);
        if (timerId.current) {
          clearInterval(timerId.current as any);
          timerId.current = undefined;
        }
        return;
      }
      const minute = String(Math.floor(current / 60000)).padStart(2, '0');
      const second = String(Math.floor((current % 60000) / 1000)).padStart(
        2,
        '0',
      );
      setTimer(`${minute}:${second}`);
    };

    calculateTimeLeft();
    timerId.current = setInterval(calculateTimeLeft, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current as any);
      }
    };
  }, [retryTimestamp]);

  return timer ? (
    <AppText
      testID={testID}
      bold
      style={[AppStyles.textButton14, {color: AppColors.grey}, style]}>
      {timer}
    </AppText>
  ) : (
    <AppText
      testID={testID}
      onPress={clickable ? onPress : undefined}
      style={[AppStyles.textButton14, style, {fontWeight: undefined}]}>
      OTP code failed. {'\n'}Please try again.{' '}
      <AppText
        testID="resend-otp"
        bold
        onPress={clickable ? onPress : undefined}
        style={[AppStyles.link]}>
        Resend
      </AppText>
    </AppText>
  );
};

export default OtpCounter;
