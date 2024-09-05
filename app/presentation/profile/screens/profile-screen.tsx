import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {AppButton, AppButtonThemes} from '../../../core/components/app-button';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import {useDispatch} from 'react-redux';
import {ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';
import {logout} from '../../../core/store/redux/authSlice';
import ProfileInfo from '../components/profile-info';
import ProfileHeader from '../components/profile-header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView edges={['top']} style={AppStyles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <AppText style={AppStyles.textH2}>Profile</AppText>
          <ProfileHeader />
        </View>
        <ProfileInfo />
        <View style={styles.divider} />
        <AppButton onClick={handleLogout} btnStyle={AppButtonThemes.danger}>
          Logout
        </AppButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.grey_divider,
    marginBottom: 20,
  },
});
