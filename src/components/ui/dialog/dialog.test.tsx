import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Dialog from './dialog';

describe('Dialog component', () => {
  it('should render correctly', () => {
    const mockSetIsOpen = vi.fn();

    render(<Dialog isOpen={true} setIsOpen={mockSetIsOpen}/>)
    screen.debug()
  });
});
