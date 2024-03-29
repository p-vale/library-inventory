const mongoose = require('mongoose');
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

let AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

AuthorSchema
.virtual('name')
.get(function () {
  let fullname = ''
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name} ${this.family_name}`
  }
  if (!this.first_name || !this.family_name) {
    fullname = ''
  }
  return fullname
})

AuthorSchema
.virtual('url')
.get(function () { return '/catalog/author/' + this._id })

AuthorSchema
.virtual('birth_formatted')
.get(function () {
  if (isNaN(this.date_of_birth)) {return ''}
  return '(' + DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
})

AuthorSchema
.virtual('death_formatted')
.get(function () {
  date = ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) + ')'
  if (isNaN(this.date_of_birth) && isNaN(this.date_of_death)) {
    date = ''
  } else if (isNaN(this.date_of_death)) {
    date = ' - alive)'
  } else if (this.date_of_birth == null && this.date_of_death == null) {
    date = ''
  } else if (this.date_of_death == null) {
    date = ' - alive)'
  }
  return date
})

AuthorSchema.virtual('lifespan')
.get(function () {
  return this.birth_formatted + this.death_formatted
})

AuthorSchema.virtual('birth_form').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate()
})

AuthorSchema.virtual('death_form').get(function() {
  return DateTime.fromJSDate(this.date_of_death).toISODate()
})

module.exports = mongoose.model('Author', AuthorSchema);