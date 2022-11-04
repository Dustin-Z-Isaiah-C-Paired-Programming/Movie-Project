"use strict";
// alert('moo')
let glitchURL = 'https://defiant-melted-burrito.glitch.me/movies';

/**
On page load:

    ✅1. Display a "loading..." message
    ✅2. Make an AJAX request to get a listing of all the movies
    ✅3. When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives

    ✅ 4. Allow users to add new movies
    ✅ 5. Create a form for adding a new movie that has fields for the movie's title and rating
    ✅ 6. When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

    ✅ 7. Allow users to edit existing movies
    ✅ 8. Give users the option to edit an existing movie
    ✅ 9. A form should be pre-populated with the selected movie's details
    ✅ 10. Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.

    ✅ 11. Delete movies
    ✅ 12. Each movie should have a "delete" button
    ✅ 13. When this button is clicked, your javascript should send a DELETE request

 */

/**
 * Bonuses
 * ✅ 1. Add a disabled attribute to buttons while their corresponding ajax request is still pending.
 * ✅ 2. Show a loading animation instead of just text that says "loading...".
 * ✅ 3. Use modals for the creating and editing movie forms.
 * ✅ 4. Add a genre property to every movie.
 * ✅ 5. Allow users to sort the movies by rating, title, or genre (if you have it).
 * 6. Allow users to search through the movies by rating, title, or genre (if you have it).
 * 7. Use a free movie API like OMDB to include extra info or render movie posters.
 */
function makeMovieHTML(data){
    let html = "<div>"
    data.forEach(function (movie) {
        html += `<div id="${movie.id}"><h2>${movie.title}</h2>
        <p>Rating: ${movie.rating}</p>
        <p>Genre: ${movie.genre}</p>
        <button type="submit" class="editMovie">Edit</button>
        <div class="editMovieFormDiv modal"></div>
        <button type="submit" class="deleteMovie">Delete</button>
        </div>
        `
    })
    html += "</div>"
    // Inject the HTML string into the #moviesDiv
    $("#moviesDiv").html(`${html}`)
    $(".editMovie").click(function (e) {
        e.preventDefault();
        $(this).prop("disabled", true)


        // Create a dataIndex variable to set to the data object index when the correct id is found
        let dataIndex = -1;
        // Loop through the data array and assign the index value to dataIndex variable when ids match
        data.forEach(function (element, index) {
            // console.log(element.id)
            // console.log(index)
            // console.log(e.currentTarget.parentElement.id)
            if (e.currentTarget.parentElement.id == element.id) {
                dataIndex = index
            }
        })
        // console.log(dataIndex)
        // console.log(e)

        // Create local scope variables to use in the HTML string
        let title = data[dataIndex].title
        let id = data[dataIndex].id
        let rating = data[dataIndex].rating
        let genre = data[dataIndex].genre
        // Create HTML string for edit movie button click
        let html = `
                <form class="modal-content">
                
                <button class="closeModal" type="button">X</button>
                
                <h2>Edit this moo-vie</h2>
                
                <label for="editMovieName">Movie Title</label>
                <input type="text" id="editMovieName" name="editMovieName" value="${title}">
                
                <label for="editMovieRating">Movie Rating</label>
                <input type="text" id="editMovieRating" name="editMovieRating" value="${rating}">
               
                <label for="editMovieGenre">Movie Genre</label>
                <input type="text" id="editMovieGenre" name="editMovieGenre" value="${genre}">
                
                <input type="submit" id="submitNewMovieEdit">
            </form>`
        // Assign the edit movie HTML to the edit movie div
        e.currentTarget.parentElement.children[4].innerHTML = html
        console.log(e)
        // Display the modal
        e.currentTarget.parentElement.children[4].style.display = "block"

        // Add event listener to close modal button class to display=none the parent element and remove "disabled property from the edit button attribute
        $(".closeModal").click(function (e) {
            // Hide modal
            e.currentTarget.parentElement.parentElement.style.display = "none"
            // make edit button usable again
            $(".editMovie").prop("disabled", false)
        })


        // Add a 'click' event listener to the #submitNewMovieEdit button
        $("#submitNewMovieEdit").click(function (e) {
            e.preventDefault()
            $(this).prop("disabled", true)
            // console.log(e)
            // console.log(id)
            // Create local variables to use in the AJAX request
            let newMovieEdit = $("#editMovieName")[0].value
            let newRatingEdit = $("#editMovieRating")[0].value
            let newGenreEdit = $("#editMovieGenre")[0].value
            let putGlitchURL = `${glitchURL}/${id}`;
            // console.log(putGlitchURL)
            // Make movie AJAX PUT request
            $.ajax(putGlitchURL, {
                type: "PUT",
                data: {
                    title: `${newMovieEdit}`,
                    rating: `${newRatingEdit}`,
                    genre: `${newGenreEdit}`
                }
                // Reload the movies
            }).then(() => {
                loadMovies()
            })
        })
    })

}
// Make movies AJAX GET request
function loadMovies() {
    return $.ajax(glitchURL, {
        type: "GET"
    }).then(function (data){
        $("#sortMovies").change(function (){
            if ($(this).children("option:selected").val() == 0){
                return data
            } else
            if ($(this).children("option:selected").val() == 1){
                data = data.sort((a, b) => {
                    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                console.log(data)
                makeMovieHTML(data)
            } else
            if ($(this).children("option:selected").val() == 2){
                data = data.sort((a, b) => {
                    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                console.log(data)
                makeMovieHTML(data)
            } else
            if ($(this).children("option:selected").val() == 3){
                data = data.sort((a, b) => {
                    const nameA = a.genre.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.genre.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                console.log(data)
                makeMovieHTML(data)
            } else
            if ($(this).children("option:selected").val() == 4) {
                data = data.sort((a, b) => {
                    const nameA = a.genre.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.genre.toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                console.log(data)
                makeMovieHTML(data)
            } else
            if ($(this).children("option:selected").val() == 5){
                data = data.sort((a, b) => b.rating - a.rating)
                console.log(data)
                makeMovieHTML(data)
            } else
            if ($(this).children("option:selected").val() == 6){
                data = data.sort((a, b) => a.rating - b.rating)
                console.log(data)
                makeMovieHTML(data)
            }
        })
        console.log(data)
        return data
    })
        // Create an HTML string with the movie info
        .then(function (data) {
            console.log(data)
            makeMovieHTML(data)
            console.log(makeMovieHTML(data))
//             let html = "<div>"
//             data.forEach(function (movie) {
//                 html += `<div id="${movie.id}"><h2>${movie.title}</h2>
//         <p>Rating: ${movie.rating}</p>
//         <p>Genre: ${movie.genre}</p>
//         <button type="submit" class="editMovie">Edit</button>
// <!--        // removed modal class from div below *d-none issue*-->
//         <div class="editMovieFormDiv modal"></div>
//         <button type="submit" class="deleteMovie">Delete</button>
//         </div>
//         `
//             })
//             html += "</div>"
//             // Inject the HTML string into the #moviesDiv
//             $("#moviesDiv").html(`${html}`)
            // Add event listener to the .editMovie button class

            // Add a 'click' event listener to the .deleteMovie button
            $(".deleteMovie").click(function (e) {
                e.preventDefault();
                let dataIndex = -1;
                // Loop through the data array and assign the index value to dataIndex variable when ids match
                data.forEach(function (element, index) {
                    // console.log(element.id)
                    // console.log(index)
                    // console.log(e.currentTarget.parentElement.id)
                    if (e.currentTarget.parentElement.id == element.id) {
                        dataIndex = index
                    }
                })
                $(this).prop("disabled", true)
                // console.log(e)
                // Create local variables to use in the AJAX DELETE request
                let id = data[dataIndex].id
                let putGlitchURL = `${glitchURL}/${id}`;
                // console.log(putGlitchURL)
                // Make movie AJAX DELETE request
                $.ajax(putGlitchURL, {
                    type: "DELETE"
                    // Reload the movies
                }).then(() => {
                    loadMovies()
                })
            })
        })
}



// Call the localMovies function to load the movie data when the page is opened

setTimeout(() => { loadMovies(); }, 1000);

$("#addNewMovie").on("click", function (e){
    e.preventDefault();
    $(this).prop("disabled",true)
    console.log(e)
    // $(".modal").style.display = "block"
    e.currentTarget.nextElementSibling.style.display = "block";
})

$(".closeModal").click(function(e) {
    // Hide modal
    e.currentTarget.parentElement.parentElement.style.display = "none"
    // make edit button usable again
    $("#addNewMovie").prop("disabled",false)
})

// Add a 'click' event listener to the #submitNewMovie button
$("#submitNewMovie").on("click", function (e){
    e.preventDefault();
    $(this).prop("disabled",true)
    //Create local variables to use in AJAX POST request
    let newMovie = $("#movieName")[0].value
    let newRating = $("#movieRating")[0].value
    let newGenre = $("#movieGenre")[0].value
    // console.log(newMovie)
    // Make movie AJAX POST request
    e.currentTarget.parentElement.parentElement.style.display = "none"
    // make edit button usable again
    $("#addNewMovie").prop("disabled",false)
    $(this).prop("disabled",false)
    $.ajax(glitchURL, {
        type: "POST",
        data:{
            title: `${newMovie}`,
            rating: `${newRating}`,
            genre: `${newGenre}`
        }
    // Reload the movies
    }).then(() => loadMovies())
})




