import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppStyles from '../../../core/theme/app-styles';
import AppText from '../../../core/components/app-text';
import AppColors from '../../../core/theme/app-colors';

const HeaderLogin = () => {
  return (
    <>
      <View style={styles.spacer} />
      <AppText style={AppStyles.textH2}>Abnk</AppText>
      <AppText style={AppStyles.textH2}>Sign In</AppText>
      <AppText style={styles.subTitleText}>
        Please sign in to see all merchant
      </AppText>
    </>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: '5%',
  },
  subTitleText: {
    marginTop: 8,
    ...AppStyles.textBody16,
    color: AppColors.medium_grey,
  },
});

export default HeaderLogin;
