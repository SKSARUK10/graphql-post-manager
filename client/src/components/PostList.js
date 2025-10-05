import { useQuery, gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
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

export default function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p className="text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="space-y-4">
      {data.posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
          <p className="mt-2 text-sm text-gray-500">
            Created by:{" "}
            <span className="font-semibold">{post.author.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
