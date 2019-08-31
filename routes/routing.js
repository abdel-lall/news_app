var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models")


module.exports = function (app) {

    var MONGODB_URI = process.env.MONGODB_URI || " mongodb://localhost/mongoHeadlines";
    mongoose.connect(MONGODB_URI,{ useNewUrlParser: true }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("ERROR! ", err);
    });



    app.get("/", function (req, res) {

        res.render("articals");


    })
    app.put("/", function (req, res) {
        console.log(req.body)

        var data = req.body
        db.Article.create(data)
            .then(function (artdb) {
                res.sendStatus(200);
            })
            .catch(function (err) {
                console.log(err);
            });
    })
    app.post("/", function (req, res) {
        axios.get('https://chicago.suntimes.com/news')
            .then(function (response) {
                var scrapeddata = [];
                const $ = cheerio.load(response.data);
                // var news = $(".c-compact-river").html()
                $(".c-compact-river__entry").each(function (i, element) {
                    // Save the text and href of each link enclosed in the current element
                    var title = $(element).find(".c-entry-box--compact__title").text();
                    var image = $(element).find("noscript").html();
                    var imgurl = $(image).attr("src");
                    var content = $(element).find(".p-dek.c-entry-box--compact__dek").text();
                    var urlanch = $(element).find(".c-entry-box--compact__title").html();
                    var url = $(urlanch).attr("href");
                    var article = {
                        title,
                        content,
                        imgurl,
                        url
                    }
                    scrapeddata.push(article);
                })

                res.json({ scrapeddata });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })
app.get("/savedarticales",function(req,res){
    db.Article.find({})
    .populate("note")
    .then(function(articles) { 
        
       
        res.render("articlenotes",{articles})
        
       
      })
      .catch(function(err) {
        console.log(err)
      });
    
})


app.delete("/savedarticales",function(req,res){

    var id = req.body.id;
    db.Article.deleteOne({ _id: id })
    .then(function(){
        res.sendStatus(200)
    })
    .catch(function (err) {
        console.log(err);
    });
    
})
app.post("/savedarticales",function(req,res){

    
    db.Note.create({content: req.body.content})
    .then(function(ntdb) {
        noteid =  ntdb._id
      db.Article.findById({ _id: req.body.id },function(err,artdb){
            if (!err) {
              artdb.note.push(ntdb);
              artdb.save(function (err) {
                if (!err) {
                    res.sendStatus(200)
                }
              });
            }
          });
      })

})
app.put("/savedarticales",function(req,res){    
    var idArticle = req.body.idArticle
    var idNote = req.body.idNote
    // console.log(req.body)
      db.Article.findById( idArticle , function (err, article) {
        if (!err) {
            // article.findByIdAndRemove(note._id, function(doc) {



            for(i=0;i<article.note.length;i++){
                if(article.note[i] == idNote){
                    article.note.splice(i, 1);
                    article.save(function (err) {
                 if(err) console.log(err)
                });
                }
                
            }
            db.Note.findByIdAndRemove(idNote, function(notes) {
                res.sendStatus(200);   
            })
            
        }
      });    
})

}