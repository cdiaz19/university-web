import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UniversityList from './universityList';

const mockReFetchData = vi.fn();
const mockSetSnackbarOpen = vi.fn();
const mockSetError = vi.fn();
const mockSetMessage = vi.fn();

describe('UniversityList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {

    render(<UniversityList universitiesList={[]} isLoading={true} currentPage={1} currentSearchQuery='' reFetchData={mockReFetchData} setSnackbarOpen={mockSetSnackbarOpen} setIsError={mockSetError} setMessage={mockSetMessage} />)
    screen.debug()
  })

  it('renders the spinner initially', async () => {
    render(<UniversityList universitiesList={[]} isLoading={true} currentPage={1} currentSearchQuery='' reFetchData={mockReFetchData} setSnackbarOpen={mockSetSnackbarOpen} setIsError={mockSetError} setMessage={mockSetMessage} />);

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  it('renders the spinner initially', async () => {
    render(<UniversityList universitiesList={[]} isLoading={true} currentPage={1} currentSearchQuery='' reFetchData={mockReFetchData} setSnackbarOpen={mockSetSnackbarOpen} setIsError={mockSetError} setMessage={mockSetMessage} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
