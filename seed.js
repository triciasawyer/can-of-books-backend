'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');


async function seed(){
  await mongoose.connect(
    process.env.URL_DB
  )
  .then(()=>console.log('Mongo DB is connected!'))
  .catch(e=>console.log(e));

  await Book.create([{
    title: 'Watchmen',
    description: 'The novel follows a group of disenfranchised superheroes forced into retirement by the Keene Act of 1977 as they attempt to save Earth from itself, while also solving the murder mystery of their peer, The Comedian.',
    status: true
  }]);
  console.log('Book 1!!')

  await Book.create([{
    title: '20,000 Leagues Under The Sea',
    description: 'Captain Nemo and his submarine Nautilus, as seen from the perspective of Professor Pierre Aronnax after he, his servant Conseil, and Canadian whaler Ned Land wash up on their ship. On the Nautilus, the three embark on a journey which has them going all around the world, under the sea.',
    status: true
  }]);
  console.log('Book 2!!')

  await Book.create([{
    title: '1984',
    description: 'A dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of the Party, who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother. Big Brother controls every aspect of peoples lives.',
    status: true
  }]);
  console.log('Book 3!!')

  await Book.create([{
    title: 'Ghost Boy',
    description: 'An autobiography, written by Martin Pistorius, telling his story about how he overcame a life changing illness. Pistorius writes to readers to explain his miraculous life story, and how an unknown illness left him trapped inside his own body at the age of nine.',
    status: true
  }]);
  console.log('Book 3!!')

  console.log('Closing the DB connection for our seed file');
  mongoose.disconnect();
}



seed();