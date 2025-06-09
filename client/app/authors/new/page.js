"use client";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $picture: String!, $biography: String, $born_date: String) {
    createAuthor(name: $name, picture: $picture, biography: $biography, born_date: $born_date) {
      id
      name
      picture
      biography
      born_date
    }
  }
`;

export default function NewAuthorPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    onCompleted: () => router.push("/authors"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuthor({ 
      variables: { 
        name, 
        picture,
        biography: biography || null,
        born_date: bornDate || null
      } 
    });
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Author</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Enter author biography..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Born Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Author"}
          </button>
          <Link 
            href="/authors" 
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Cancel
          </Link>
        </div>

        {error && (
          <p className="text-red-500 mt-2">Error: {error.message}</p>
        )}
      </form>
    </div>
  );
} 