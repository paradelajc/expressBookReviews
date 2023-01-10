const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({'username': username, 'password': password});
      return res.status(200).json({message: "User successfully registred. Now you can login"})
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  // return res.status(300).json({message: "Yet to be implemented"});
  return res.status(404).json({message: "Unable to register user."})
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   return res.send(JSON.stringify(books, null, 4));
// });

public_users.get('/', (req, res) => {
  let bookPromise = new Promise((resolve, reject) => {
    resolve(books)
  })
  bookPromise
    .then(data => {
    return res.send(data);
    })
    .catch(err => {
      console.error(err)
    })
})

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   res.send(books[isbn])
//   // return res.status(300).json({message: "Yet to be implemented"});
//  });

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let bookPromise = new Promise((resolve, reject) => {
    resolve(books)
  })
  bookPromise
    .then(data => {
      if (isbn in Object.keys(data)) {
        res.send(data[isbn])
      }
      else {
        res.send("isbn not found")
      }
    })
    .catch(err => {
      console.error(err)
    })
});

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   byAuthor = Object.values(books).filter(book => book['author'] === author);
//   res.send(byAuthor)
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let bookPromise = new Promise((resolve, reject) => {
    resolve(books)
  })
  bookPromise.then(data => {
    byAuthor = Object.values(data).filter(book => book['author'] === author);
    res.send(byAuthor)
  })

});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   byTitle = Object.values(books).filter(book => book['title'] === title);
//   res.send(byTitle)
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let bookPromise = new Promise((resolve, reject) => {
    resolve(books)
  })
  bookPromise.then(data => {
    byTitle = Object.values(data).filter(book => book['title'] === title);
    res.send(byTitle)
  })
});

//  Get book review
// public_users.get('/review/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   res.send(books[isbn]['reviews'])
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let bookPromise = new Promise((resolve, reject) => resolve(books))
  bookPromise.then(data => {
    res.send(data[isbn]['reviews'])
  })

});

module.exports.general = public_users;
