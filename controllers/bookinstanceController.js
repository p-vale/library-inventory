const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')
const bp = require('body-parser')
const { body, validationResult } = require('express-validator')

// all instances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) return next (err)
      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances
      })
    })
}

// detail instance
exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) return next(err)
      if (bookinstance == null) {
        const err = new Error('Book copy not found')
        err.status = 404
        return next(err)
      }
      res.render('bookinstance_detail', {
        title: `Copy: ${bookinstance.book.title}`, 
        bookinstance
      })
    })
}

// create on GET (disp)
exports.bookinstance_create_get = (req, res, next) => {
  Book.find({}, 'title')
    .exec((err, books) => {
      if (err) return next(err)
      res.render('bookinstance_form', {
        title: 'Create bookinstance',
        book_list: books
      })
    })
}

// create on POST
exports.bookinstance_create_post = [
  bp.json(),
  bp.urlencoded({ extended: false }),
  body('book', 'Book must be specified')
    .trim()
    .isLength({min: 1})
    .escape(),
  body('status')
    .escape(),
  body('due back', 'invalid date')
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req)
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })
    if (!errors.isEmpty()) {
      Book.find({}, 'title')
        .exec(function (err, books) {
          if (err) {return next(err)}
          res.render('bookinstance_form', {
            title: 'Create bookinstance',
            book_list: books,
            selected_book: bookinstance.book._id,
            errors: errors.array(),
            bookinstance,
          })
        })
      return
    }
    bookinstance.save((err) => {
      if (err) return next(err)
      res.redirect(bookinstance.url)
    })
  }
]

// delete on GET (disp)
exports.bookinstance_delete_get = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) return next(err)
      if (bookinstance == null) {
          res.redirect('/catalog/bookinstances')
      }
      res.render('bookinstance_delete', { 
        title: 'Delete BookInstance', 
        bookinstance:  bookinstance
      })
  })
}

// delete on POST
exports.bookinstance_delete_post = [
  bp.json(),
  bp.urlencoded({ extended: false }),
  (req, res, next) => {
    BookInstance.findByIdAndRemove(
      req.body.id, 
      function deleteBookInstance(err) {
        if (err) return next(err)
        res.redirect('/catalog/bookinstances')
      }
    )
  }
]

// update on GET (disp)
exports.bookinstance_update_get = (req, res, next) => {
  async.parallel(
    {
      bookinstance(callback) {
          BookInstance.findById(req.params.id)
            .populate('book')
            .exec(callback)
      },
      books(callback) {Book.find(callback)},
    }, 
    (err, results) => {
      if (err) return next(err)
      if (results.bookinstance == null) {
          const err = new Error('Book copy not found')  
          err.status = 404  
          return next(err)  
      }
      res.render('bookinstance_form', { 
        title: 'Update  BookInstance', 
        book_list : results.books, 
        selected_book : results.bookinstance.book._id, 
        bookinstance: results.bookinstance 
      }) 
    }
  )  
} 

// update on POST
exports.bookinstance_update_post = [
  bp.json(),
  bp.urlencoded({ extended: false }),
  body("book", "Book reference needed.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("imprint", "Imprint must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status", "Status must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("due_back", "Due back date is optional.")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id, // required, or a new ID will be assigned
    })
    if (!errors.isEmpty()) {
      async.parallel(
        {
          book(callback) { Book.find(callback)}
        },
        (err, results) => {
          if (err) return next(err)
          res.render('bookinstance_form', {
            title: 'Update book copy',
            book: results.book,
            bookinstance,
            errors: errors.array()
          })
        }
      )
      return
    }
    BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {},
      (err, theinstance) => {
        if (err) return next(err)
        res.redirect(theinstance.url)
      })
  }
]