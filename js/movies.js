import { getMovies, getGenres, titlesGroup } from "./assets/apiTools.js";
import { $ } from "./assets/selectors.js";

const maxPages = 4;

let page = 1;
export let movies = await getMovies("popular", page, "es");

const $moviesInner = $(".movies__inner");

async function showMovie() {
    for(page; page <= maxPages; page++) {
        if(page > 1) movies = await getMovies("popular", page, "es");

        const fragment = document.createDocumentFragment();

        movies.results.forEach(({ title, poster_path, vote_average, genre_ids }) => {
            const genre = getGenres(genre_ids);
    
            const movieArticle = buildMovie({ title, poster_path, vote_average, genre });
            fragment.appendChild(movieArticle);
        });
    
        const titleGroup = titlesGroup[page - 1];
        const moviesGroup = buildGroup(titleGroup, fragment);
    
        $moviesInner.appendChild(moviesGroup);
    }
}

function buildGroup(titleGroup, movies) {
    const moviesGroup = document.createElement("div");
    const moviesCollection = document.createElement("div");

    moviesGroup.classList.add("movies__group");
    moviesCollection.classList.add("movies__collection", "collection");

    moviesGroup.innerHTML = `<h2 class="movies__title">${titleGroup}</h2>`;
    moviesCollection.appendChild(movies);
    moviesGroup.appendChild(moviesCollection);

    return moviesGroup;
}

function buildMovie({ title, poster_path, vote_average, genre }) {
    const movieArticle = document.createElement("article");
    movieArticle.classList.add("collection__movie", "movie");

    movieArticle.innerHTML = `
        <figure class="movie__bg">
            <img class="movie__poster" src="https://image.tmdb.org/t/p/w200${poster_path}" loading="lazy" decoding="async">
        </figure>
        <div class="movie__inner">   
            <header class="movie__header">
                <button class="movie__button" title="Más información">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </button>
                <button class="movie__button movie__button--secondary" title="Añadir a la lista">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </header>
            <footer class="movie__footer">
                <h3 class="movie__title">${title}</h3>
                <p class="movie__average">
                    <svg width="16" height="16" fill="#f50915" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    ${vote_average}/10
                </p>
                <p class="movie__genres">${genre}</p>
            </footer>
        </div>`;

    return movieArticle;
}

showMovie();