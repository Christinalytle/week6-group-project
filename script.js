
let movieId = 0; 

$('#button').on('click', function() {
    movieId++; 
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
}); 

// ul.remove(); 

function deleteButton() {
    $('#newMovie').remove(); 
    console.log("Delete Button Works")
}; 

//Robert test push