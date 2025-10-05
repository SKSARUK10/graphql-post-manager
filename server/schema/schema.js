const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const User = require("../models/user"); // Mongoose model

// --- Types ---
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
    age: { type: GraphQLString }, // you can also use GraphQLInt if you want
  }),
});

// --- Root Query ---
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: { ids: { type: new GraphQLList(GraphQLID) } },
      resolve: async (_, args) => {
        if (args.ids?.length) {
          return await User.find({ _id: { $in: args.ids } });
        }
        return await User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        return await User.findById(args.id);
      },
    },
  },
});

// --- Mutations ---
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: GraphQLString },
        age: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const newUser = new User(args);
        await newUser.save();

        console.log("✅ New user added:", newUser);
        const total = await User.countDocuments();
        console.log("Total count:", total);

        return newUser;
      },
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        bio: { type: GraphQLString },
        age: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const updatedUser = await User.findByIdAndUpdate(
          args.id,
          { $set: args },
          { new: true } // return updated doc
        );
        if (!updatedUser) {
          throw new Error(`User with ID ${args.id} not found`);
        }

        console.log("✏️ User updated:", updatedUser);
        return updatedUser;
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const deletedUser = await User.findByIdAndDelete(args.id);
        if (!deletedUser) {
          throw new Error(`User with ID ${args.id} not found`);
        }

        console.log("🗑️ User deleted:", deletedUser);
        const total = await User.countDocuments();
        console.log("Total count:", total);

        return deletedUser;
      },
    },
  },
});

// --- Export Schema ---
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
