import { Row, flexRender } from "@tanstack/react-table";
import { University } from "../../../types";
import { Spinner } from "../../ui";

interface UniversityTableBodyProps {
  isLoading: boolean;
  rows: Row<University>[];
};

const UniversityTableBody = ({ isLoading, rows }: UniversityTableBodyProps) => {
  if (isLoading) {
    return (
      <tr>
        <td className='h-32' colSpan={5}>
          <Spinner />
        </td>
      </tr>
    )
  }

  if (!rows.length) {
    return (
      <tr>
        <td className='h-32' colSpan={5}>
          No data found
        </td>
      </tr>
    )
  }

  return (
    rows.map((row) => (
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
  );
};

export default UniversityTableBody;
