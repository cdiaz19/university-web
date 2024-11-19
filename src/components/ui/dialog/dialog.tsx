import { Dialog as DialogHeadlessui, DialogPanel } from '@headlessui/react';

const Dialog = ({ isOpen, setIsOpen, children } : any) =>  { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <>
      <DialogHeadlessui open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 min-w-3xl">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-96 space-y-4 border bg-white p-12">
            {children}
          </DialogPanel>
        </div>
      </DialogHeadlessui>
    </>
  );
};

export default Dialog;
