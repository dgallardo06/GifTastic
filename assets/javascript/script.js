$( document ).ready(function() {

  //Array of movies
  var topics = ["basketball", "soccer", "skateboarding", "baseball", "volleyball"];

  renderButtons();
  showGifs();

  // on click of submit
  $("#add-sport").on("click", function(event){
    event.preventDefault();

    //get the user input
    var sport = $("#sport-input").val().trim();

    //add to array
    topics.push(sport);

    //create button and show gifs when clicked
    renderButtons();
    showGifs();
  });


  //===============Functions=================
      function renderButtons(){
        //remove any existing buttons to prevent repitition
        $("#buttonsNav").empty();

        //for each string in array, create a button
        for (var i = 0; i < topics.length; i++){
          var newButton = $("<button>");

          newButton.addClass("sport");

          newButton.attr("data-name", topics[i]);

          newButton.text(topics[i]);

          $("#buttonsNav").append(newButton);
        }
      }


      function showGifs(){
        $("button").on("click", function(){ 
        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=5KfAbfQbUKgHyuM06tjXgrr3Gj64orZV";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
        var results = response.data;

        for (var i=0; i < results.length; i++){

          //Create div to hold gif
          var gifDiv = $("<div class='gif'>");

          //Store rating
          var rating = results[i].rating;

          //P element to display rating
          var ratingP = $("<p>").text("Rating: " + rating);

          //Get still image of gif
          var gifStill = results[i].images.fixed_height_small_still.url;

          //Get gif url
          var gifURL = results[i].images.fixed_height_small.url;

          //Create image element to hold gif
          var sportGif = $("<img>").attr("src", gifStill);

          //Append the gif
          gifDiv.append(sportGif);
          gifDiv.append(ratingP);

          $("#gifsView").prepend(gifDiv);

        }
      })
    });
  }   
      
});