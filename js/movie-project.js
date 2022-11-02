"use strict";
// alert('moo')
let glitchURL = 'https://defiant-melted-burrito.glitch.me/movies';
let newMovieId = 4;

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
            html += `<h2>${movie.title}</h2>
        <p>Rating: ${movie.rating}, ID: ${movie.id}</p>`

        })
        html += "</div>"
        $("#moviesDiv").html(`${html}`)
    })
}
loadMovies();
// console.log(loadMovies())

/**
    4. Allow users to add new movies
    5. Create a form for adding a new movie that has fields for the movie's title and rating
    6. When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form
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