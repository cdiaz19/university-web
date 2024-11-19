import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Dialog, Search, Snackbar } from '@ui/';
import { Pagination } from './components';
import { Form, UniversityList } from './components/university';
import { PageInfo, University, formData } from './types';
import { createUniversity, fetchUniversities } from './services';
import { cleanUniversityData } from './utils/cleanUniversityData';

import './App.css';

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 1,
    total_pages: 1,
    total_entries: 0,
  });
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 3000);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchData(1, debouncedQuery);
    }, 1000);
  }, [debouncedQuery]);

  const fetchData = async (page: number = 1, searchQuery: string = '') => {
    setLoading(true);

    try {
      const { data } = await fetchUniversities(page, searchQuery);
      setUniversities(data.universities);
      setPageInfo(data.page_info);
      setLoading(false);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('err ', err);
      setSnackbarOpen(true)
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (payload: formData) => {
    try {
      const universityPayload = cleanUniversityData(payload);

      const { data } = await createUniversity(universityPayload);

      if (data) {
        setDialogOpen(false);
        fetchData(pageInfo.current_page);
      } else {
        setSnackbarOpen(true)
        setError('Error adding university. Please try again later.');
      }
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Error adding university:', error);
      setSnackbarOpen(true)
      setError('Error adding university. Please try again later.');
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">University Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => setDialogOpen(true)}
        >
          Add University
        </button>
      </div>
      <div className="mt-4">
        <Search value={searchQuery} onChange={setSearchQuery} placeholder="Search by name" />
        <UniversityList
          universitiesList={universities}
          isLoading={loading}
          currentPage={pageInfo.current_page}
          reFetchData={fetchData}
          setSnackbarOpen={setSnackbarOpen}
          setError={setError}
          />
        { !loading && pageInfo && pageInfo.total_pages > 1 ? (
          <Pagination
            currentPage={pageInfo.current_page}
            totalPages={pageInfo.total_pages}
            onPageChange={fetchData}
          />
        ) : null }
      </div>
      <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen}>
        <Form onClose={() => setDialogOpen(false)} onSubmit={onSubmit}/>
      </Dialog>
      <Snackbar message={error} isOpen={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} />
    </>
  )
}

export default App
