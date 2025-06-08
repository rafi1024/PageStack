"use client";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $picture: String!) {
    createAuthor(name: $name, picture: $picture) {
      id
      name
      picture
    }
  }
`;

export default function NewAuthorPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    onCompleted: () => router.push("/authors"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuthor({ variables: { name, picture } });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Author</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="border px-2 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Photo URL</label>
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
          {loading ? "Adding..." : "Add Author"}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
} 