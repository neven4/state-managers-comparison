import { render } from '@testing-library/react';

import StateNormalized from './state-normalized';

describe('StateNormalized', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StateNormalized />);
    expect(baseElement).toBeTruthy();
  });
});
