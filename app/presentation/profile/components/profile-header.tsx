import React from 'react';
import {View, Pressable, StyleSheet, Image} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import Feather from 'react-native-vector-icons/Feather';
import image from '../../../core/assets/image';

const ProfileHeader = () => (
  <View style={styles.profileContainer} testID="profile-header">
    <View style={styles.profileInfo}>
      <Image
        testID="profile-image"
        source={image.avatar}
        style={styles.profileImage}
      />
      <View>
        <AppText style={styles.profileName} bold>
          M. Julius Saputra
        </AppText>
        <AppText style={styles.profilePhone}>+65-81231231</AppText>
      </View>
    </View>
    <Pressable>
      <Feather name="edit" size={24} color={AppColors.orchid} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    backgroundColor: AppColors.light_grey,
    width: 70,
    height: 70,
    borderRadius: 80,
    marginRight: 10,
  },
  profileName: {
    ...AppStyles.textMedium,
    color: AppColors.dark_grey,
  },
  profilePhone: {
    ...AppStyles.textBody14,
  },
});

export default ProfileHeader;
