import React from 'react';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import { useSnackbar } from 'notistack';

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  function handleDelete() {
    setLoading(true);
    fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(() => {
        setLoading(false);
        navigate('/');
        enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
      })
      .catch((err) => {
        setLoading(false);
        alert('There was an error deleting the book, please try again');
        console.log(err);
        enqueueSnackbar('Error', { variant: 'error' });
      });
  }

  return (
    <div className='p-4'>
      <Backbutton />
      <div className='max-w-screen-md mx-auto bg-white p-8 rounded-xl shadow-lg'>
        <h1 className='text-3xl font-bold mb-6'>Delete Book</h1>
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-full p-8'>
          <h3 className='text-2xl mb-6'>Are you sure you want to delete this book?</h3>
          <button
            onClick={handleDelete}
            className='px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 ease-in-out'
          >
            Yes, I am sure
          </button>
          {loading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default DeleteBooks;
