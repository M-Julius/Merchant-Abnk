import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PageHeader from './page-header';
import AppColors from '../theme/app-colors';
import AppStyles from '../theme/app-styles';
import {Text} from 'react-native';

const mockGoBack = jest.fn();

// Mock useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

describe('PageHeader Component', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  test('renders with default props', () => {
    const {getByTestId} = render(<PageHeader />);
    const header = getByTestId('toggleable-safearea');
    expect(header).toBeTruthy();
  });

  test('displays back button when withBack is true', () => {
    const {getByTestId} = render(<PageHeader withBack={true} />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeTruthy();
  });

  test('calls navigation.goBack when back button is pressed', () => {
    const {getByTestId} = render(<PageHeader withBack={true} />);
    const backButton = getByTestId('back-button');

    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });

  test('applies correct theme based on headerTheme prop', () => {
    const {getByTestId} = render(<PageHeader headerTheme="dark" />);
    const header = getByTestId('toggleable-safearea');
    expect(header.props.style).toContainEqual({
      backgroundColor: AppColors.black,
    });
  });

  test('renders children elements', () => {
    const {getByText} = render(
      <PageHeader>
        <Text>Test Child</Text>
      </PageHeader>,
    );
    expect(getByText('Test Child')).toBeTruthy();
  });

  test('renders with border when withBorder is true', () => {
    const {getByTestId} = render(<PageHeader withBorder={true} />);
    const header = getByTestId('toggleable-safearea');
    expect(header.props.style).toContainEqual(AppStyles.headerBorderBottom);
  });

  test('renders with SafeAreaView when withSafeArea is true', () => {
    const {getByTestId} = render(<PageHeader withSafeArea={true} />);
    const safeAreaView = getByTestId('toggleable-safearea');

    expect(safeAreaView.type).toBe('RNCSafeAreaView');
    expect(safeAreaView).not.toBeNull();
  });

  test('renders custom background color when background prop is provided', () => {
    const {getByTestId} = render(<PageHeader background={AppColors.red} />);
    const header = getByTestId('toggleable-safearea');
    expect(header.props.style).toContainEqual({backgroundColor: AppColors.red});
  });
});
