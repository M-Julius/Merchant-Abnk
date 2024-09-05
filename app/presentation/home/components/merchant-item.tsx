import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Merchant} from '../../../core/model/types';
import AppText from '../../../core/components/app-text';
import AppColors from '../../../core/theme/app-colors';

interface MerchantItemProps {
  item: Merchant;
}

export default function MerchantItem({item}: MerchantItemProps) {
  return (
    <View testID="merchant-item" style={styles.merchantContainer}>
      <Image
        testID="image-merchant"
        source={{uri: item.logo}}
        style={styles.merchantLogo}
      />
      <View style={styles.merchantInfo}>
        <AppText style={styles.merchantName} numberOfLines={2}>
          {item.name}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  merchantContainer: {
    width: '48%',
    height: 170,
    backgroundColor: AppColors.white_grey,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  merchantLogo: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  merchantInfo: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  merchantName: {
    textAlign: 'center',
    color: AppColors.medium_grey,
  },
});
