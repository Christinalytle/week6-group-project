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
    'https://crudcrud.com/api/c98a5e292298414e843f6ec4e1dfef0a/movies';


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

  static updateMovie(movie) {
    return $.ajax({
      url: this.url + `/${movie._id}`,
      type: 'PUT',
      crossDomain: true,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: movie.title,
        auditorium: movie.auditorium,
        time: movie.time,
      }),
      success: function (data) {
        console.log("success is: " + data);
      },
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
    let submitArea = document.getElementById('submitArea');
    let childButton = document.getElementById('submitArea').childNodes[1];
    let buttonEl = document.createElement('button');
    buttonEl.classList = 'changeSubmit btn btn-primary';
    buttonEl.id = 'updateSubmit';
    buttonEl.innerText = 'Update';
    submitArea.removeChild(childButton);
    submitArea.appendChild(buttonEl);
    formTitle.innerText = 'Edit Movie:';
    submitButton.innerText = 'Update';
    changeSubmit.id = 'updateSubmit';
    MovieService.getAllMovies().then((movies) => {
      movies.forEach((movie) => {
        if (movie._id == id) {
          console.log(id);
          document.querySelector('#movieTitle').value = movie.title;
          document.querySelector('#auditorium').value = movie.auditorium;
          document.querySelector('#time').value = movie.time;
          // $('#submitButton').on('click', submitUpdate);
          $('#updateSubmit').on('click', (event) => {
            let title = $('#movieTitle').val();
            let auditorium = $('#auditorium').val();
            let time = $('#time').val();
            movie.title = title;
            movie.auditorium = auditorium;
            movie.time = time;
            console.log(movie);
            MovieService.updateMovie(movie);
            this.render(movies));  
            console.log(movies);
            event.preventDefault();
          });
        }
      });
      // MovieService.updateMovie(id);
    });
    // formTitle.innerText = 'Enter New Movie:';
    // submitButton.innerText = 'Submit';
  }

  static reloadPage() {
    location.reload(); 
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
