function getMoviesListener() {
  var searchBtn = $('#send');
  searchBtn.click(function () {
    var input = $("#serchbar");
    var txt = input.val();
    var replacedTxt = txt.split(' ').join('+');
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie?',
      method: 'GET',
      data: {
        api_key: '95a07c6aeef2a2b492c138cc8e8c0eeb',
        query: replacedTxt
      },
      success: function (data, state) {
        var arrayMovies = data['results'];

        var template = $('#movie-template').html();
        var compiled = Handlebars.compile(template);
        var target = $('.movies-container');
        target.html('');
        for (var i = 0; i < arrayMovies.length; i++) {
          var movie = arrayMovies[i];
          console.log(movie);
          var movieHTML = compiled(movie);
          target.append(movieHTML);
        }
      },
      error: function (request, state, error) {
        console.log('request', request);
        console.log('state', state);
        console.log('error', error);
      }
    });
  });


}


function init() {
  getMoviesListener();
}

$(document).ready(init);
