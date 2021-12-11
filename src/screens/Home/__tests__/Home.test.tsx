import React from 'react';
import { render, toJSON } from '@testing-library/react-native';

import Home from '../presenter';

describe('Home - Presenter', () => {
  it('should render', () => {
    const { container } = render(<Home />);
    expect(toJSON(container)).toMatchSnapshot();
  });
});
