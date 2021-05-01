const hendler = require("./hendler");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: hendler.addBooksHendler,
  },
];
