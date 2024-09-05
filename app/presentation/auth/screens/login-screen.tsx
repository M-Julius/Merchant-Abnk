import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import AppText from '../../../core/components/app-text';
import {AppButton, AppButtonThemes} from '../../../core/components/app-button';
import {validationAuthSchema} from '../../../core/schema/auth-schema';
import InputForm from '../../../core/components/input-form';
import {loginWithPhoneNumber} from '../../../core/store/redux/authSlice';
import HeaderLogin from '../components/header-login';
import CountryPickerComponent from '../components/country-picker';
import FooterComponent from '../components/footer-login';

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+65');
  const [showCountry, setShowCountry] = useState(false);
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();

  const handleLogin = async (phone: string) => {
    setLoading(true);
    try {
      const action = await dispatch(
        loginWithPhoneNumber({
          countryDiallingCode: countryCode.replace('+', ''),
          mobileNumber: phone,
        }),
      );
      if (loginWithPhoneNumber.fulfilled.match(action)) {
        navigation.navigate('LoginOtpScreen', {
          phone: countryCode.replace('+', '') + phone,
        });
      } else {
        formik.setErrors({
          phone:
            action?.payload ?? 'Login failed, please check your phone number!',
        });
      }
    } catch (error) {
      formik.setErrors({phone: 'Please try again later!'});
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {phone: ''},
    onSubmit: ({phone}) => handleLogin(phone),
    validationSchema: validationAuthSchema,
  });

  return (
    <SafeAreaView
      testID="login-screen"
      edges={['top', 'bottom']}
      style={[AppStyles.container, styles.safeAreaView]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={AppStyles.container}>
        <View>
          <HeaderLogin />
          <AppText style={styles.labelText}>Phone Number</AppText>
          <InputForm
            style={styles.inputForm}
            placeholder={'insert phone number'}
            error={!!formik.errors.phone}
            maxLength={20}
            errorString={formik.errors.phone}
            prefix={({inputStyle, errorStyle}) => (
              <Pressable
                testID="country-code"
                onPress={() => setShowCountry(true)}
                style={styles.prefixContainer}>
                <AppText style={[inputStyle, styles.prefixText, errorStyle]}>
                  {countryCode}
                </AppText>
              </Pressable>
            )}
            keyboardType="numeric"
            onChangeText={text => formik.setFieldValue('phone', text.trim())}
            onSubmitEditing={formik.handleSubmit}
            value={formik.values.phone}
            suffix={() =>
              formik.values.phone.length > 4 &&
              formik.values.phone.length !== 11 ? (
                <EvilIcons
                  testID="clear-input"
                  name="close"
                  size={32}
                  color={AppColors.medium_grey}
                  onPress={() => formik.setFieldValue('phone', '')}
                />
              ) : (
                <View />
              )
            }
          />
          <View style={styles.rowTop10}>
            <AppText
              style={[AppStyles.textBody14, {color: AppColors.medium_grey}]}>
              Problems with cell phone numbers?
            </AppText>
            <AppText
              onPress={() => {}}
              bold
              style={{color: AppColors.orchid, marginLeft: 5}}>
              Press Here
            </AppText>
          </View>

          <AppButton
            testID="app-button-sign-in"
            enabled={!loading}
            onClick={() => formik.handleSubmit()}
            style={styles.signInButton}
            btnStyle={AppButtonThemes.filled_teal}>
            Sign in
          </AppButton>
          <AppText style={styles.orText}>Or</AppText>
          <AppButton
            style={styles.emailButton}
            btnStyle={AppButtonThemes.outline}>
            Login with email
          </AppButton>
        </View>
        <FooterComponent />
      </ScrollView>
      <CountryPickerComponent
        showCountry={showCountry}
        setShowCountry={setShowCountry}
        setCountryCode={setCountryCode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: AppColors.white,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  labelText: {
    marginTop: 24,
    ...AppStyles.textBody14,
  },
  inputForm: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    paddingRight: 8,
  },
  signInButton: {
    marginTop: 32,
  },
  orText: {
    marginTop: 12,
    ...AppStyles.textCaption,
    ...AppStyles.centerStretch,
    color: AppColors.medium_grey,
  },
  emailButton: {
    marginTop: 12,
  },
  rowTop10: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
