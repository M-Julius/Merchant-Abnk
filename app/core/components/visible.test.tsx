import React from 'react';
import {render} from '@testing-library/react-native';
import Visible from './visible';
import {Text} from 'react-native';

describe('Visible Component', () => {
  it('renders children when visible is true', () => {
    const {getByText} = render(
      <Visible visible={true}>
        <Text>Visible Content</Text>
      </Visible>,
    );

    // Check if children are rendered
    expect(getByText('Visible Content')).toBeTruthy();
  });

  it('does not render children when visible is false and onInvisible is not provided', () => {
    const {queryByText} = render(
      <Visible visible={false}>
        <Text>Invisible Content</Text>
      </Visible>,
    );

    // Check that children are not rendered
    expect(queryByText('Invisible Content')).toBeNull();
  });

  it('renders result of onInvisible callback when visible is false and onInvisible is provided', () => {
    const mockOnInvisible = jest.fn(() => <Text>Invisible Content</Text>);
    const {getByText} = render(
      <Visible visible={false} onInvisible={mockOnInvisible}>
        <Text>Visible Text</Text>
      </Visible>,
    );

    // Check if the result of onInvisible is rendered
    expect(getByText('Invisible Content')).toBeTruthy();
    expect(mockOnInvisible).toHaveBeenCalled();
  });

  it('does not render anything when visible is false and onInvisible is not a function', () => {
    const {queryByText} = render(
      <Visible visible={false} onInvisible={undefined}>
        <Text>Invisible Content</Text>
      </Visible>,
    );

    // Check that nothing is rendered
    expect(queryByText('Invisible Content')).toBeNull();
  });
});
