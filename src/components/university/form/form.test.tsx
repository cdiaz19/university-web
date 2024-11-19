import { render, screen } from '@testing-library/react';
import Form from './form';
import { vi } from 'vitest';

describe('Form component', () => {
  it('should render correctly', () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    render(<Form onClose={mockOnClose} onSubmit={mockOnSubmit}/>)
    screen.debug()
  });
});
