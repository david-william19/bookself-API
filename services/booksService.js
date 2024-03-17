const { nanoid } = require("nanoid");
const Books = require("../databases/books");


const getBooks = (request, h) => {
    try {
        const { name, reading, finished } = request.query;

        let filteredBooks = Books; // Create a copy of the Books array

        if (name !== undefined) {
            filteredBooks = filteredBooks.filter((book) => {
                const bookName = book.name.toLowerCase();
                return bookName.includes(name.toLowerCase());
            });

            return h.response(
                {
                    status: "success",
                    data: {
                        books: filteredBooks.map((book) => ({
                            id: book.id,
                            name: book.name,
                            publisher: book.publisher,
                        })),
                    },
                }
            )
        }

        if (reading !== undefined) {
            filteredBooks = filteredBooks.filter((book) => book.reading === (reading === "1"));
            return h.response({
                status: "success",
                data: {
                    books: filteredBooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            })
        }

        if (finished !== undefined) {
            filteredBooks = filteredBooks.filter((book) => book.finished === (finished === "1"));
            return h.response({
                status: "success",
                data: {
                    books: filteredBooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            })
        }

        return h.response({
            status: "success",
            data: {
                books: filteredBooks.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        }).code(200);
    } catch (err) {
        return h.response({
            status: "fail",
            message: err.message,
        }).code(500);
    }
};

const getBookById = (request, h) => {
    try {
        const { bookId } = request.params;

        const findBook = Books.find((book) => book.id === bookId);

        if (findBook === undefined) {
            return h.response({
                status: "fail",
                message: "Buku tidak ditemukan"
            }).code(404);
        }

        return {
            status: "success",
            data: {
                book: findBook
            },
        }
    }
    catch (err) {
        return h.response({
            status: "fail",
            message: err.message,
        }).code(500);
    }
}

const addBook = (request, h) => {
    try {
        const bookData = request.payload;
        const id = nanoid(16);
        const dateNow = new Date().toISOString();

        if (bookData.name === undefined) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400);
        }

        if (bookData.readPage > bookData.pageCount) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }

        const createData = {
            id,
            ...bookData,
            finished: bookData.readPage === bookData.pageCount,
            insertedAt: dateNow,
            updatedAt: dateNow,
        }

        Books.push(createData);

        return h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id
            }}).code(201);
        
    }
    catch (err) {
        return h.response({
            status: "fail",
            message: err.message,
        }).code(500);
    }
}

const updateBook = (request, h) => {
    try {
        const { bookId } = request.params;
        const bookData = request.payload;
        const updatedAt = new Date().toISOString();

        const index = Books.findIndex((book) => book.id === bookId);

        if (index === -1) {
            return h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan"
            }).code(404);
        }

        if(bookData.name === undefined) {
            return h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku"
            }).code(400);
        }

        if (bookData.readPage > bookData.pageCount) {
            return h.response({
                status: "fail",
                message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }

        // if the readPage is equal to pageCount, then the book is finished
        if (bookData.pageCount === bookData.readPage) {
            Books[index] = {
                ...Books[index],
                ...bookData,
                finished: true,
                updatedAt,
            }
        }

        // if the readPage is less than pageCount, then the book is not finished
        Books[index] = {
            ...Books[index],
            ...bookData,
            updatedAt,
        }


        // return some response if the book is successfully updated
        return {
            status: "success",
            message: "Buku berhasil diperbarui"
        }
    }
    catch (err) {
        return h.response({
            status: "fail",
            message: err.message,
        }).code(500);
    }
}

const deleteBook = (request, h) => {
    try {
        const { bookId } = request.params;
        const bookIndex = Books.findIndex((book) => book.id === bookId);

        if (bookId === undefined || bookIndex === -1) {
            return h.response({
                status: "fail",
                message: "Buku gagal dihapus. Id tidak ditemukan"
            }).code(404);
        }

        Books.splice(bookIndex, 1);
        return {
            status: "success",
            message: "Buku berhasil dihapus"
        }
    }
    catch (err) {
        console.log(err);
        return h.response({
            status: "fail",
            message: err.message,
        }).code(500);
    }
}


module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};