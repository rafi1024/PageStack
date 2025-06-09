"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
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
  }
`;

export default function BookDetailPage() {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.book) return <p>Book not found</p>;

  const { book } = data;

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
        <div className="space-x-4">
          <Link href={`/books/edit/${book.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Edit Book
          </Link>
          <Link href="/books" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Back to Books
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Book Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <img 
                src={book.picture} 
                alt={book.title} 
                className="w-48 h-64 object-cover rounded shadow-lg mx-auto mb-6"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-gray-700">{book.description || 'No description available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Published Date</h3>
                  <p className="mt-1 text-gray-700">{book.published_date || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Author Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={book.author.picture} 
                  alt={book.author.name} 
                  className="w-16 h-16 object-cover rounded-full shadow"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{book.author.name}</h3>
                  <Link 
                    href={`/authors/${book.author.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Author Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 