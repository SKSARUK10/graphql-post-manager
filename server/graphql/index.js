const { mergeTypeDefs } = require("@graphql-tools/merge");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typeDefsArray = loadFilesSync(__dirname + "/typeDefs", {
  extensions: ["gql"],
});
const resolversArray = loadFilesSync(__dirname + "/resolvers");

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

module.exports = { typeDefs, resolvers };
