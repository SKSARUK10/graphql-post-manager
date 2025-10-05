// src/components/UserList.js
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_POSTS } from "./PostList"; // make sure this query exists

// Fetch users without posts
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function UserList({ onSelectUser }) {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS);
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_POSTS);

  if (usersLoading || postsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-bold mb-2">Users</h2>
      {usersData.users.map((user) => {
        // Count posts for this user
        const userPostsCount = postsData.posts.filter(
          (post) => post.author.id === user.id
        ).length;

        return (
          <div
            key={user.id}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            onClick={() => onSelectUser(user.id)}
          >
            <span>{user.name}</span>
            <span className="text-sm text-gray-500">
              {userPostsCount} posts
            </span>
          </div>
        );
      })}
    </div>
  );
}
