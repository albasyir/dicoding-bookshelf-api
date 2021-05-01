const hendler = require("./hendler");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: hendler.addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: hendler.getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: hendler.getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: hendler.editBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: hendler.deleteBookById,
  },
];
