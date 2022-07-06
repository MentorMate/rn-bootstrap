import React from 'react';
import { render } from '@testing-library/react-native';
import {{spacedCurlyBraces (append name ', TestID')}} from '../{{name}}';

describe('verify {{name}}', () => {
  test('renders a wrapper', () => {
    const { getByTestId } = render(<{{name}} />);
    const wrapper = getByTestId(TestID.{{name}}Wrapper);
    expect(wrapper).toBeTruthy();
  });

  test('renders some text', () => {
    const { getByTestId } = render(<{{name}} />);
    const textComponent = getByTestId(TestID.SomeText);
    expect(textComponent).toHaveTextContent('Your {{name}}');
  });
});
