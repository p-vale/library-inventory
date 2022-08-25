const Book = require('../models/book')

exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page')
}

// all books
exports.book_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Book list');
};

// detail book
exports.book_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
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
