"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      picture
      author {
        id
        name
        picture
      }
    }
  }
`;

export default function BooksPage() {
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Books</h1>
      <Link href="/books/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block hover:bg-blue-600 transition">Add Book</Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-800">Cover</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Title</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Author</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map((book) => (
              <tr key={book.id}>
                <td className="py-2 px-4 border-b">
                  <img src={book.picture} alt={book.title} className="w-14 h-20 object-cover rounded shadow" />
                </td>
                <td className="py-2 px-4 border-b text-gray-700">{book.title}</td>
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
    </div>
  );
} 