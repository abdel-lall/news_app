const express = require("express");
const exphbs = require("express-handlebars");

var app = express();
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars',exphbs({
    defaultLayout: "main"
  }));
app.set('view engine', 'handlebars');

require("./routes/routing")(app)

var PORT = process.env.PORT || 3000;


app.listen(PORT,function(){
    console.log("listening on port"+PORT)
})