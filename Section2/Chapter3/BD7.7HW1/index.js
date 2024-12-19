require('./db/db.connect');

const Author = require('./models/author.model');
const Book = require("./models/book.model")
 
const authorData = {
    name: "Sanjeev Singh",
    email: "sanjeev@gmail.com"
}

// function to add author in db
const addAuthor = async ()=>{
    try {
        const newAuthor = new Author(authorData)
        await newAuthor.save();
        console.log(newAuthor)
    } catch ({error}) {
        throw error
    }
}

// addAuthor()

const bookData = {
    title: "The Secret",
    genre: "Fiction",
    author: '6763f33ac28e97c8144911b3'
}

// function to add new book data in db
const addBook = async  ()=>{
    try {
        const newBook = new Book(bookData)
        await newBook.save();
        console.log(newBook)
    } catch (error) {
        throw error
    }
}
// addBook()

// Get all books with author details
const getAllBook = async ()=>{
    try {
        const allBooks = await Book.find().populate("author")
        console.log(allBooks)
    } catch (error) {
        throw error
    }
}
getAllBook()
