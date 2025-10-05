const Post = require("../../models/post");

const postResolver = {
  Query: {
    posts: async () => await Post.find().populate("author"),

    post: async (_, { id }) => await Post.findById(id).populate("author"),
  },

  Mutation: {
    createPost: async (_, args) => {
      const newPost = new Post(args);
          await newPost.save();
        return await newPost.populate("author");
    },
    updatePost: async (_, { id, ...updateData }) => {
      return await Post.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).populate("author");
    },
    deletePost: async (_, { id }) => {
      return await Post.findByIdAndDelete(id);
    },
  },
};

module.exports = postResolver;
