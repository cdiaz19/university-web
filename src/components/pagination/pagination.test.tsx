import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Pagination from './pagination'

describe('Pagination component', () => {
  it('should render correctly', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    screen.debug();
  })

  it('calls onPageChange with the correct page when buttons are clicked', () => {
    const onPageChangeMock = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);

    const prevButton = screen.getByRole('button', { name: 'Previous' });
    const nextButton = screen.getByRole('button', { name: 'Next' });

    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);

    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('disables the Previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);

    const prevButton = screen.getByRole('button', { name: 'Previous' });

    expect(prevButton).toBeDisabled();
  });

  it('disables the Next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });

    expect(nextButton).toBeDisabled();
  });
});
