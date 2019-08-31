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
    .then(function(articles) { 
        res.render("articlenotes",{articles})
       
      })
      .catch(function(err) {
        // res.json(err);
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

    console.log(req.body)

    
})


}