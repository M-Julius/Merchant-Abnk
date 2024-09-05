import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const Shimmer = createShimmerPlaceholder(LinearGradient);

interface ShimmerWrapperProps {
  style?: object;
  testID?: string;
}

function ShimmerPlaceHolder({style, testID}: ShimmerWrapperProps) {
  return (
    <View testID={testID}>
      <Shimmer style={style} />
    </View>
  );
}
export default ShimmerPlaceHolder;
