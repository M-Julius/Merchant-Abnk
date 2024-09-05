import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';

import {RootState} from '../../../core/store/store';
import {fetchMerchants} from '../../../core/store/redux/merchantSlice';
import Header from '../components/header';
import BalanceCard from '../components/balance-card';
import MerchantSection from '../components/merchant-section';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStyles from '../../../core/theme/app-styles';
import AppText from '../../../core/components/app-text';
import AppColors from '../../../core/theme/app-colors';
import image from '../../../core/assets/image';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
  const {merchants, loading, error} = useSelector(
    (state: RootState) => state.merchants,
  );

  useEffect(() => {
    dispatch(fetchMerchants());
  }, [dispatch]);

  return (
    <SafeAreaView edges={['top']} style={AppStyles.container}>
      <ScrollView style={styles.container} testID="home-screen">
        <Header keyword={keyword} setKeyword={setKeyword} loading={loading} />
        <BalanceCard loading={loading} />
        {error ? (
          <View style={styles.errorContainer}>
            <Image
              source={image.error}
              style={styles.errorImage}
              resizeMode="contain"
            />
            <AppText style={styles.errorText}>
              {error || 'Something went wrong!'}
            </AppText>
          </View>
        ) : (
          <MerchantSection merchants={merchants} loading={loading} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  errorContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  errorImage: {
    width: '100%',
    height: 250,
  },
  errorText: {
    paddingTop: '20%',
    ...AppStyles.textButton16,
    color: AppColors.red,
  },
});
