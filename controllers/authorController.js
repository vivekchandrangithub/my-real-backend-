// controllers/authorController.js
const Author = require('../models/Author');

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('books');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an author by ID
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new author
const createAuthor = async (req, res) => {
  const { name, bio } = req.body;

  try {
    const newAuthor = new Author({ name, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an author
const updateAuthor = async (req, res) => {
  const { name, bio } = req.body;

  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    author.name = name;
    author.bio = bio;

    await author.save();
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an author
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    await author.remove();
    res.json({ message: 'Author removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
