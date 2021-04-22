class Movie {
  //Christina
  constructor(name, auditorium, time) {
    this.name = name;
    this.auditorium = auditorium;
    this.time = time;
  }
}

class MovieService {
  //Robert
  static url =
    'https://crudcrud.com/api/0dad2e1e6689463f9ec580c7df695fdb/crudmovies';

  static getAllMovies() {
    return $.get(this.url);
  }

  getMovie(id) {
    return $.get(this.url + `/${id}`);
  }

  static createMovie(movie) {
    return $.ajax({
      url: this.url,
      type: 'POST',
      crossDomain: true,
      data: JSON.stringify(movie),
      dataType: 'json',
      contentType: 'application/json',
      success: function (response) {
        var resp = JSON.parse(response);
        alert(resp.status);
      },
      error: function (xhr, status) {
        alert('error');
      },
    });
  }

  static updateMovie(movie) {
    return $.ajax({
      url: this.url + `/${movie._id}`,
      dataType: 'json',
      data: JSON.stringify(movie),
      contentType: 'application/json',
      type: 'PUT',
    });
  }

  static deleteMovie(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'DELETE',
    });
  }
}

$('#button-test').on('click', function () {
  let allMovies = MovieService.getAllMovies();
  allMovies.then((data) => {
    this.render(data);
  });
});

class DOMManager {
  //Paul
  static movies;

  static getAllMovies() {
    MovieService.getAllMovies().then((movies) => this.render(movies));
  }

  static createMovie(name, auditorium, time) {
    MovieService.createMovie(new Movie(name, auditorium, time))
      .then(() => {
        return MovieService.getAllMovies();
      })
      .then((movies) => this.render(movies));
  }

  static deleteMovie(id) {
    MovieService.deleteMovie(id)
      .then(() => {
        return MovieService.getAllMovies();
      })
      .then((movies) => this.render(movies));
  }

  static render(movies) {
    $('#moviesPlaying').empty();
    movies.forEach((movie) => {
      let newChild = `<div class="col-sm-3">
      <div class="card" id="newMovie" style="width: 18rem;">
        <h5 class="card-header">${movie.name}</h5>
        <div class="card-body">
          <h5 class="card-title">${movie.auditorium}</h5>
          <p class="card-text">${movie.time}</p>
          <button type="button" class="btn btn-primary delete" onclick="DOMManager.deleteMovie('${movie._id}')">Delete</button>
          <button type="button" class="btn btn-primary delete" onclick="DOMManager.updateMovie('${movie._id}')">Update</button>
        </div>
      </div>
    </div>`;
      $('#moviesPlaying').append(newChild);
    });
  }
}

$('#button').on('click', () => {
  let name = $('#movieTitle').val();
  let auditorium = $('#auditorium').val();
  let time = $('#time').val();
  DOMManager.createMovie(name, auditorium, time);
});
// DOMManager.createMovie('Friday');
DOMManager.getAllMovies();
