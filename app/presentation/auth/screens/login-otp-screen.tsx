import React, {useState, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';

import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import AppText from '../../../core/components/app-text';
import {AppButton, AppButtonThemes} from '../../../core/components/app-button';
import PageHeader from '../../../core/components/page-header';
import OtpCounter from '../components/otp-counter';
import {RootState} from '../../../core/store/store';
import {
  confirmOtp,
  loginWithPhoneNumber,
} from '../../../core/store/redux/authSlice';
import Visible from '../../../core/components/visible';

// Constants
const RETRY_INTERVAL_MS = 60000; // 1 minute
const OTP_CELL_COUNT = 6;
const {width} = Dimensions.get('window');

type LoginOtpProps = {
  route: any;
};

const LoginOtpScreen: React.FC<LoginOtpProps> = ({route}) => {
  // State hooks
  const [otp, setOtp] = useState('');
  const [otpRetry, setOtpRetry] = useState(Date.now() + RETRY_INTERVAL_MS);
  const [otpError, setOtpError] = useState(false);

  const navigation = useNavigation();

  // Redux hooks
  const {sessionId, loading, error} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();

  // Code field setup
  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });
  const ref = useBlurOnFulfill({value: otp, cellCount: OTP_CELL_COUNT});

  // Memoized phone number
  const displayOtpTarget = useMemo(
    () => route?.params?.phone,
    [route?.params?.phone],
  );

  // Handle OTP submission
  const handleOtpSubmit = () => {
    if (sessionId) {
      dispatch(confirmOtp({sessionId, otp}))
        .then((action: any) => {
          if (confirmOtp.fulfilled.match(action)) {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}] as never[],
            });
          } else {
            setOtpError(true);
          }
        })
        .catch(() => setOtpError(true));
    }
  };

  // Handle OTP resend
  const resendOtp = async () => {
    const countryCode = displayOtpTarget.slice(0, 2);
    const phone = displayOtpTarget.slice(2);

    dispatch(
      loginWithPhoneNumber({
        countryDiallingCode: countryCode,
        mobileNumber: phone,
      }),
    )
      .then((action: any) => {
        if (loginWithPhoneNumber.fulfilled.match(action)) {
          setOtpRetry(Date.now() + RETRY_INTERVAL_MS);
        } else {
          setOtpError(true);
        }
      })
      .catch(() => setOtpError(true));
  };

  return (
    <SafeAreaView
      testID="login-otp-screen"
      style={[AppStyles.pageContainer, styles.safeArea]}>
      <PageHeader withBack />
      <AppText
        testID="verify"
        style={[AppStyles.textH2, AppStyles.hPaddingNormal, styles.verifyText]}>
        Verify OTP
      </AppText>
      <AppText
        testID="text-enter-otp"
        style={[
          AppStyles.textBody16,
          AppStyles.hPaddingNormal,
          styles.descriptionText,
        ]}>
        Enter {OTP_CELL_COUNT}-digit OTP code that has been sent to phone number
        +{displayOtpTarget}.
      </AppText>
      <CodeField
        {...codeFieldProps}
        testID="code-field"
        ref={ref}
        rootStyle={[styles.rootOtp]}
        value={otp}
        cellCount={OTP_CELL_COUNT}
        secureTextEntry
        keyboardType="numeric"
        onChangeText={text => {
          setOtp(text);
          setOtpError(false);
        }}
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            onLayout={getCellOnLayout(index)}
            style={[styles.cell, (otpError || error) && styles.cellError]}>
            <AppText style={[AppStyles.textBody16, styles.cellText]}>
              {symbol ? (
                <MaskSymbol
                  maskSymbol="*"
                  isLastFilledCell={isLastFilledCell({index, value: otp})}>
                  {symbol}
                </MaskSymbol>
              ) : isFocused ? (
                <Cursor cursorSymbol="|" />
              ) : null}
            </AppText>
          </View>
        )}
        onSubmitEditing={() => !loading && handleOtpSubmit()}
      />
      <Visible visible={otpError || error?.length === 0}>
        <AppText style={[AppStyles.textCaption, styles.errorText]}>
          {error || 'OTP code failed. Please try again.'}
        </AppText>
      </Visible>
      <OtpCounter
        testID="otp-counter-button"
        retryTimestamp={otpRetry}
        style={styles.otpCounter}
        clickable={!loading}
        onPress={resendOtp}
      />
      <View style={styles.flexFill} />
      <AppButton
        enabled={!loading}
        onClick={handleOtpSubmit}
        style={styles.continueButton}
        btnStyle={AppButtonThemes.filled_teal}>
        Continue
      </AppButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.white,
  },
  verifyText: {
    marginTop: 8,
  },
  descriptionText: {
    marginTop: 8,
    color: AppColors.medium_grey,
  },
  rootOtp: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 48,
    paddingHorizontal: 8,
  },
  cell: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8DADD',
    width: width * 0.12,
    height: width * 0.12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellError: {
    borderColor: AppColors.red,
  },
  cellText: {
    textAlign: 'center',
  },
  errorText: {
    marginTop: 8,
    marginHorizontal: 16,
    color: AppColors.red,
  },
  otpCounter: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  flexFill: {
    flex: 1,
  },
  continueButton: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
});

export default LoginOtpScreen;
