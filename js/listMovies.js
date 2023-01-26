import { $, $$ } from "./assets/selectors.js";
import { buildMovie, buildGroup } from "./assets/builds.js";

const $moviesInner = $(".movies__inner--list");

async function showListMovies() {
    const fragmentMovies = document.createDocumentFragment();
    let keys = { ...localStorage };

    for(const key in keys) {
        const movie = JSON.parse(keys[key]);
        const articleMovie = buildMovie(movie);

        fragmentMovies.appendChild(articleMovie)
    }

    const moviesGroup = buildGroup("Tu lista", fragmentMovies);
    $moviesInner.appendChild(moviesGroup);
    $$(".movie__header").forEach(header => header.style.display = "none");
}

showListMovies();