function addSearchClickListener() {
  var searchBtn = $('#send');
  searchBtn.click(startSearch);
}

function startSearch() {

  var target = $("#serchbar");
  var query = target.val();
  target.val('');

  var targetResult = $('.movies-series-container');
  targetResult.text('');

  getMovies(query);
  getSeries(query);
}

function getMovies (query) {

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?',
    method: 'GET',
    data: {
      'api_key': '95a07c6aeef2a2b492c138cc8e8c0eeb',
      'query': query
    },
    success: function (data, state) {
      var movies = data['results'];


      var template = $('#movie-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('.movies-series-container');

      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];

        var vote = movie['vote_average'];
        movie['stars'] = getStars(vote);

        var lang = movie['original_language'];
        movie['flag'] = getFlag(lang);

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
}

function getSeries(query) {

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv?',
    method: 'GET',
    data: {
      'api_key': '95a07c6aeef2a2b492c138cc8e8c0eeb',
      'query': query
    },
    success: function (data, state) {
      var series = data['results'];

      var template = $('#serie-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('.movies-series-container');

      for (var i = 0; i < series.length; i++) {
        var serie = series[i];

        var vote = serie['vote_average'];
        serie['stars'] = getStars(vote);

        var lang = serie['original_language'];
        serie['flag'] = getFlag(lang);

        var serieHTML = compiled(serie);
        target.append(serieHTML);


      }
    },
    error: function (request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
}

function getStars(vote) {

  vote = Math.ceil(vote / 2);

  var voteHTML = '';
  for (var j=0;j<5;j++) {
    if (j < vote) {
      voteHTML += '<i class="fas fa-star"></i>';
    } else {
      voteHTML += '<i class="far fa-star"></i>';
    }
  }

  return voteHTML;
}

function getFlag(lang) {
  if (lang === 'it' || lang === 'en') {

    return `<img class="flag" src="img/${lang}.png">`;
  }

  return lang;

}


function init() {
  addSearchClickListener();

  // debug

  startSearch();

  // debug
}

$(document).ready(init);
