var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);


module.exports = function (app) {

    app.get("/", function (req, res) {

        res.render("articals");
        
           
    })
    app.post("/",function(req,res){
        axios.get('https://chicago.suntimes.com/news')
            .then(function (response) {
                var scrapeddata = [];
                const $ = cheerio.load(response.data);
                // var news = $(".c-compact-river").html()
                $(".c-compact-river__entry").each(function(i, element) {
                    // Save the text and href of each link enclosed in the current element
                    var title = $(element).find(".c-entry-box--compact__title").text();
                    var image = $(element).find("noscript").html();
                    var imgurl = $(image).attr("src");
                    var content = $(element).find(".p-dek.c-entry-box--compact__dek").text();
                    var urlanch = $(element).find(".c-entry-box--compact__title").html();
                    var url = $(urlanch).attr("href");
                    var article={
                        title,
                        content,
                        imgurl,
                        url
                    }
                    scrapeddata.push(article);
                })
               
               res.json({scrapeddata});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })


}