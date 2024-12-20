import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Search from './search'

describe('Search component', () => {
  it('should render correctly', () => {
    const mockOnChange = vi.fn();

    render(<Search onChange={mockOnChange}/>)
    screen.debug()
  })

  it('calls the onChange handler when input value changes', () => {
    const mockOnChange = vi.fn();
    render(<Search value="" placeholder= "Search..." onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('new query');
  });
});
