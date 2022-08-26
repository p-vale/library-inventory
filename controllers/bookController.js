const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')

const async = require('async')
const { populate } = require('../models/book')

exports.index = (req, res) => {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback)
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback)
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments({ status:'Available' }, callback)
      },
      author_count(callback) {
        Author.countDocuments({}, callback)
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback)
      },
    },
    (err, results) => {
      res.render('index', { 
        title: 'Local Library Home', 
        error: err, 
        data: results 
      })
    }
  )
}

// all books
exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .sort({title : 1})
    .populate('author')
    .exec(function (err, list_books) {
      if (err) {return next(err)}
      res.render('book_list', {
        title: 'Book List',
        book_list: list_books
      })
    })
}

// detail book
exports.book_detail = (req, res, next) => {
  async.parallel({
    book(callback) {
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback)
    },
    book_instance(callback) {
      BookInstance.find({book: req.params.id}).exec(callback)
    },
  },
  (err, results) => {
    if (err) { return next(err) }
    if (results.book == null) {
      const err = new Error('Book not found')
      err.status = 404
      return next(err)
    }
    res.render('book_detail', {
      title: results.book.title,
      book: results.book,
      book_instances: results.book_instance
    })
  })
}

// create on GET (dis)
exports.book_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create GET')
}

// create on POST
exports.book_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create POST')
}

// delete on GET (dis)
exports.book_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete GET')
}

// delete on POST
exports.book_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

// update on GET (dis)
exports.book_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update GET')
}

// update on POST
exports.book_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update POST')
}
