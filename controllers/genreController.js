const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const bp = require('body-parser')
const { body, validationResult } = require('express-validator')

// all genres
exports.genre_list = (req, res, next) => {
  Genre.find({}, 'genre')
  .sort({name : 1})
  .populate('name')
  .exec(function (err, list_genres) {
    if (err) return next(err)
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
        Genre.findById(req.params.id).exec(callback)
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) return next(err)
      if (results.genre == null) {
        const err = new Error('Genre not found')
        err.status = 404
        return next(err)
      }
      res.render('genre_detail', {
        title: 'Genre detail',
        genre: results.genre,
        genre_books: results.genre_books,
      })
    }
  )
}

// create on GET (disp)
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', {title: 'greate Genre'})
}

// create on POST
exports.genre_create_post = [
  bp.json(),
  bp.urlencoded({ extended: false }),
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  function (req, res, next) {
    const errors = validationResult(req)
    console.log(req.body)
    console.log(errors)
    const genre = new Genre({ name: req.body.name })

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create genre',
        genre,
        errors: errors.array(),
      })
      return
    } else {
      Genre.findOne({ name: req.body.name })
        .exec((err, found_genre) => {
          if (err) return next(err)
          if (found_genre) {
            res.redirect(found_genre.url)
          } else {
            genre.save((err) => {
              if (err) return next(err)
              res.redirect(genre.url)
            })
        }
      })
    }
  }
]

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
          Genre.findById(req.params.id).exec(callback)
      },
      genre_books(callback) {
          Book.find({ 'genre': req.params.id }).exec(callback)
      },
    }, 
    (err, results) => {
      if (err) return next(err)
      if (results.genre == null) {
        res.redirect('/catalog/genres')
      }
      res.render('genre_delete', { 
        title: 'Delete genre', 
        genre: results.genre, 
        genre_books: results.genre_books 
      })
    }
  )
}


// delete on POST
exports.genre_delete_post = [
  bp.json(),
  bp.urlencoded({ extended: false }),
  (req, res, next) => {
    async.parallel(
      {
        genre(callback) {
          Genre.findById(req.params.id).exec(callback)
        },
        genre_books(callback) {
          Book.find({ 'genre': req.params.id }).exec(callback)
        },
      }, 
      (err, results) => {
        if (err) return next(err)
        if (results.genre_books.length > 0) {
          res.render('genre_delete', { 
            title: 'Delete genre', 
            genre: results.genre, 
            genre_books: results.genre_books 
          })
          return
        } else {
          Genre.findByIdAndRemove(req.body.id, function deleteGenre(err) {
            if (err) return next(err)
            res.redirect('/catalog/genres')
          })
        }
      }
    )
  }
]