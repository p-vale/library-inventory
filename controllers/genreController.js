const Genre = require('../models/genre')

// all genres
exports.genre_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre list')
}

// detail genre
exports.genre_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`)
}

// create on GET (disp)
exports.genre_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre create GET')
}

// create on POST
exports.genre_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre create POST')
}

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// delete on POST
exports.genre_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete POST')
}

// update on GET (dis)
exports.genre_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update GET')
}

// update on POST
exports.genre_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update POST')
}
