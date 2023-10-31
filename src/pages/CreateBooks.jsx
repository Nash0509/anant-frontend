import React, { useState } from 'react';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          publishYear,
        }),
      });

      if (response.ok) {
        enqueueSnackbar('Book Created successfully!', { variant: 'success' });
        navigate('/');
      } else {
        throw new Error('Error creating book');
      }
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Backbutton />
        <h1 className="text-4xl font-semibold mb-6 text-center text-indigo-700">Create Book</h1>
        {loading && <Spinner />}
        <div className="space-y-6">
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field p-2"
              placeholder="Enter title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600 mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input-field p-2"
              placeholder="Enter author..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600 mb-1">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="input-field p-2"
              placeholder="Enter publish year..."
            />
          </div>
          <button
            onClick={handleSaveBook}
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-md transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
