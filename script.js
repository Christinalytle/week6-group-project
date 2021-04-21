class Movie {   //Christina 
  constructor(name) {
    this.name = name; 
    this.time = ''; 
    this.auditorium = ''; 
  }

  addTime(time) {
    this.time = new Time(time); 
  }

  addAuditorium(auditorium) {
    this.auditorium = new Auiditorium(number); 
  }
}

class Time {
  constructor(time) {
    this.time = time; 
  }
}

class Auditorium {
  constructor(number) {
    this.number = number; 
  }
}

class MovieService {  //Robert
  static url = "https://crudcrud.com/api/9aa11e480d4346edb21659db01c242b8/crudmovies";
  
  static getAllMovies() {
    return $.get(this.url);
  }

  getMovie(id) {
    return $.get(this.url + `/${id}`);
  }

  static createMovie(movie) {
    $.post(this.url, movie);
  };

  static updateMovie(movie) {
    return $.ajax({
      url: this.url + `/${movie._id}`,
      dataType: 'json',
      data: JSON.stringify(movie),
      contentType: 'application/json',
      type: 'PUT'
    });
  }

  static deleteMovie(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'DELETE'
    });
  }
  
}


$('#button-test').on('click', function(){
  let allMovies = MovieService.getAllMovies();
  allMovies.then((data) => {
    console.log(data);
  });
  
});



class DOMMAnager {  //Paul
  static movies; 

  static render(movies) {
      let newChild = `<div class="col-sm-3">
      <div class="card" id="newMovie" style="width: 18rem;">
        <h5 class="card-header">${$(movieTitle).val()}</h5>
        <div class="card-body">
          <h5 class="card-title">${$(auditorium).val()}</h5>
          <p class="card-text">${$(time).val()}</p>
          <button type="button" class="btn btn-primary delete" onclick="deleteButton()">Delete</button>
        </div>
      </div>
    </div>`
    $('#moviesPlaying').append(newChild); 
    console.log("the button works"); 
  }

  
  static deleteMovie() {
      $('#newMovie').remove(); 
      console.log("Delete Button Works")
  } 
}
 




