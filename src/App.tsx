import { useState } from 'react';
import { Dialog } from '@ui/';
import { Form, UniversityList } from './components/university';

import './App.css';

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">University Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => setDialogOpen(true)}
        >
          Add University
        </button>
      </div>
      <div className="mt-4">
        <UniversityList />
      </div>
      <Dialog isOpen={isDialogOpen} setIsOpen={setDialogOpen}>
        <Form onClose={() => setDialogOpen(false)} />
      </Dialog>
    </>
  )
}

export default App
