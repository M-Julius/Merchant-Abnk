import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppStyles from '../../../core/theme/app-styles';
import AppText from '../../../core/components/app-text';
import AppColors from '../../../core/theme/app-colors';

const FooterComponent = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.bottomTextContainer}>
        <AppText style={styles.signUpText}>
          Don't have an account?{' '}
          <AppText style={AppStyles.link} onPress={() => {}}>
            Sign up
          </AppText>
        </AppText>
      </View>
      <AppText style={styles.termsText}>
        With login or register, you agree with {'\n'}
        <AppText
          style={[AppStyles.linkUnderline, AppStyles.linkBold]}
          onPress={() => {}}>
          Terms and Conditions
        </AppText>{' '}
        And{' '}
        <AppText style={[AppStyles.linkUnderline, AppStyles.linkBold]}>
          Privacy Police
        </AppText>
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 16,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signUpText: {
    ...AppStyles.textButton16,
    color: AppColors.medium_grey,
  },
  termsText: {
    textAlign: 'center',
    paddingTop: 20,
    ...AppStyles.textCaption,
    color: AppColors.medium_grey,
  },
});

export default FooterComponent;
