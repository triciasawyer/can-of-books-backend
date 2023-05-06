'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.URL_DB
)
    .then(() => console.log('Mongo DB is connected!'))
    .catch(e => console.log(e));

const Book = require('./models/book.js');
const PORT = process.env.PORT || 5005;


app.get('/', (request, response) => response.status(200).send('Welcome!'));
app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', updateBooks);



async function getBooks(request, response, next) {
    try {
        let results = await Book.find();
        response.status(200).send(results);
    } catch (error) {
        next(error);
    }
}


async function postBooks(request, response, next){
    // console.log("heyuuu", request.body);
    try {
      let createBook = await Book.create(request.body);
      response.status(200).send(createBook);
    } catch (error) {
      next(error);
    }
  }


  async function deleteBooks(request, response, next){
    console.log(request.params.id);
    try {
      
      let id = request.params.id;
      await Book.findByIdAndDelete(id);
      response.status(200).send('Book was deleted.');
    } catch (error) {
      next(error);
    }
  }


  async function updateBooks(request, response, next){
    // console.log('id', request.params.id);
    
    let id = request.params.id;
    let bookData = request.body;
    // console.log(id, bookData);
    try {
      let updatedBook = await Book.findByIdAndUpdate(id, bookData, {
        new: true,
        overwrite: true
      });
      console.log('UPDATEDDD BOOK',updatedBook);
      response.status(200).send('ok right now');
    } catch (error) {
      next(error);
    }


  
  }



app.get('*', (request, response) => {
    response.status(404).send('Not available');
});

app.use((error, request, res, next) => {
    res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));