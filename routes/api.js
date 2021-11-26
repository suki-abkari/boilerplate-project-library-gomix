/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
const expect = require("chai").expect;
const MongoClient = require("mongodb");
const ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const uri = process.env["MONGO_URI"];

module.exports = function (app) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String],
  });
  let Book = mongoose.model("Book", bookSchema);
  /**
   * You can send a POST request to /api/books with title as part of the form data to add a book.
   * The returned response will be an object with the title and a unique _id as keys.
   * If title is not included in the request, the returned response should be the string missing required field title.
   */
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{'_id': bookid, 'title': book_title, 'commentcount': num_of_comments },...]
      let books = [];

      Book.find({}, (error, results) => {
        if (!error && results) {
          results.forEach((result) => {
            let book = result.toJSON();
            book["commentcount"] = book.comments.length;
            books.push(book);
          });
          return res.json(books);
        }
      });
    })

    /**
     * You can send a GET request to /api/books and receive a JSON response representing all the books.
     * The JSON response will be an array of objects with each object (book) containing:
     *  title, _id, and commentcount properties.
     */
    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.json("missing required field title");
      }
      let addBook = new Book({
        title: title,
      });

      addBook.save((err, newBook) => {
        if (!err && newBook) {
          res.json(newBook);
        }
      });
    })

    /**
     *You can send a DELETE request to /api/books to delete all books in the database. 
     The returned response will be the string 'complete delete successful if successful.
     */
    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      Book.remove({}, (error, jsonStatus) => {
        if (!error && jsonStatus) {
          return res.json("complete delete successful");
        }
      });
    });

  /**
   * You can send a GET request to /api/books/{_id} to retrieve a single object of a book containing the properties:
   * title, _id, and a comments array (empty array if no comments present).
   * If no book is found, return the string no book exists.
   */
  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {'_id': bookid, 'title': book_title, 'comments': [comment,comment,...]}
      Book.findById(bookid, (error, result) => {
        if (!error && result) {
          return res.json(result);
        } else if (!result) {
          return res.json("no book exists");
        }
      });
    })

    /**
     * You can send a POST request containing comment as the form body data to /api/books/{_id} to add a comment to a book.
     * The returned response will be the books object similar to GET /api/books/{_id} request in an earlier test.
     * If comment is not included in the request, return the string missing required field comment.
     * If no book is found, return the string no book exists.
     */
     .post(function(req, res, next) {
      connectToDb()
        .then((client) =>  {
          var db = client.db('personal-library');
          db.collection('books').findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $push: { comments: req.body.comment } },
            { returnOriginal: false }
          )
            .then((doc) => (
              doc.value === null ? res.send('no book exists') : res.json(doc.value)
            ))
            .catch((err) => Promise.reject(err));
        })
        .catch(next);
    })

    /**
     * You can send a DELETE request to /api/books/{_id} to delete a book from the collection.
     * The returned response will be the string delete successful if successful.
     * If no book is found, return the string no book exists.
     */
    .delete(function (req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid, (err, deletedBook) => {
        if (!err && deletedBook) {
          return res.json("delete successful");
        } else if (!deletedBook) {
          return res.json("no book exists");
        }
      });
    });
};
