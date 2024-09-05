import React from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';
import AppColors from '../../../core/theme/app-colors';
import ListHeaderCountry from './list-country-header';

interface Props {
  showCountry: boolean;
  setShowCountry: (show: boolean) => void;
  setCountryCode: (code: string) => void;
}

const CountryPickerComponent: React.FC<Props> = ({
  showCountry,
  setShowCountry,
  setCountryCode,
}) => {
  return (
    <CountryPicker
      lang="en"
      show={showCountry}
      searchMessage="Search"
      enableModalAvoiding
      style={{
        modal: {
          height: '60%',
        },
        textInput: {
          color: AppColors.dark_grey,
        },
        dialCode: {
          color: AppColors.dark_grey,
        },
        countryName: {
          color: AppColors.dark_grey,
        },
      }}
      pickerButtonOnPress={item => {
        setCountryCode(item.dial_code);
        setShowCountry(false);
      }}
      ListHeaderComponent={ListHeaderCountry}
      popularCountries={['sg', 'us', 'id', 'my']}
    />
  );
};

export default CountryPickerComponent;
