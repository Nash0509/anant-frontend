import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../showtype/BookTable';
import BookCard from '../showtype/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen font-sans text-gray-800'>
            <div className='container mx-auto p-6'>
                <div className='flex justify-center items-center space-x-6 mb-8'>
                    <button
                        onClick={() => setShowType('table')}
                        className='bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg transition duration-300 ease-in-out'
                    >
                        Table View
                    </button>
                    <button
                        onClick={() => setShowType('card')}
                        className='bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-lg transition duration-300 ease-in-out'
                    >
                        Card View
                    </button>
                </div>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-4xl font-bold'>Books List</h1>
                    <Link to='/books/create'>
                        <MdOutlineAddBox className='text-6xl text-yellow-400 hover:text-yellow-300 transition duration-300 ease-in-out' />
                    </Link>
                </div>
                {loading ? <Spinner /> : showType === 'table' ? <BookTable books={books} /> : <BookCard books={books} />}
            </div>
        </div>
    );
};

export default Home;
