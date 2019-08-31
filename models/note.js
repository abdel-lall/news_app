var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({ 
    content : {
        type: String,
        required: true
      }, 
      // article: {
      //   type: Schema.Types.ObjectId,
      //   ref: "article"
      // }

});
var Note = mongoose.model('Note', noteSchema);

module.exports = Note;