import { useState } from 'react';
import { ColumnDef, SortDirection, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { University, formData } from '../../../types';
import { deleteUniversity, updateUniversity } from '../../../services';
import { Spinner, Dialog } from '@ui/';
import { Form } from '../form';
import { cleanUniversityData } from '../../../utils/cleanUniversityData';
import { DeleteUniversityDialog } from '../deleteUniversityDialog';

interface UniversityListProps {
  universitiesList: University[];
  isLoading: boolean;
  currentPage: number;
  reFetchData: (currentPage: number) => void;
  setSnackbarOpen: (state: boolean) => void;
  setError: (message: string) => void;
}

const UniversityList = ({ universitiesList, isLoading, currentPage, reFetchData, setSnackbarOpen, setError} : UniversityListProps) => {
  const [universityToEdit, setUniversityToEdit] = useState<University>();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [university, setUniversity] = useState<University>({
    id: 0,
    name: '',
    location: '',
    contact_emails: [],
    website: '',
  });

  const getSortIcon = (isSorted: SortDirection | boolean) => {
    if (isSorted === 'asc') return <ChevronUpIcon className="w-4 h-4 inline" />;
    if (isSorted === 'desc') return <ChevronDownIcon className="w-4 h-4 inline" />;
    return null;
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
              onClick={() => handleShow(university)}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(university)}
              className="text-green-500 hover:text-blue-700 flex items-center space-x-2"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => openDeleteDialog(university)}
              className="text-red-500 hover:text-red-700 flex items-center space-x-2"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: universitiesList,
    sortDescFirst: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const handleShow = (university: University) => {
    setUniversityToEdit(university);
    setIsReadOnly(true)
    setDialogOpen(true);
  };

  const handleEdit = (university: University) => {
    setUniversityToEdit(university);
    setIsReadOnly(false)
    setDialogOpen(true);
  };

  const openDeleteDialog = (university: University) => {
    setUniversity(university)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUniversity(id);
      await reFetchData(currentPage);
    } catch (err) {
      console.error('Error deleting university:', err);
      setSnackbarOpen(true);
      setError('Error deleting university. Please try again later.');
    } finally {
      setDeleteDialogOpen(false)
    }
  };

  const onSubmit = async (payload: formData) => {
    try {
      const universityPayload = cleanUniversityData(payload);

      const { data } = await updateUniversity(universityPayload as University);

      if (data) {
        setDialogOpen(false);
        await reFetchData(currentPage);
      } else {
        console.error('Failed to update university');
        setSnackbarOpen(true);
        setError('Error updating university. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating university:', error);
      setSnackbarOpen(true);
      setError('Error updating university. Please try again later.');
    }
  };

  return (
    <>
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
          {isLoading ? (
            <tr>
              <td className='h-32' colSpan={5}>
                <Spinner />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
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
            ))
          )}
          </tbody>
        </table>
      </div>
      <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen}>
        <Form university={universityToEdit} onClose={() => setDialogOpen(false)} onSubmit={onSubmit} isReadOnly={isReadOnly}/>
      </Dialog>
      <DeleteUniversityDialog isOpen={isDeleteDialogOpen} university={university} onClose={() => setDeleteDialogOpen(false)} onDelete={() => handleDelete(university.id)} />
    </>
  )
}

export default UniversityList;
