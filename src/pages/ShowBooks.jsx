import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/books/${id}`)
            .then((res) => res.json()) 
            .then((data) => {
                setBook(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4 mx-auto max-w-xl'>
            <Backbutton />
            <h1 className='text-3xl my-4 font-bold text-center'>Book Details</h1>
            <div className='bg-white shadow-lg rounded-lg p-6'>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-col space-y-4'>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Book ID:</span>
                            <span>{book._id}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Title:</span>
                            <span>{book.title}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Author:</span>
                            <span>{book.author}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Publish Year:</span>
                            <span>{book.publishYear}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Created At:</span>
                            <span>{new Date(book.createdAt).toLocaleString()}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-gray-500 font-semibold mr-2'>Updated At:</span>
                            <span>{new Date(book.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowBooks;
