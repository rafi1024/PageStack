"use client";
import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!, $picture: String!, $description: String, $published_date: String) {
    createBook(title: $title, authorId: $authorId, picture: $picture, description: $description, published_date: $published_date) {
      id
      title
      picture
      description
      published_date
    }
  }
`;

export default function NewBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const { data } = useQuery(GET_AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    onCompleted: () => router.push("/books"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook({ 
      variables: { 
        title, 
        authorId, 
        picture,
        description: description || null,
        published_date: publishedDate || null
      } 
    });
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          >
            <option value="">Select an author</option>
            {data?.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
          <Link 
            href="/books" 
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