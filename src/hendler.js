// modules
const { nanoid } = require("nanoid");

// models
const books = require("./books");

const addBook = (req, hendler) => {
  const {
    name,
    year,
    author,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    return hendler
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return hendler
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const id = nanoid(16);
  const now = new Date().toISOString();

  books.push({
    id,
    name,
    year,
    author,
    publisher,
    pageCount,
    readPage,
    finished: false,
    reading,
    insertAt: now,
    updatedAt: now,
  });

  const bookAdded = books.filter((book) => book.id === id).length > 0;

  if (!bookAdded) {
    return hendler
      .response({
        status: "error",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
  }

  return hendler
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getAllBooks = () => ({
  status: "success",
  data: {
    books,
  },
});

const getBookById = (request, hendler) => {
  const id = request.params.bookId;
  const book = books.find((book) => book.id == id);

  if (!book) {
    return hendler
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return {
    status: "success",
    data: {
      book,
    },
  };
};

module.exports = { addBook, getAllBooks, getBookById };
