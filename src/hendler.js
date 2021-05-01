// modules
const { nanoid } = require("nanoid");

// models
const books = require("./books");

const addBooksHendler = (req, hendler) => {
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
    const response = hendler.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = hendler.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
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
    const response = hendler.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
  }

  const response = hendler.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

module.exports = { addBooksHendler };
