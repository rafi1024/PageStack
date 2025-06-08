"use client";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      picture
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      picture
    }
  }
`;

export default function Home() {
  const { data: booksData } = useQuery(GET_BOOKS);
  const { data: authorsData } = useQuery(GET_AUTHORS);

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] mt-6">
      <div className="flex flex-col items-center w-full">
        {/* Book Carousel */}
        <h2 className="text-2xl font-bold text-white mb-2 mt-8">Featured Books</h2>
        <div className="w-full max-w-3xl overflow-x-auto pb-2">
          <div className="flex flex-nowrap space-x-12">
            {booksData?.books?.map((book) => (
              <div key={book.id} className="min-w-[140px] mx-2 flex-shrink-0 flex flex-col items-center bg-[#18181b] rounded-lg shadow p-4">
                <img src={book.picture} alt={book.title} className="w-20 h-28 object-cover rounded mb-2" />
                <span className="text-white text-center text-sm font-semibold truncate w-20">{book.title}</span>
              </div>
            ))}
            <Link href="/books" className="min-w-[70px] mx-2 flex-shrink-0 flex flex-col items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-lg shadow p-1 transition text-white font-semibold text-xs">
              Browse More
            </Link>
          </div>
        </div>

        {/* Author Carousel */}
        <h2 className="text-2xl font-bold text-white mb-2 mt-10">Featured Authors</h2>
        <div className="w-full max-w-3xl overflow-x-auto pb-2">
          <div className="flex flex-nowrap space-x-12">
            {authorsData?.authors?.map((author) => (
              <div key={author.id} className="min-w-[120px] mx-2 flex-shrink-0 flex flex-col items-center bg-[#18181b] rounded-lg shadow p-4">
                <img src={author.picture} alt={author.name} className="w-16 h-16 object-cover rounded-full mb-2" />
                <span className="text-white text-center text-sm font-semibold truncate w-20">{author.name}</span>
              </div>
            ))}
            <Link href="/authors" className="min-w-[60px] mx-2 flex-shrink-0 flex flex-col items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-lg shadow p-1 transition text-white font-semibold text-xs">
              Browse More
            </Link>
          </div>
        </div>

        
      </div>
    </main>
  );
}
