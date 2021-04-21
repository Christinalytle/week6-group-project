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

}


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
 



//Robert test push