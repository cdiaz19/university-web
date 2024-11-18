import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from './App';

describe('App component', () => {
  it('should render correctly', () => {
    render(<App />);
    screen.debug();
  });
});
