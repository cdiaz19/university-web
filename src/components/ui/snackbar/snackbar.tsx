interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

const Snackbar = ({ message, isOpen, onClose } : SnackbarProps) =>  {
  return (
    isOpen && (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-md flex items-center">
        <span className="flex-grow">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-red-300 focus:outline-none"
        >
          ✖
        </button>
      </div>
    )
  );
}

export default Snackbar;
