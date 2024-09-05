import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import Entypo from 'react-native-vector-icons/Entypo';

const SettingItem = ({icon, text}: {icon: JSX.Element; text: string}) => (
  <View style={styles.settingItemContainer} testID={`setting-item-${text}`}>
    <View style={styles.settingItemContent}>
      <View style={styles.iconContainer}>{icon}</View>
      <AppText style={styles.settingText}>{text}</AppText>
    </View>
    <Entypo name="chevron-right" size={24} />
  </View>
);

const styles = StyleSheet.create({
  settingItemContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    backgroundColor: AppColors.white_cloud,
    borderRadius: 10,
    marginRight: 15,
  },
  settingText: {
    ...AppStyles.textBody16,
    color: AppColors.medium_grey,
  },
});

export default SettingItem;
