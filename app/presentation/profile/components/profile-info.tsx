import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SettingItem from './setting-item';

const ProfileInfo = () => (
  <View style={styles.sectionContainer}>
    <AppText style={styles.sectionTitle} testID="account-setting">
      Account Setting
    </AppText>
    <SettingItem
      icon={<Feather name="user" size={24} color={AppColors.orchid} />}
      text="Profile Setting"
    />
    <SettingItem
      icon={<Feather name="lock" size={24} color={AppColors.orchid} />}
      text="Change Password"
    />
    <SettingItem
      icon={<AntDesign name="message1" size={24} color={AppColors.orchid} />}
      text="Chat Support"
    />
  </View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    ...AppStyles.textButton16,
    marginBottom: 15,
  },
});

export default ProfileInfo;
