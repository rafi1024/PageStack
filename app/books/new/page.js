"use client";
import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!, $picture: String!) {
    createBook(title: $title, authorId: $authorId, picture: $picture) {
      id
      title
      picture
    }
  }
`;

export default function NewBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [picture, setPicture] = useState("");
  const { data } = useQuery(GET_AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    onCompleted: () => router.push("/books"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook({ variables: { title, authorId, picture } });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            className="border px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Author</label>
          <select
            className="border px-2 py-1 w-full"
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
          <label className="block mb-1">Cover Image URL</label>
          <input
            className="border px-2 py-1 w-full"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
} 