const express = require('express');
const mongoose = require('mongoose'); 
const app = express();

mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [String]
});

const commentSchema = new Schema({
  user: String,
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
  comment: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const likeSchema = new Schema({
  user: String,
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define mongoose models based on schemas
const Blog = mongoose.model('Blog', blogSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Like = mongoose.model('Like', likeSchema);

// Define routes and controllers for your blog microservice
// For simplicity, I'll provide a basic example for handling blog creation
app.post('/blogs', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
      tags
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
