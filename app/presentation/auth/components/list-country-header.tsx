import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../../core/components/app-text';
import AppStyles from '../../../core/theme/app-styles';
import AppColors from '../../../core/theme/app-colors';
import {CountryButton} from 'react-native-country-codes-picker';

const ListHeaderCountry = ({countries, onPress, lang}: any) => {
  return (
    <View style={styles.headerContainer}>
      <AppText style={styles.popularCountriesText}>Popular Countries</AppText>
      {countries?.map((country: any, index: number) => {
        return (
          <CountryButton
            style={{
              countryName: {
                color: AppColors.dark_grey,
              },
              dialCode: {
                color: AppColors.dark_grey,
              },
              textInput: {
                height: 200,
              },
            }}
            key={index}
            item={country}
            name={country?.name?.[lang || 'en']}
            onPress={() => onPress(country)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 8,
  },
  popularCountriesText: {
    ...AppStyles.textBody14,
    fontWeight: 'bold',
    color: AppColors.dark_grey,
  },
  divider: {
    marginTop: 8,
    height: 1,
    backgroundColor: AppColors.medium_grey,
  },
});

export default ListHeaderCountry;
