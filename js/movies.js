import { getMovies, getGenres, titlesGroup } from "./assets/apiTools.js";
import { buildGroup, buildMovie, refreshListeners } from "./assets/builds.js";
import { showData } from "./dataMovie.js";
import { $ } from "./assets/selectors.js";

let maxPages = 5;
let page = 1; 

export let movies = await getMovies("popular", page, "es");

const $moviesInner = $(".movies__inner");
const $seeMoreBtn = $(".movies__button--more"); 

async function showMovies() {
    const fragmentGroup = document.createDocumentFragment();

    for(page; page <= maxPages; page++) {
        if(page > 1) movies = await getMovies("popular", page, "es");
        const fragmentMovies = document.createDocumentFragment();

        movies.results.forEach(({ title, poster_path, vote_average, genre_ids, id }) => {
            const genre = getGenres(genre_ids);
    
            const movieArticle = buildMovie({ title, poster_path, vote_average, genre, id });
            fragmentMovies.appendChild(movieArticle);
        });
        
        const randomTitle = Math.floor(Math.random() * titlesGroup.length);
        const groupTitle = titlesGroup[randomTitle];
        const moviesGroup = buildGroup(groupTitle, fragmentMovies);
    
        fragmentGroup.appendChild(moviesGroup);
    }

    await $moviesInner.appendChild(fragmentGroup);
    refreshListeners(showData);
}

async function seeMore() {
    maxPages++;
    await showMovies();
    const lastChild = $moviesInner.lastChild;

    const { top } = lastChild.getBoundingClientRect();
    const position = (top + window.scrollY) - 130;

    window.scrollTo(0, position);
}

showMovies();
$seeMoreBtn.addEventListener("click", seeMore);