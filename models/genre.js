const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let GenreSchema = new Schema(
  {
    genre: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
  }
);

GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);