import React from 'react';
import {render} from '@testing-library/react-native';
import ToggleableSafeArea from '../components/toggleable-safearea';
import {Text, View} from 'react-native';

describe('ToggleableSafeArea Component', () => {
  it('renders SafeAreaView when active is true', () => {
    const {getByTestId} = render(
      <ToggleableSafeArea active={true} testID="toggleable-safearea">
        <>
          <View>
            <Text>Tes</Text>
          </View>
        </>
      </ToggleableSafeArea>,
    );

    expect(getByTestId('toggleable-safearea').type).toBe('RNCSafeAreaView');
  });

  it('renders View when active is false', () => {
    const {getByTestId} = render(
      <ToggleableSafeArea active={false} testID="toggleable-safearea">
        <View>
          <Text>Tes</Text>
        </View>
      </ToggleableSafeArea>,
    );

    // Check if View is rendered
    expect(getByTestId('toggleable-safearea').type).toBe('View');
  });

  it('renders children correctly', () => {
    const {getByText} = render(
      <ToggleableSafeArea active={true}>
        <Text>Test Child</Text>
      </ToggleableSafeArea>,
    );

    // Check if children are rendered
    expect(getByText('Test Child')).toBeTruthy();
  });
});
