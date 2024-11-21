import { useState } from 'react';
import { ColumnDef, SortDirection, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { University, formData } from '../../../types';
import { deleteUniversity, updateUniversity } from '../../../services';
import { Dialog } from '@ui/';
import { Form } from '../form';
import { cleanUniversityData } from '../../../utils/cleanUniversityData';
import { DeleteUniversityDialog } from '../deleteUniversityDialog';
import UniversityTableBody from './universityTableBody';
import { ActionButton } from '../../actionButton';

interface UniversityListProps {
  universitiesList: University[];
  isLoading: boolean;
  currentPage: number;
  currentSearchQuery: string;
  reFetchData: (currentPage: number, currentSearchQuery: string) => void;
  setSnackbarOpen: (state: boolean) => void;
  setIsError: (state: boolean) => void;
  setMessage: (message: string) => void;
}

const UniversityList = ({ universitiesList, isLoading, currentSearchQuery, currentPage, reFetchData, setSnackbarOpen, setIsError, setMessage}: UniversityListProps) => {
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
            <ActionButton
              tooltip="View details"
              onClick={() => handleShow(university)}
              icon={<EyeIcon className="w-5 h-5" />}
              colorClass="text-blue-500 hover:text-blue-700"
            />
            <ActionButton
              tooltip="Edit university"
              onClick={() => handleEdit(university)}
              icon={<PencilIcon className="w-5 h-5" />}
              colorClass="text-green-500 hover:text-green-700"
            />
            <ActionButton
              tooltip="Delete university"
              onClick={() => openDeleteDialog(university)}
              icon={<TrashIcon className="w-5 h-5" />}
              colorClass="text-red-500 hover:text-red-700"
            />
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
    setIsReadOnly(true);
    setDialogOpen(true);
  };

  const handleEdit = (university: University) => {
    setUniversityToEdit(university);
    setIsReadOnly(false);
    setDialogOpen(true);
  };

  const openDeleteDialog = (university: University) => {
    setUniversity(university);
    setDeleteDialogOpen(true);
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUniversity(id);
      await reFetchData(currentPage, currentSearchQuery);
      setSnackbarState(false, 'University was deleted successfully.');
    } catch (err) {
      console.error('Error deleting university:', err);
      setSnackbarState(true, 'Error deleting university. Please try again later.');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const onSubmit = async (payload: formData) => {
    try {
      const universityPayload = cleanUniversityData(payload);

      const { data } = await updateUniversity(universityPayload as University);

      if (data) {
        setDialogOpen(false);
        await reFetchData(currentPage, currentSearchQuery);
        setSnackbarState(false, 'University updated successfully.');
      } else {
        console.error('Failed to update university');
        setSnackbarState(true, 'Error updating university. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating university:', error);
      setSnackbarState(true, 'Error updating university. Please try again later.');
    }
  };

  const setSnackbarState = (isError: boolean, message: string) => {
    setIsError(isError);
    setSnackbarOpen(true);
    setMessage(message);
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
            <UniversityTableBody isLoading={isLoading} rows={table.getRowModel().rows} />
          </tbody>
        </table>
      </div>
      <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen}>
        <Form university={universityToEdit} onClose={() => setDialogOpen(false)} onSubmit={onSubmit} isReadOnly={isReadOnly} />
      </Dialog>
      <DeleteUniversityDialog isOpen={isDeleteDialogOpen} university={university} onClose={() => setDeleteDialogOpen(false)} onDelete={() => handleDelete(university.id)} />
    </>
  )
};

export default UniversityList;
