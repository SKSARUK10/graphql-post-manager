require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const connectDB = require("./db/conn"); // Ensure DB connection is established

// Import merged typeDefs & resolvers
const { typeDefs, resolvers } = require("./graphql");

// Server
async function startServer() {
  const app = express();

  // Connect to MongoDB
 
  // Create Apollo Server with new structure
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen({ port: 4000 }, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
}

startServer();
