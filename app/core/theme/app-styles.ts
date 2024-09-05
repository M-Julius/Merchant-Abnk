import {StyleSheet} from 'react-native';
import AppColors from './app-colors';

const AppStyles = StyleSheet.create({
  appbar: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  hPaddingNormal: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerStretch: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  textMedium: {
    fontSize: 20,
  },
  textNormal: {
    fontSize: 16,
  },
  textSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  textXs: {
    fontSize: 12,
    lineHeight: 16,
  },
  textXsWhite: {color: AppColors.white, fontSize: 12, lineHeight: 16},
  textH1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    color: AppColors.black,
  },
  textH2: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: AppColors.black,
  },
  textH3: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
    color: AppColors.black,
  },
  textH4: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    color: AppColors.black,
  },
  textH5: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: AppColors.black,
  },
  textH6: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: AppColors.black,
  },
  textBody18: {
    fontSize: 18,
    lineHeight: 24,
    color: AppColors.black,
  },
  textBody16: {
    fontSize: 16,
    lineHeight: 22,
    color: AppColors.black,
  },
  textBody14: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.black,
  },
  textButton16: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.black,
  },
  textButton14: {
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.black,
    fontWeight: 'bold',
  },
  textSect: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: AppColors.black,
  },
  textCaption: {
    fontSize: 12,
    lineHeight: 16,
    color: AppColors.black,
  },

  link: {
    color: AppColors.orchid,
  },
  linkUnderline: {
    textDecorationLine: 'underline',
  },
  linkBold: {
    fontWeight: 'bold',
  },
  headerBorderBottom: {
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
  },
});

export default AppStyles;
