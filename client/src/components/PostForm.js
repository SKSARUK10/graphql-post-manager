import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_POSTS } from "./PostList";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content }) {
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

export default function PostForm() {
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
    createPost({ variables: { title, content } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow space-y-4"
    >
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
  );
}
