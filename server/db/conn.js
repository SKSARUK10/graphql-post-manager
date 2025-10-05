const mongoose = require("mongoose");
const mongoUrl = process.env.Mongo_Url;
// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
      useNewUrlParser: true,  
      useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;