import React, {useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type AppTextProps = TextProps & {
  children?: React.ReactNode;
  font?: 'Poppins';
  italic?: boolean;
  bold?: boolean;
};

export default function AppText({
  style = {},
  font = 'Poppins',
  italic = false,
  bold = false,
  children = '',
  ...props
}: AppTextProps) {
  const content = useMemo(() => children, [children]);

  const flatStyle = useMemo(() => {
    const {fontWeight, ...values} = StyleSheet.flatten(style ?? {});
    return {fontWeight, values};
  }, [style]);

  const family = useMemo(() => {
    const styleBold = flatStyle.fontWeight === 'bold';
    return `${font}${bold || styleBold ? '-SemiBold' : ''}${
      italic ? '-Italic' : ''
    }${italic || styleBold || bold ? '' : '-Regular'}`;
  }, [flatStyle.fontWeight, font, bold, italic]);

  return (
    <Text
      style={[
        {fontFamily: family},
        flatStyle.values,
        {fontVariant: ['lining-nums']},
      ]}
      {...props}>
      {content}
    </Text>
  );
}
