import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import InputForm from '../../../core/components/input-form';
import AppColors from '../../../core/theme/app-colors';
import AppStyles from '../../../core/theme/app-styles';
import image from '../../../core/assets/image';
import ShimmerPlaceHolder from '../../../core/components/shimmer-placeholder';

interface HeaderProps {
  keyword: string;
  setKeyword: (text: string) => void;
  loading: boolean;
}

const Header = ({keyword, setKeyword, loading}: HeaderProps) => {
  return (
    <View testID="header" style={styles.header}>
      {loading ? (
        <ShimmerHeader />
      ) : (
        <HeaderComponent keyword={keyword} setKeyword={setKeyword} />
      )}
    </View>
  );
};

const ShimmerHeader = () => (
  <View style={[styles.header, {width: '100%'}]}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ShimmerPlaceHolder
        style={styles.profilePlaceholder}
        testID="shimmer-profile"
      />
      <ShimmerPlaceHolder
        style={styles.inputFormPlaceholder}
        testID="shimmer-input-form"
      />
    </View>
    <ShimmerPlaceHolder style={styles.bellIcon} testID="shimmer-bell-icon" />
  </View>
);

const HeaderComponent = ({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: (text: string) => void;
}) => (
  <View testID="header-component" style={AppStyles.row}>
    <Image source={image.avatar} style={styles.profilePlaceholder} />
    <InputForm
      error={false}
      style={styles.inputForm}
      containerStyle={styles.inputFormContainer}
      placeholder="Search"
      maxLength={20}
      prefix={() => (
        <Feather
          name="search"
          size={24}
          color={AppColors.light_grey}
          style={styles.iconMargin}
        />
      )}
      onChangeText={setKeyword}
      value={keyword}
    />
    <View style={styles.bellIcon}>
      <Feather name="bell" size={24} color={AppColors.medium_grey} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: AppColors.light_grey,
    marginRight: 15,
  },
  inputForm: {
    alignSelf: 'center',
    flex: 1,
  },
  inputFormPlaceholder: {
    width: '140%',
    height: 50,
    borderRadius: 30,
  },
  inputFormContainer: {
    borderRadius: 30,
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 15,
  },
  bellIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white_grey,
    marginLeft: 15,
  },
});

export default Header;
