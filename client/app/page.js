"use client";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books(page: 1, limit: 10) {
      books {
        id
        title
        picture
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors(page: 1, limit: 10) {
      authors {
        id
        name
        picture
      }
    }
  }
`;

export default function Home() {
  const { data: booksData } = useQuery(GET_BOOKS);
  const { data: authorsData } = useQuery(GET_AUTHORS);

  const books = booksData?.books?.books || [];
  const authors = authorsData?.authors?.authors || [];

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] mt-6">
      <div className="flex flex-col items-center w-full">
        {/* Book Carousel */}
        <h2 className="text-3xl font-bold text-white mb-6 mt-12">Featured Books</h2>
        <div className="w-full max-w-5xl overflow-x-auto pb-4">
          <div className="flex flex-nowrap space-x-16 px-4">
            {books.map((book) => (
              <Link 
                key={book.id} 
                href={`/books/${book.id}`}
                className="min-w-[200px] mx-2 flex-shrink-0 flex flex-col items-center bg-[#18181b] rounded-lg shadow-lg p-6 hover:bg-[#27272a] transition transform hover:scale-105"
              >
                <img src={book.picture} alt={book.title} className="w-32 h-44 object-cover rounded shadow-lg mb-4" />
                <span className="text-white text-center text-base font-semibold truncate w-32">{book.title}</span>
              </Link>
            ))}
            <Link href="/books" className="min-w-[100px] mx-2 flex-shrink-0 flex flex-col items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-lg shadow-lg p-4 transition text-white font-semibold text-sm">
              Browse More
            </Link>
          </div>
        </div>

        {/* Author Carousel */}
        <h2 className="text-3xl font-bold text-white mb-6 mt-16">Featured Authors</h2>
        <div className="w-full max-w-5xl overflow-x-auto pb-4">
          <div className="flex flex-nowrap space-x-16 px-4">
            {authors.map((author) => (
              <Link 
                key={author.id} 
                href={`/authors/${author.id}`}
                className="min-w-[180px] mx-2 flex-shrink-0 flex flex-col items-center bg-[#18181b] rounded-lg shadow-lg p-6 hover:bg-[#27272a] transition transform hover:scale-105"
              >
                <img src={author.picture} alt={author.name} className="w-24 h-24 object-cover rounded-full shadow-lg mb-4" />
                <span className="text-white text-center text-base font-semibold truncate w-32">{author.name}</span>
              </Link>
            ))}
            <Link href="/authors" className="min-w-[80px] mx-2 flex-shrink-0 flex flex-col items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-lg shadow-lg p-4 transition text-white font-semibold text-sm">
              Browse More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
