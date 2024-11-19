import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UniversityList from './universityList';

vi.mock('../../services', () => ({
  fetchUniversities: vi.fn(),
}));

const mockReFetchData = vi.fn();

describe('UniversityList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {

    render(<UniversityList universitiesList={[]} isLoading={true} reFetchData={mockReFetchData} />)
    screen.debug()
  })

  it('renders the spinner initially', async () => {
    render(<UniversityList universitiesList={[]} isLoading={true} reFetchData={mockReFetchData} />);

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  it('renders the spinner initially', async () => {
    render(<UniversityList universitiesList={[]} isLoading={true} reFetchData={mockReFetchData}  />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
