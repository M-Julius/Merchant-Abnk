import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../../core/components/app-text';
import MerchantItem from './merchant-item';
import ShimmerPlaceHolder from '../../../core/components/shimmer-placeholder';
import {Merchant} from '../../../core/model/types';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';

interface MerchantSectionProps {
  merchants: Merchant[];
  loading: boolean;
}

export default function MerchantSection({
  merchants,
  loading,
}: MerchantSectionProps) {
  return (
    <View>
      {loading ? <MerchantsShimmer /> : <Merchants merchants={merchants} />}
    </View>
  );
}

function MerchantsShimmer() {
  return (
    <View testID="merchant-section">
      <View style={[styles.rowBetween, {marginTop: 20}]}>
        <ShimmerPlaceHolder
          testID="shimmer-title"
          style={styles.shimmerTitle}
        />
        <ShimmerPlaceHolder testID="shimmer-all" style={styles.shimmerAll} />
      </View>
      <View style={styles.merchantList}>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={styles.merchantContainer}>
              <ShimmerPlaceHolder
                testID="shimmer-merchant-logo"
                style={styles.merchantLogo}
              />
              <ShimmerPlaceHolder
                testID="shimmer-merchant-name"
                style={styles.merchantInfo}
              />
            </View>
          ))}
      </View>
    </View>
  );
}

function Merchants({merchants}: {merchants: Merchant[]}) {
  return (
    <>
      <View style={styles.rowBetween}>
        <AppText style={[AppStyles.textH3, styles.merchantTitle]}>
          Merchant
        </AppText>
        <AppText style={[AppStyles.textButton14, {color: AppColors.orchid}]}>
          See all
        </AppText>
      </View>
      <View style={styles.merchantList}>
        {merchants?.map((item, index) => (
          <MerchantItem key={item.slug + index.toString()} item={item} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
  },
  merchantTitle: {},
  merchantList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shimmerTitle: {
    width: 150,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },
  shimmerAll: {
    width: 100,
    height: 30,
    marginBottom: 10,
    borderRadius: 20,
  },
  merchantContainer: {
    width: '48%',
    height: 170,
    backgroundColor: AppColors.white_grey,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  merchantLogo: {
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  merchantInfo: {
    width: '70%',
    height: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});
