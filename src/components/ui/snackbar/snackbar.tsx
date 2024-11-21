import { useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  isError: boolean;
  onClose: () => void;
};

const Snackbar = ({ message, isOpen, isError, onClose } : SnackbarProps) =>  {
  const backgroundClass = isError ? 'bg-red-600' : 'bg-green-600';
  const hoverColor = isError ? 'hover:text-red-300' : 'hover:text-green-300';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${backgroundClass} text-white px-6 py-3 rounded-md shadow-md flex items-center`}>
        <span className="flex-grow">{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 text-white ${hoverColor} focus:outline-none`}
        >
          ✖
        </button>
      </div>
    )
  );
}

export default Snackbar;
