$("#scrapebtn").on("click", function (e) {
  e.preventDefault();
  $.post("/", function (data) {
    $("#noart").hide();
    $("#noart2").hide();
    $("#artctntitle").show();
    for (i = 0; i < data.scrapeddata.length; i++) {
      var title = data.scrapeddata[i].title;
      var content = data.scrapeddata[i].content;
      var imgurl = data.scrapeddata[i].imgurl;
      var url = data.scrapeddata[i].url;
      article = "<div class='row articleRow' ><div class='col-4'><img src=" + imgurl + " alt='article image' id= 'articleimg' class='img-thumbnail'></div><div class='col-8'><h2 id='articletitle'><a target='_blank' href=" + url + " id='arturl'>" + title + "</a> </h2><p id='articlebody'>" + content + "</p><button class='btn btn-outline-success my-2 my-sm-0 btnscls' type='submit' id='savebtn'>Save article</button></div></div>"
      $("#artcontainer").append(article);

    }
    $(".btn.btn-outline-success.my-2.my-sm-0.btnscls").on("click", function (e) {
      e.preventDefault();
      var article = $($(this).closest("div").parents()).html();
      var title = $(article).find("a").text();
      var content = $(article).find("p").text();
      var imgurl = $(article).find("img").attr("src");
      var url = $(article).find("a").attr("href");
      var requestAdd = {
        title,
        content,
        url,
        imgurl,
      }
      $.ajax({
        url: "/",
        type: 'PUT',
        data: requestAdd,
      }).then(function (res) {
        $("#artadded").modal("show")
        setTimeout(function () {
          $("#artadded").modal("hide")
        }, 1000)
      })

    })
  });
});
var clickedbtns = [];
$(".btn.btn-outline-success.my-2.my-sm-0.addnotebtn").on("click", function (e) {
  e.preventDefault()
  var id = $(this).attr("data-id");
  var inputdiv = "<div class='input-group mb-3 noteinput ' ><input type='text' class='form-control "+id+"' placeholder='note' aria-label='note' aria-describedby='button-addon2' required><div class='input-group-append '><button class='btn btn-outline-secondary add' type='button' id="+id+" data-id="+id+">Add</button></div><div class='invalid-feedback "+id+"' >write a note befor clicking add</div></div>"
  

  var click = true;
  for (i = 0; i < clickedbtns.length; i++) {

    if (clickedbtns[i] == id) {
      click = false

    }
  }
  if (clickedbtns.length == 0 || click == true) { clickedbtns.push(id) }
  
  if (click) {
    $("#" + id).append(inputdiv)
    $("#" + id).css("border", "none");
  }
  $(".btn.btn-outline-secondary.add").on("click",function(e){
    e.preventDefault()
    var content = $(".form-control."+id).val();
    if(content==undefined || content==""){
      
      $(".invalid-feedback."+id).show()
    }else{
      $(".invalid-feedback."+id).hide()
      data = {
        id : $(this).attr("data-id"),
        content 
      }
      console.log(data);
    }
   
     $.ajax({
    type: 'POST',
    data : data
    }).then(function(res){
     console.log("note added")
     
    })
  })
  

 
})

$(".btn.btn-outline-success.my-2.my-sm-0.deletebtn").on("click", function (e) {
  e.preventDefault()
  var id = $(this).attr("data-id");
  var data ={
    id,
  }
  console.log(id)
  $.ajax({
    type: 'DELETE',
    data : data
  }).then(function(res){
     console.log("deleted")
     location.reload();
  })

  
})


$(".btn.btn-outline-success.my-2.my-sm-0.shownotesbtn").on("click", function (e) {
  e.preventDefault()
  var id  = $(this).attr("data-id");
  $(".row.notes."+id).show()
  $(".btn.btn-outline-success.my-2.my-sm-0.hidenotesbtn."+id).show()
  $(".btn.btn-outline-success.my-2.my-sm-0.shownotesbtn."+id).hide()


  $(".btn.btn-outline-success.my-2.my-sm-0.hidenotesbtn").on("click", function (e) { 
    e.preventDefault()
    var id  = $(this).attr("data-id");
    $(".row.notes."+id).hide();
    $(".btn.btn-outline-success.my-2.my-sm-0.hidenotesbtn."+id).hide()
    $(".btn.btn-outline-success.my-2.my-sm-0.shownotesbtn."+id).show()

  })
})

