import { Dialog as DialogHeadlessui, DialogPanel } from '@headlessui/react';

const Dialog = ({ isOpen, setIsOpen } : any) =>  { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <>
      <DialogHeadlessui open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <span> Add University Form </span>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </DialogHeadlessui>
    </>
  );
};

export default Dialog;
