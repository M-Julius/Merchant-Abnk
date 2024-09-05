import React from 'react';
import {render} from '@testing-library/react-native';
import AppText from './app-text';

describe('AppText Component', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(<AppText>Default Text</AppText>);
    const textElement = getByText('Default Text');
    expect(textElement).toBeTruthy();
    expect(textElement).toHaveStyle({fontFamily: 'Poppins-Regular'});
  });

  it('applies bold style correctly', () => {
    const {getByText} = render(<AppText bold>Bold Text</AppText>);
    const textElement = getByText('Bold Text');
    expect(textElement).toHaveStyle({fontFamily: 'Poppins-SemiBold'});
  });

  it('applies italic style correctly', () => {
    const {getByText} = render(<AppText italic>Italic Text</AppText>);
    const textElement = getByText('Italic Text');
    expect(textElement).toHaveStyle({fontFamily: 'Poppins-Italic'});
  });

  it('applies bold and italic styles correctly', () => {
    const {getByText} = render(
      <AppText bold italic>
        Bold Italic Text
      </AppText>,
    );
    const textElement = getByText('Bold Italic Text');
    expect(textElement).toHaveStyle({fontFamily: 'Poppins-SemiBold-Italic'});
  });

  it('applies custom font styles correctly', () => {
    const {getByText} = render(
      <AppText font="Poppins">Custom Font Text</AppText>,
    );
    const textElement = getByText('Custom Font Text');
    expect(textElement).toHaveStyle({fontFamily: 'Poppins-Regular'});
  });

  it('applies custom styles passed via the style prop', () => {
    const customStyle = {fontSize: 20, color: 'blue'};
    const {getByText} = render(
      <AppText style={customStyle}>Styled Text</AppText>,
    );
    const textElement = getByText('Styled Text');
    expect(textElement).toHaveStyle(customStyle);
  });

  it('renders children correctly', () => {
    const {getByText} = render(<AppText>Child Text</AppText>);
    const textElement = getByText('Child Text');
    expect(textElement.props.children).toBe('Child Text');
  });
});
