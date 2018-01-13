$( document ).ready(function() {

  //API Key: 5KfAbfQbUKgHyuM06tjXgrr3Gj64orZV
  //Array of movies
  var topics = ["basketball", "soccer", "skateboarding", "baseball", "volleyball"];

  renderButtons();



  $("button").on("click", function(){ 
    //var sport = "soccer";
    //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=5KfAbfQbUKgHyuM06tjXgrr3Gj64orZV";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=basketball&limit=10&api_key=5KfAbfQbUKgHyuM06tjXgrr3Gj64orZV";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      var results = response.data;
        console.log("ready");

      for (var i=0; i < results.length; i++){

        //Create div to hold movie
        var gifDiv = $("<div class='gif'>");

        //Store rating
        var rating = results[i].rating;
        console.log(rating);

        //P element to display rating
        var ratingP = $("<p>").text("Rating: " + rating);

        //Get URL of gif
        var gifURL = results[i].images.fixed_height_still.url;
        console.log(gifURL);

        //Create image element to hold gif
        var sportGif = $("<img>").attr("src", gifURL);

        //Append the gif
        gifDiv.append(sportGif);
        gifDiv.prepend(ratingP);

        //
        $("#gifsView").append(gifDiv);
      }
    })

/*  $("#add-sport").on("click", function(event){
    event.preventDefault();

    var sport = $("#sport-input").val().trim();

    topics.push(sport);

    renderButtons();

  });*/

});


  //===============Functions=================
      function renderButtons(){
        $("#buttonsNav").empty();

        for (var i = 0; i < topics.length; i++){
          var newButton = $("<button>");

          newButton.addClass("sport");

          newButton.attr("data-name", topics[i]);

          newButton.text(topics[i]);

          $("#buttonsNav").append(newButton);
        }
      }
      
      
});