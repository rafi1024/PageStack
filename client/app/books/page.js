"use client";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const PAGE_SIZE = 10;

const GET_BOOKS = gql`
  query GetBooks($page: Int, $limit: Int, $authorId: ID) {
    books(page: $page, limit: $limit, authorId: $authorId) {
      books {
        id
        title
        picture
        description
        published_date
        author {
          id
          name
          picture
        }
      }
      total
      hasMore
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors(page: 1, limit: 100) {
      authors {
        id
        name
      }
    }
  }
`;

export default function BooksPage() {
  const [page, setPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  
  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(GET_BOOKS, {
    variables: { 
      page, 
      limit: PAGE_SIZE,
      authorId: selectedAuthor || null
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: authorsData } = useQuery(GET_AUTHORS);

  if (booksLoading && !booksData) return <p>Loading...</p>;
  if (booksError) return <p>Error: {booksError.message}</p>;

  const books = booksData?.books?.books || [];
  const total = booksData?.books?.total || 0;
  const hasMore = booksData?.books?.hasMore;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const authors = authorsData?.authors?.authors || [];

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books</h1>
        <Link href="/books/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add Book</Link>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="authorFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Author
        </label>
        <select
          id="authorFilter"
          value={selectedAuthor}
          onChange={handleAuthorChange}
          className="mt-1 block w-1/4 pl-3 pr-10 py-2 text-base bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900 shadow-sm"
        >
          <option value="" className="text-gray-500">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id} className="text-gray-900">
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-800">Cover</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Title</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Description</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Published Date</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Author</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="py-2 px-4 border-b">
                  <img src={book.picture} alt={book.title} className="w-14 h-20 object-cover rounded shadow" />
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  <Link href={`/books/${book.id}`} className="hover:text-blue-600 hover:underline">
                    {book.title}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b text-gray-700 max-w-md truncate">{book.description || '-'}</td>
                <td className="py-2 px-4 border-b text-gray-700">{book.published_date || '-'}</td>
                <td className="py-2 px-4 border-b text-gray-700">{book.author.name}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/books/edit/${book.id}`} className="text-blue-600 mr-4 hover:underline">Edit</Link>
                  <Link href={`/books/delete/${book.id}`} className="text-red-600 hover:underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages || 1}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
} 