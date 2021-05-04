// modules
const { nanoid } = require("nanoid");

// models
const books = require("./books");

const addBook = (req, hendler) => {
  const {
    name,
    year,
    author,
    summary,
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
    summary,
    publisher,
    pageCount,
    readPage,
    finished: false,
    reading,
    insertedAt: now,
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

const getAllBooks = (request, hendler) => {
  const { name, reading, finished } = request.query;

  let booksThatClientNeed = books;

  if (Object.values(request.query).length > 0) {
    booksThatClientNeed = books.filter((book) => {
      if (name) {
        const bookNameLower = String(book.name).toLowerCase();
        const filterNameLower = String(name).toLowerCase();
        if (bookNameLower.includes(filterNameLower)) {
          return false;
        }
      }

      if (reading && Boolean(book.reading) != reading) {
        return false;
      }

      if (finished && Boolean(book.finished) != finished) {
        return false;
      }

      return true;
    });
  }

  booksThatClientNeed = booksThatClientNeed.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: "success",
    data: {
      books: booksThatClientNeed,
    },
  };
};

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

const editBookById = (request, hendler) => {
  const id = request.params.bookId;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

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

  const index = books.findIndex((book) => book.id === id);

  if (index < 0) {
    return hendler
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(400);
  }

  const updatedAt = new Date().toISOString();

  books[index] = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  return {
    status: "success",
    message: "Buku berhasil diperbarui",
  };
};

const deleteBookById = (request, hendler) => {
  const id = request.params.bookId;

  const index = books.findIndex((book) => book.id === id);

  if (index < 0) {
    return hendler
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(400);
  }

  books.splice(index, 1);

  return {
    status: "success",
    message: "Buku berhasil dihapus",
  };
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
