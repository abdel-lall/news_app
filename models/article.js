
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({ 
    title: {
        type: String,
        required: true
      }, 
    content: {
        type: String,
        required: true
      },
    url: {
        type: String,
        required: true
      },
    imgurl : {
        type: String,
        required: true
      },
      note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
});
var Article = mongoose.model('article', articleSchema);

module.exports = Article;