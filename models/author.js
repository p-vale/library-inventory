const mongoose = require('mongoose');

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
.get(() => {
  let fullname = ''; // exception: author does not have either a family name or first name
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

AuthorSchema.virtual('lifespan').get(() => {
  let lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string;
});

AuthorSchema
.virtual('url')
.get(() => {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);