"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      picture
      biography
      born_date
      books {
        id
        title
        picture
        published_date
      }
    }
  }
`;

export default function AuthorDetailPage() {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_AUTHOR, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.author) return <p>Author not found</p>;

  const { author } = data;

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{author.name}</h1>
        <div className="space-x-4">
          <Link href={`/authors/edit/${author.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Edit Author
          </Link>
          <Link href="/authors" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Back to Authors
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Author Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <img 
                src={author.picture} 
                alt={author.name} 
                className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto mb-6"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Biography</h3>
                  <p className="mt-1 text-gray-700">{author.biography || 'No biography available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Born Date</h3>
                  <p className="mt-1 text-gray-700">{author.born_date || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Books by {author.name}</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              {author.books.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {author.books.map((book) => (
                    <Link 
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition"
                    >
                      <img 
                        src={book.picture} 
                        alt={book.title} 
                        className="w-24 h-32 object-cover rounded shadow mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800 text-center">{book.title}</h3>
                      {book.published_date && (
                        <p className="text-xs text-gray-500 mt-1">{book.published_date}</p>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No books available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 