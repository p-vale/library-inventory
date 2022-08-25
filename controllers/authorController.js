const Author = require('../models/author')

// all authors
exports.author_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Author list')
}

// detail page
exports.author_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Author detail - ${req.params.id}`)
}

// create form on GET
exports.author_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create GET')
}

// create on POST
exports.author_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create POST')
};

// delete on GET
exports.author_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete GET')
};

// delete on POST
exports.author_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete POST')
};

// update on GET
exports.author_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update GET')
};

// update on POST
exports.author_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update POST')
}
