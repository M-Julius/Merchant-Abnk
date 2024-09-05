import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppColors from '../../../core/theme/app-colors';
import AppStyles from '../../../core/theme/app-styles';
import image from '../../../core/assets/image';
import ShimmerPlaceHolder from '../../../core/components/shimmer-placeholder';


const {width} = Dimensions.get('window');

interface BalanceCardProps {
  loading: boolean;
}

const BalanceCard = ({loading}: BalanceCardProps) => {
  return (
    <View testID="balance-card">
      {loading ? (
        <View style={styles.loadingContainer}>
          <ShimmerPlaceHolder
            style={styles.shimmerTitle}
            testID="shimmer-title"
          />
          <ShimmerPlaceHolder
            style={styles.shimmerCard}
            testID="shimmer-card"
          />
        </View>
      ) : (
        <View style={styles.loadedContainer}>
          <AppText style={styles.title}>Account</AppText>
          <View style={styles.balanceCard}>
            <View style={styles.balanceInfo}>
              <AppText style={[AppStyles.textBody18, styles.whiteText]}>
                Current Balance
              </AppText>
              <AppText style={[AppStyles.textH2, styles.whiteText]}>
                $12.000
              </AppText>
            </View>
            <View style={styles.cardInfo}>
              <AppText style={[AppStyles.textBody16, styles.whiteText]}>
                *******3121
              </AppText>
              <Image source={image.mastercard} style={styles.mastercardLogo} />
            </View>
            <Image source={image.wave} style={styles.waveBackground} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadedContainer: {
    marginTop: 26,
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  shimmerTitle: {
    width: 150,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  shimmerCard: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  balanceCard: {
    width: width * 0.9,
    backgroundColor: AppColors.orchidOpacity,
    height: 200,
    borderRadius: 20,
    padding: 30,
    justifyContent: 'space-between',
  },
  balanceInfo: {
    zIndex: 1,
  },
  cardInfo: {
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteText: {
    color: AppColors.white,
  },
  mastercardLogo: {
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
  waveBackground: {
    width: width * 0.9,
    height: 200,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    alignItems: 'center',
    borderRadius: 20,
    transform: [{rotateY: '180deg'}, {rotateZ: '180deg'}],
  },
  title: {
    ...AppStyles.textH3,
    marginBottom: 10,
  },
});

export default BalanceCard;
