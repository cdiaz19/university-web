import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Snackbar from './snackbar';

describe('Snackbar component', () => {
  it('should render correctly', () => {
    const mockOnClose = vi.fn();

    render(<Snackbar message='test' isOpen={true} onClose={mockOnClose}/>)
    screen.debug()
  });
});
