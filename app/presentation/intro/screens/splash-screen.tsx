import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import AppColors from '../../../core/theme/app-colors';

const SplashScreen = ({}) => {
  const positionX = useSharedValue(-100);
  const scale = useSharedValue(1);

  useEffect(() => {
    positionX.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      },
      () => {
        scale.value = withSpring(
          1.5,
          {
            damping: 10,
            stiffness: 100,
          },
          () => {
            scale.value = withSpring(
              1,
              {
                damping: 10,
                stiffness: 100,
              },
            );
          },
        );
      },
    );
  }, [positionX, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: positionX.value}, {scale: scale.value}],
    };
  });

  return (
    <View testID="splash-screen" style={styles.container}>
      <Animated.Text testID="text-intro" style={[styles.text, animatedStyle]}>
        Abnk
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: 'bold',
    color: AppColors.orchid,
  },
});

export default SplashScreen;
