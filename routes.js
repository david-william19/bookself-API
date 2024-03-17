const bookService = require("./services/booksService");

const routes = [
    // Get all books
    {
        method: "GET",
        path: "/books",
        handler: bookService.getBooks,
    },
    // Get book by id
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: bookService.getBookById,
    },
    // Add book
    {
        method: "POST",
        path: "/books",
        handler: bookService.addBook,
    },
    // Update book
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: bookService.updateBook,
    },
    // Delete book
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: bookService.deleteBook,
    }
];

module.exports = routes;