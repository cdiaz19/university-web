import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UniversityList from './universityList';

vi.mock('../../services', () => ({
  fetchUniversities: vi.fn(),
}));

describe('UniversityList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<UniversityList />)
    screen.debug()
  })

  it('renders the spinner initially', async () => {
    render(<UniversityList />);

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  it('renders the spinner initially', async () => {
    render(<UniversityList />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
