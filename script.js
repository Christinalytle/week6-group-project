let formTitle = document.querySelector('#formTitle');
let submitButton = document.querySelector('#submitButton');
let changeSubmit = document.querySelector('.changeSubmit');
let isUpdate = false;
class Movie {
  //Christina
  constructor(title, auditorium, time) {
    this.title = title;
    this.auditorium = auditorium;
    this.time = time;
  }
}

class MovieService {
  //Robert
  static url =
    'https://crudcrud.com/api/b448e9c1cb564baab8a396f34f2e85bf/crudmovies';

  static getAllMovies() {
    return $.get(this.url);
  }

  static getMovie(id) {
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
    });
  }

  static updateMovie(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: movie,
    });
  }

  static deleteMovie(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'DELETE',
    });
  }
}

class DOMManager {
  //Paul
  static movies;

  static getAllMovies() {
    MovieService.getAllMovies().then((movies) => this.render(movies));
  }

  static createMovie(title, auditorium, time) {
    MovieService.createMovie(new Movie(title, auditorium, time))
      .then(() => {
        return MovieService.getAllMovies();
      })
      .then((movies) => this.render(movies));
  }

  static updateMovie(id) {
    isUpdate = true;
    formTitle.innerText = 'Edit Movie:';
    submitButton.innerText = 'Update';
    changeSubmit.id = 'updateSubmit';
    console.log(changeSubmit);
    MovieService.getAllMovies().then((movies) => {
      movies.forEach((movie) => {
        if (movie._id == id) {
          document.querySelector('#movieTitle').value = movie.title;
          document.querySelector('#auditorium').value = movie.auditorium;
          document.querySelector('#time').value = movie.time;
          $('#submitButton').on('click', submitUpdate);
          function submitUpdate(title, auditorium, time) {
            console.log(title, auditorium, time);
          }
        }
      });
      // MovieService.updateMovie(id);
    });
    // formTitle.innerText = 'Enter New Movie:';
    // submitButton.innerText = 'Submit';
    $('#updateSubmit').on('click', (e) => {
      console.log(e.target.id);
      let title = $('#movieTitle').val();
      let auditorium = $('#auditorium').val();
      let time = $('#time').val();
    });
  }

  static deleteMovie(id) {
    MovieService.deleteMovie(id)
      .then(() => {
        return MovieService.getAllMovies();
      })
      .then((movies) => this.render(movies));
  }

  static render(movies) {
    this.movies = movies;
    $('#moviesPlaying').empty();
    movies.forEach((movie) => {
      let newChild = `<div class="col-sm-3">
      <div class="card" id="newMovie" id="${movie._id} style="width: 18rem;">
        <h5 class="card-header" id="inputTitle">${movie.title}</h5>
        <div class="card-body">
          <h5 class="card-title" id="inputAuditorium">${movie.auditorium}</h5>
          <p class="card-text" id="inputTime">${movie.time}</p>
          <button type="button" class="btn btn-primary delete" onclick="DOMManager.deleteMovie('${movie._id}')">Delete</button>
          <button type="button" class="btn btn-primary delete" onclick="DOMManager.updateMovie('${movie._id}')">Update</button>
        </div>
      </div>
    </div>`;
      $('#moviesPlaying').append(newChild);
    });
  }
}

$('#submitButton').on('click', () => {
  let title = $('#movieTitle').val();
  let auditorium = $('#auditorium').val();
  let time = $('#time').val();

  DOMManager.createMovie(title, auditorium, time);
  title = '';
  auditorium = '';
  time = '';
});

DOMManager.getAllMovies();
