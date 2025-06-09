"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      picture
      biography
      born_date
    }
  }
`;

export default function AuthorsPage() {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Authors</h1>
      <Link href="/authors/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block hover:bg-blue-600 transition">Add Author</Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-800">Photo</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Biography</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Born Date</th>
              <th className="py-2 px-4 border-b text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.authors.map((author) => (
              <tr key={author.id}>
                <td className="py-2 px-4 border-b">
                  <img src={author.picture} alt={author.name} className="w-14 h-14 object-cover rounded-full shadow" />
                </td>
                <td className="py-2 px-4 border-b text-gray-700">{author.name}</td>
                <td className="py-2 px-4 border-b text-gray-700 max-w-md truncate">{author.biography || '-'}</td>
                <td className="py-2 px-4 border-b text-gray-700">{author.born_date || '-'}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/authors/edit/${author.id}`} className="text-blue-600 mr-4 hover:underline">Edit</Link>
                  <Link href={`/authors/delete/${author.id}`} className="text-red-600 hover:underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 