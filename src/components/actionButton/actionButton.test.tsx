import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import  ActionButton from './actionButton';

describe('ActionButton component', () => {
  it('should render correctly', () => {
    const mockOnClick = vi.fn();

    render(<ActionButton tooltip="" onClick={mockOnClick} icon={null} colorClass="" />)
    screen.debug()
  });
});
