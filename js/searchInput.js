import { $, $$ } from "./assets/selectors.js";
import { getMovies, getGenres, saveMovie } from "./assets/apiTools.js";
import { buildGroup, buildMovie, buildSuggestion, refreshListeners } from "./assets/builds.js";
import { showData } from "./dataMovie.js";
import { addList } from "./assets/addList.js";

const $formSearch = $(".nav__form");

const $searchInput = $(".nav__search");
const $searchBtn = $(".nav__button--search");

const $searchGroup = $(".nav__group--search");
const $moviesInner = $(".movies__search");

const maxSuggestion = 5;
const db = debounce(handleKeyPress, 500);

let movies = "";

async function handleSearch(e) {
    e.preventDefault();
    movies = await getMovies("movie", 1, "es", "search", `query=${$searchInput.value}&search_type=ngram`);

    $formSearch.reset();
    $moviesInner.innerHTML = "";
    $searchGroup.innerHTML = "";

    await showSearchMovies();
    toggleInput(e);

    const { top } = $moviesInner.getBoundingClientRect();
    const position = (top + window.scrollY) - 130;
    window.scrollTo(0, position);
}

async function handleKeyPress() {
    const { value } = $searchInput;
    if(value === "") return "";

    movies = await getMovies("movie", 1, "es", "search", `query=${value}&search_type=ngram`);
    showSuggestions(movies);
}

async function showSuggestions() {
    const fragmentSuggestion = document.createDocumentFragment();

    movies.results.forEach(({ title }, index) => {
        if(index >= maxSuggestion) return $searchGroup.innerHTML = "";

        const suggestion = buildSuggestion(title, handleSearch);
        fragmentSuggestion.appendChild(suggestion);
    })

    $searchGroup.appendChild(fragmentSuggestion);
}

async function showSearchMovies() {
    const fragmentGroup = document.createDocumentFragment();
    const fragmentMovies = document.createDocumentFragment();
    
    movies.results.forEach(({ title, poster_path, vote_average, vote_count, overview, genre_ids, id }) => {
        const genre = getGenres(genre_ids);
        saveMovie(id, { title, poster_path, vote_average, vote_count, genre, overview, id }, undefined);
        
        const movieArticle = buildMovie({ title, poster_path, vote_average, genre, id });
        fragmentMovies.appendChild(movieArticle);
    });
            
    const groupTitle = "Encontramos todas estas coincidencias";
    const moviesGroup = buildGroup(groupTitle, fragmentMovies);
        
    fragmentGroup.appendChild(moviesGroup);

    await $moviesInner.appendChild(fragmentGroup);
    refreshListeners(showData, addList);
}

function toggleInput(e) {
    e.preventDefault();

    $searchInput.classList.toggle("nav__search--visible");
    $searchGroup.classList.toggle("nav__group--searchvisible");
}

function debounce(callback, delay) {
    let timer;
    return (e) => { 
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(e);
        }, delay)
    }
}

$formSearch.addEventListener("submit", handleSearch);
$searchInput.addEventListener("keypress", db);
$searchBtn.addEventListener("click", toggleInput)