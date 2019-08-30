$("#scrapebtn").on("click",function(e){
    e.preventDefault();
    $.post( "/", function( data ) {
        $("#noart").hide();
        $("#noart2").hide();
        $("#artctntitle").show();
       for(i=0;i<data.scrapeddata.length;i++){
        var title = data.scrapeddata[i].title;
        var content = data.scrapeddata[i].content;
        var imgurl = data.scrapeddata[i].imgurl;
        var url = data.scrapeddata[i].url;
        article = "<div class='row articleRow' ><div class='col-4'><img src="+imgurl+" alt='article image' id= 'articleimg' class='img-thumbnail'></div><div class='col-8'><h2 id='articletitle'><a target='_blank' href="+url+" id='arturl'>"+title+"</a> </h2><p id='articlebody'>"+content+"</p><button class='btn btn-outline-success my-2 my-sm-0 btnscls' type='submit' id='savebtn'>Save article</button></div></div>"
         $("#artcontainer").append(article);
         $(".btn.btn-outline-success.my-2.my-sm-0.btnscls").on("click",function(e){
          e.preventDefault();
          console.log("clicked")
        })
       }
      });
});



