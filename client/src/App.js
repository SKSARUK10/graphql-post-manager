import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import UserList from "./components/UserList";

export default function App() {
  const [filterUserId, setFilterUserId] = useState(null);

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          GraphQL Posts App
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <PostForm />
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="md:w-1/3">
              <UserList onSelectUser={setFilterUserId} />
            </div>
            <div className="md:w-2/3">
              <PostList filterUserId={filterUserId} />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}
