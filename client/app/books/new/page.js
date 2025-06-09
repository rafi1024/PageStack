"use client";
import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $picture: String!, $description: String, $published_date: String, $authorId: ID!) {
    createBook(title: $title, picture: $picture, description: $description, published_date: $published_date, authorId: $authorId) {
      id
      title
    }
  }
`;

export default function NewBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { data: authorsData } = useQuery(GET_AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      router.push("/books");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook({
        variables: {
          title,
          picture,
          description,
          published_date: publishedDate,
          authorId,
        },
      });
    } catch (err) {
      console.error("Error creating book:", err);
    }
  };

  const authors = authorsData?.authors?.authors || [];

  return (
    <div className="container mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-700"
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            id="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-700"
            placeholder="Enter cover image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-700"
            placeholder="Enter book description"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700 mb-2">
            Published Date
          </label>
          <input
            type="date"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <select
            id="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-700"
            required
          >
            <option value="" className="text-gray-700">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id} className="text-gray-900">
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Book"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 