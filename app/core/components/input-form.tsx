import React, { useMemo } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import AppStyles from '../theme/app-styles';
import AppColors from '../theme/app-colors';
import AppText from './app-text';

type InputProps = {
  error: boolean;
  placeholder: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  readonly?: boolean;
  font?: 'Poppins';
  italic?: boolean;
  bold?: boolean;
  value: string;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
};

const Input = ({
  placeholder = '',
  error = false,
  readonly = false,
  font = 'Poppins',
  italic = false,
  bold = false,
  maxLength,
  secureTextEntry = false,
  keyboardType = 'default',
  onChangeText = () => null,
  value = '',
  onSubmitEditing = () => null,
  style = {},
}: InputProps) => {
  // Determine font family based on props
  const family = useMemo(
    () =>
      `${font}${bold ? '-SemiBold' : ''}${italic ? '-Italic' : ''}${
        bold || italic ? '' : '-Regular'
      }`,
    [font, italic, bold],
  );

  return (
    <TextInput
      editable={!readonly}
      style={[
        { fontFamily: family, fontSize: 12 },
        styles.input,
        error && styles.error,
        style,
      ]}
      placeholderTextColor={AppColors.grey}
      placeholder={placeholder}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

// Additional props for InputForm component
type InputFormExtraProps = {
  inputStyle: StyleProp<ViewStyle | TextStyle>;
  errorStyle: StyleProp<ViewStyle | TextStyle>;
};

// Type definitions for InputForm component
type InputFormProps = InputProps & {
  style: StyleProp<ViewStyle | TextStyle>;
  inputStyle?: StyleProp<ViewStyle | TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  prefix?: (props: InputFormExtraProps) => JSX.Element;
  suffix?: (props: InputFormExtraProps) => JSX.Element;
  errorString?: string;
  onPress?: () => void;
};

// InputForm component
const InputForm = ({
  style = {},
  containerStyle = {},
  prefix = () => <View />,
  suffix = () => <View />,
  error = false,
  errorString = '',
  onPress = () => null,
  inputStyle = {},
  ...props
}: InputFormProps) => {
  const Prefix = prefix!;
  const Suffix = suffix!;

  // Render the input form content
  const renderContent = () => (
    <>
      <View
        style={[
          styles.inputContainer,
          error && styles.error,
          containerStyle,
        ]}
      >
        <Prefix
          inputStyle={[AppStyles.textBody16, { fontVariant: ['lining-nums'] }]}
          errorStyle={error && styles.error}
        />
        <Input error={error} {...props} style={inputStyle} />
        <Suffix
          inputStyle={[AppStyles.textBody16, { fontVariant: ['lining-nums'] }]}
          errorStyle={error && styles.error}
        />
      </View>
      {error && (
        <AppText style={[AppStyles.textXs, styles.error]}>
          {errorString}
        </AppText>
      )}
    </>
  );

  return props.readonly ? (
    <Pressable style={style} onPress={onPress}>
      {renderContent()}
    </Pressable>
  ) : (
    <View style={style}>{renderContent()}</View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderColor: '#D8DADD',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    ...AppStyles.textBody16,
    fontVariant: ['lining-nums'],
    padding: 0,
    flex: 1,
    lineHeight: Platform.OS === 'ios' ? 0 : 22,
  },
  title: {
    ...AppStyles.textSmall,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  error: {
    color: AppColors.red,
    borderColor: AppColors.red,
  },
  placeholder: {
    color: AppColors.grey,
  },
});

export default InputForm;
