const BookInstance = require('../models/bookinstance')

// all instances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next (err)}
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
      if (err) { return next(err) }
      if (bookinstance == null) {
        const err = new Error('Book copy not found')
        err.status = 404
        return next(err)
      }
      res.render('bookinstance_detail', {
        title: `Copy: ${bookinstance.book.title}`, bookinstance
      })
    })
}

// create on GET (disp)
exports.bookinstance_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
}

// create on POST
exports.bookinstance_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
}

// delete on GET (disp)
exports.bookinstance_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
}

// delete on POST
exports.bookinstance_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
}

// update on GET (disp)
exports.bookinstance_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
}

// update on POST
exports.bookinstance_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
}
