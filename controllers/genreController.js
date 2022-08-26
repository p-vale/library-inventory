const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')

// all genres
exports.genre_list = (req, res) => {
  Genre.find({}, 'genre')
  .sort({genre : 1})
  .populate('genre')
  .exec(function (err, list_genres) {
    if (err) {return next(err)}
    res.render('genre_list', {
      title: 'Genres List',
      genre_list: list_genres
    })
  })
}

// detail genre
exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      })
    }
  )
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
