import { useEffect, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { PageInfo, University } from '../types';
import { fetchUniversities } from '../services';
import Pagination from './pagination';
import { Spinner } from './spinner';
import { Search } from './search';

const UniversityTable = () =>  {
  const [universities, setUniversities] = useState<University[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 1,
    total_pages: 1,
    total_entries: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);

  const fetchData = async (page: number = 1) => {
    setLoading(true);

    try {
      const { data } = await fetchUniversities(page);
      setUniversities(data.universities);
      setPageInfo(data.page_info);
      setLoading(false);
    } catch (err: any) {
      console.log('err ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(true), 5000);

    setTimeout(() => {
      fetchData();
    }, 5000);

    clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(
        universities.filter((university) =>
          university.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, universities]);

  const getSortIcon = (isSorted: string | false) => {
    switch (isSorted) {
      case 'asc':
        return <ChevronUpIcon className="w-4 h-4 inline" />;
      case 'desc':
        return <ChevronDownIcon className="w-4 h-4 inline" />;
      default:
        return null;
    }
  };

  const columns: ColumnDef<University>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
    },
    {
      accessorKey: 'location',
      header: 'Location',
      enableSorting: true,
    },
    {
      accessorKey: 'contact_emails',
      header: 'Contact Email',
    },
    {
      accessorKey: 'website',
      header: 'Website',
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    columns,
    data: filteredUniversities,
    sortDescFirst: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  if (loading) {
    return <Spinner />;
  };

  return (
    <>
      <Search value={searchQuery} onChange={setSearchQuery} placeholder="Search by name" />
      <div className="mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-center ">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id} colSpan={header.colSpan}
                    className="px-6 py-3 text-sm font-semibold text-gray-700 text-center uppercase tracking-wider border-b border-gray-200"
                    >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flow-root items-center'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {getSortIcon(header.column.getIsSorted())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageInfo && pageInfo.total_pages > 1 && (
        <Pagination
          currentPage={pageInfo.current_page}
          totalPages={pageInfo.total_pages}
          onPageChange={fetchData}
        />
      )}
    </>
  )

}

export default UniversityTable;
