import { Dialog } from "@ui/";
import { University } from "../../../types";

interface deleteUniversityDialogProps {
  isOpen: boolean;
  university: University;
  onClose: () => void;
  onDelete: () => void;
}

const deleteUniversityDialog = ({ isOpen, university, onClose, onDelete } : deleteUniversityDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-red-600">{university?.name}</span>? <br/> This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default deleteUniversityDialog;
