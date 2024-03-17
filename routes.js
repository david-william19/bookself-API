const bookService = require("./services/booksService");

const routes = [
    {
        method: "GET",
        path: "/books",
        handler: bookService.getBooks,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: bookService.getBookById,
    },
    {
        method: "POST",
        path: "/books",
        handler: bookService.addBook,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: bookService.updateBook,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: bookService.deleteBook,
    }
]

module.exports = routes;