var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({ 
    content : {
        type: String,
        required: true
      }, 
 

});
var Note = mongoose.model('Note', noteSchema);

module.exports = Note;