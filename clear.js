const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URL_DB);

const Book = require('./models/book');

async function clear () {
    try {
        await Book.deleteMany({});
        console.log('Books were burnt...');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

clear();