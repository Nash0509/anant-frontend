import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BookTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-2xl">#</th>
            <th className="py-2 px-4 text-2xl">Title</th>
            <th className="py-2 px-4 hidden lg:table-cell text-2xl">Author</th>
            <th className="py-2 px-4 hidden lg:table-cell text-2xl">Publish Year</th>
            <th className="py-2 px-4 text-center text-2xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="transition duration-300 hover:bg-gray-100">
              <td className="py-2 px-4 text-2xl">{index + 1}</td>
              <td className="py-2 px-4 text-2xl">{book.title}</td>
              <td className="py-2 px-4 hidden lg:table-cell text-2xl">{book.author}</td>
              <td className="py-2 px-4 hidden lg:table-cell text-2xl">{book.publishYear}</td>
              <td className="py-2 px-4 text-center">
                <Link to={`/books/details/${book._id}`} className="text-blue-500 hover:text-blue-700 mx-2">
                  <BsInfoCircle className="text-2xl" />
                </Link>
                <Link to={`/books/edit/${book._id}`} className="text-green-500 hover:text-green-700 mx-2">
                  <AiOutlineEdit className="text-2xl" />
                </Link>
                <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:text-red-700 mx-2">
                  <MdOutlineDelete className="text-2xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
