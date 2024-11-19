import { useEffect, useState } from 'react';
import { ColumnDef, SortDirection, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { PageInfo, University } from '../../../types';
import { fetchUniversities } from '../../../services';
import { Pagination } from '../../pagination';
import { Spinner, Search, Dialog } from '@ui/';
import { Form } from '../form';

const UniversityList = () =>  {
  const [universities, setUniversities] = useState<University[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 1,
    total_pages: 1,
    total_entries: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [universityToEdit, setUniversityToEdit] = useState<University | null>(null);

  const fetchData = async (page: number = 1) => {
    setLoading(true);

    try {
      const { data } = await fetchUniversities(page);
      setUniversities(data.universities);
      setPageInfo(data.page_info);
      setLoading(false);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log('err ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredUniversities(
        universities.filter((university) =>
          university.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities(universities);
    }
  }, [searchQuery, universities]);

  const getSortIcon = (isSorted: SortDirection | boolean) => {
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
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const university = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(university)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: filteredUniversities,
    sortDescFirst: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const handleEdit = (university: University) => {
    setUniversityToEdit(university);
    setDialogOpen(true);
  };

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
      <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen}>
        <Form university={universityToEdit} onClose={() => setDialogOpen(false)} />
      </Dialog>
    </>
  )
}

export default UniversityList;
