class Movie {
  //Christina
  constructor(name) {
    this.name = name;
    this.time = time;
    this.auditorium = auditorium;
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
    $.post(this.url, movie);
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
    console.log(data);
  });
});

class DOMManager {
  //Paul
  static movies;

  static getAllMovies() {
    let allMovies = MovieService.getAllMovies();
    allMovies.then((movies) => this.render(movies));
  }

  // static createMovie(name) {
  //   MovieService.createMovie(new Movie(name))
  //     .then(() => {
  //       return MovieService.getAllMovies();
  //     })
  //     .then((movies) => this.render(movies));
  // }

  static deleteMovie(id) {
    MovieService.deleteMovie(id)
      .then(() => {
        return MovieService.getAllMovies();
      })
      .then((movies) => this.render(movies));
  }

  static render(movies) {
    for (movie of movies) {
      let newChild = `<div class="col-sm-3">
      <div class="card" id="newMovie" style="width: 18rem;">
        <h5 class="card-header">${movie.name}</h5>
        <div class="card-body">
          <h5 class="card-title">${movie.auditorium}</h5>
          <p class="card-text">${movie.time}</p>
          <button type="button" class="btn btn-primary delete" onclick="DOMManager.deleteMovie('${movie._id}')">Delete</button>
        </div>
      </div>
    </div>`;
      $('#moviesPlaying').append(newChild);
      console.log('the button works');
    }
  }
}

// DOMManager.createMovie('Friday');
DOMManager.getAllMovies();
