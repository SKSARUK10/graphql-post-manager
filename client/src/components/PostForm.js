import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_POSTS } from "./PostList";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $author: ID!) {
    createPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;

export default function PostForm({ selectedUserId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      setTitle("");
      setContent("");
    },
    onError: (err) => alert(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("Please select a user first");
      return;
    }
    createPost({ variables: { title, content, author: selectedUserId } });
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      {!selectedUserId ? (
        <p className="text-gray-500 text-center">
          👈 Select a user to create a post
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="w-full border p-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Create Post"}
          </button>
        </form>
      )}
    </div>
  );
}
