import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import  DeleteUniversityDialog from './deleteUniversityDialog';

describe('DeleteUniversityDialog component', () => {
  it('should render correctly', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();
    const university = { id: 0, name: '', location: '', contact_emails: [], website: '' }

    render(<DeleteUniversityDialog isOpen={true} university={university} onClose={mockOnClose} onDelete={mockOnConfirm} />)
    screen.debug()
  });
});
