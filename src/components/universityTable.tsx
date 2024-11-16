import { useEffect, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { PageInfo, University } from '../types';
import { fetchUniversities } from '../services';
import Pagination from './pagination';
import { Spinner } from './spinner';

const UniversityTable = () =>  {
  const [universities, setUniversities] = useState<University[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 1,
    total_pages: 1,
    total_entries: 0,
  });
  const [loading, setLoading] = useState(false);

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

  const columns: ColumnDef<University>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'contact_emails',
      header: 'Contact Email',
    },
    {
      accessorKey: 'website',
      header: 'Website',
    },
  ]

  const table = useReactTable({columns, data: universities, getCoreRowModel: getCoreRowModel()})

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-sm font-semibold text-gray-700 text-center uppercase tracking-wider border-b border-gray-200"
                    >
                    {flexRender(header.column.columnDef.header, header.getContext())}
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

export default UniversityTable
