import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetch(`http://localhost:3000/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setAuthor(data.author);
                setPublishYear(data.publishYear);
                setLoading(false);
            })
            .catch((err) => {
                enqueueSnackbar('Error loading book data', { variant: 'error' });
                console.error(err);
            });
    }, [id]);

    function handleEditBook() {
        const data = {
            title,
            author,
            publishYear,
        };
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                enqueueSnackbar('Book edited successfully updated', { variant: 'success' });
                navigate('/');
            })
            .catch((err) => {
                enqueueSnackbar('Error editing book', { variant: 'error' });
                console.error(err);
            });
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                <div className='mb-6 flex items-center'>
                    <h1 className='text-3xl font-semibold ml-4'>Edit Book</h1>
                </div>
                <div className='mb-4'>
                    <label className='text-sm text-gray-600 mb-1 block'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='input-field p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-sm text-gray-600 mb-1 block'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='input-field p-2'
                    />
                </div>
                <div className='mb-6'>
                    <label className='text-sm text-gray-600 mb-1 block'>Publish Year</label>
                    <input
                        type='text'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='input-field p-2'
                    />
                </div>
                <button
                    onClick={handleEditBook}
                    className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditBooks;
