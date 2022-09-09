const express = require('express')
const router = express.Router()

const book_controller = require('../controllers/bookController')
const author_controller = require('../controllers/authorController')
const genre_controller = require('../controllers/genreController')
const book_instance_controller = require('../controllers/bookinstanceController')

router.get('/', book_controller.index)

// BOOK ROUTES
// create book GET
router.get('/book/create', book_controller.book_create_get)

// create book POST
router.post('/book/create', book_controller.book_create_post)

// delete book GET
router.get('/book/:id/delete', book_controller.book_delete_get)

// delete book POST
router.post('/book/:id/delete', book_controller.book_delete_post)

// update book GET
router.get('/book/:id/update', book_controller.book_update_get)

// update book POST
router.post('/book/:id/update', book_controller.book_update_post)

// one book GET
router.get('/book/:id', book_controller.book_detail)

// all book GET
router.get('/books', book_controller.book_list)

// AUTHOR ROUTES
// create author GET 
router.get('/author/create', author_controller.author_create_get)

// create author POST
router.post('/author/create', author_controller.author_create_post)

// delete author GET
router.get('/author/:id/delete', author_controller.author_delete_get)

// delete author POST
router.post('/author/:id/delete', author_controller.author_delete_post)

// update author GET
router.get('/author/:id/update', author_controller.author_update_get)

// update author POST
router.post('/author/:id/update', author_controller.author_update_post)

// one author GET
router.get('/author/:id', author_controller.author_detail)

// all author GET
router.get('/authors', author_controller.author_list)

// GENRE
// create genre GET
router.get('/genre/create', genre_controller.genre_create_get)

// create genre POST
router.post('/genre/create', genre_controller.genre_create_post)

// delete genre GET
router.get('/genre/:id/delete', genre_controller.genre_delete_get)

// delete genre POST
router.post('/genre/:id/delete', genre_controller.genre_delete_post)

// one genre GET
router.get('/genre/:id', genre_controller.genre_detail)

// all genre GET
router.get('/genres', genre_controller.genre_list)

// BOOKINSTANCE
// create instance GET
// NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// create instance POST
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// delete instance GET
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// delete instance POST
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// upadate instance GET
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// upadate instance POST
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// one instance GET
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// all instance GET
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;