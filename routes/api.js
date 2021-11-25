/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const uri = process.env['MONGO_URI'];

module.exports = function (app) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String],
  });
  let Book = mongoose.model('Book', bookSchema);

  console.log('Book');

  app
    .route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{'_id': bookid, 'title': book_title, 'commentcount': num_of_comments },...]
      let books = [];

      Book.find({}, (error, results) => {
        if (!error && results) {
          results.forEach((result) => {
            let book = result.toJSON();
            book['commentcount'] = book.comments.length;
            books.push(book);
          });
          return res.json(books);
        }
      });
    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.json('no title given');
      }

      let addBook = new Book({
        title: title,
        comment: [],
      });

      addBook.save((err, newBook) => {
        if (!err && newBook) {
          res.json(newBook);
        }
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      Book.remove({}, (error, jsonStatus) => {
        if (!error && jsonStatus) {
          return res.json('complete delete successful');
        }
      });
    });

  app
    .route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {'_id': bookid, 'title': book_title, 'comments': [comment,comment,...]}
      Book.findById(bookid, (error, result) => {
        if (!error && result) {
          return res.json(result);
        } else if (!result) {
          return res.json('no book exists');
        }
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      Book.findByIdAndUpdate(
        bookid,
        { $push: { comments: comment } },
        { new: true },
        (error, updatedBook) => {
          if (!error && updatedBook) {
            return res.json(updatedBook);
          } else if (!updatedBook) {
            return res.json('no book exists');
          }
        }
      );
    })

    .delete(function (req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid, (error, deletedBook) => {
        if (!error && deletedBook) {
          return res.json('delete successful');
        } else if (!deletedBook) {
          return res.json('no book exists');
        }
      });
    });
};
