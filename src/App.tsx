import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
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
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);


  const debounced = useDebouncedCallback(
    (value) => {
      setSearchQuery(value);
      fetchData(1, value);
    },
    1000
  );

  const fetchData = async (page: number = 1, searchQuery: string = '') => {
    setLoading(true);

    try {
      const { data } = await fetchUniversities(page, searchQuery);
      setUniversities(data.universities);
      setPageInfo(data.page_info);
      setLoading(false);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('err ', err);
      setSnackbarState(true, 'Error fetching data. Please try again later.');
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
        setSnackbarState(false, 'University was created successfully');
      } else {
        setSnackbarState(true, 'Error adding university. Please try again later.');
      }
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Error adding university:', error);
      setSnackbarState(true, 'Error adding university. Please try again later.');
    }
  };

  const setSnackbarState = (isError: boolean, message: string) => {
    setIsError(isError);
    setSnackbarOpen(true);
    setMessage(message);
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
        <Search onChange={(value) => debounced(value)} placeholder="Search by name" />
        <UniversityList
          universitiesList={universities}
          isLoading={loading}
          currentSearchQuery={searchQuery}
          currentPage={pageInfo.current_page}
          reFetchData={fetchData}
          setSnackbarOpen={setSnackbarOpen}
          setIsError={setIsError}
          setMessage={setMessage}
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
      <Snackbar message={message} isOpen={isSnackbarOpen} isError={isError} onClose={() => setSnackbarOpen(false)} />
    </>
  )
}

export default App
