import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Form from './form';

describe('Form component', () => {
  it('should render correctly', () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    render(<Form onClose={mockOnClose} onSubmit={mockOnSubmit}/>)
    screen.debug()
  });
});
