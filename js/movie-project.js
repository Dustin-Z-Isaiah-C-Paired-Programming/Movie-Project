"use strict";
// alert('moo')
let glitchURL = 'https://defiant-melted-burrito.glitch.me/movies';

/**
On page load:

    ✅1. Display a "loading..." message
    ✅2. Make an AJAX request to get a listing of all the movies
    ✅3. When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives
 */
function loadMovies() {
    return $.ajax(glitchURL, {
        type: "GET"
    })
    .then(function (data){
        console.log(data)
        let html = "<div>"
        data.forEach(function (movie) {
            html += `<div id="${movie.id}"><h2>${movie.title}</h2>
        <p>Rating: ${movie.rating}</p>
        <button type="submit" class="editMovie">Edit</button>
        <div class="editMovieFormDiv"></div></div>`
        })
        html += "</div>"
        $("#moviesDiv").html(`${html}`)
        $(".editMovie").click(function (e){
            e.preventDefault();
            let title = data[(e.currentTarget.parentElement.id -1)].title
            let rating = data[(e.currentTarget.parentElement.id -1)].rating
            let html = `<div>
                <h2>Edit this moo-vie</h2>
                <label for="editMovieName">Movie Title</label>
                <input type="text" id="editMovieName" name="editMovieName" placeholder="${title}">
                
                <label for="editMovieRating">Movie Rating</label>
                <input type="text" id="editMovieRating" name="editMovieRating" placeholder="${rating}">
                
                <input type="submit" id="submitNewMovieEdit">
            </div>`
            e.currentTarget.parentElement.children[3].innerHTML = html
            // console.log(e.currentTarget.parentElement.id)
            console.log(e)
        })
    })
}
loadMovies();
// console.log(loadMovies())



/**
     ✅4. Allow users to add new movies
     ✅ 5. Create a form for adding a new movie that has fields for the movie's title and rating
     ✅ 6. When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

 */
$("#submitNewMovie").on("click", function (e){
    e.preventDefault();

    let newMovie = $("#movieName")[0].value
    let newRating = $("#movieRating")[0].value
    // console.log(newMovie)
    $.ajax(glitchURL, {
        type: "POST",
        data:{
            title: `${newMovie}`,
            rating: `${newRating}`
        }
    }).then(loadMovies())
})
/**
    7. Allow users to edit existing movies
 */


/**
    8. Give users the option to edit an existing movie
    9. A form should be pre-populated with the selected movie's details
    10. Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
    11. Delete movies
 */

/**
    12. Each movie should have a "delete" button
    13. When this button is clicked, your javascript should send a DELETE request
 */