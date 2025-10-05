const User = require("../../models/user");

const userResolver = {
  Query: {
    users: async (_, { ids }) => {
      if (ids?.length) return await User.find({ _id: { $in: ids } });
      return await User.find();
    },
    user: async (_, { id }) => await User.findById(id),
  },

  Mutation: {
    createUser: async (_, args) => {
      const newUser = new User(args);
      return await newUser.save();
    },
    updateUser: async (_, { id, ...updateData }) => {
      return await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
};

module.exports = userResolver;
