import { movies } from "./movies.js";
import { getVideoMovie, getGenres, saveMovie } from "./assets/apiTools.js";
import { showData } from "./dataMovie.js";
import { $ } from "./assets/selectors.js";

const heroMovie = movies.results[0];
const { title, id, vote_average, vote_count, genre_ids } = heroMovie;

const $title = $(".hero__title");
const $video = $(".hero__video");
const $average = $(".hero__average");
const $votes = $(".hero__vote");
const $genres = $(".hero__genres");
const $dataBtn = $(".hero__button--information");
const $soundBtn = $(".hero__button--sound");

$dataBtn.setAttribute("data-id", id);

const muteSound = {
    true: {
        icon: "<svg width=\"24\" height=\"24\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z\"/><path d=\"M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z\"/><path d=\"M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z\"/></svg>",
        title: "Desmutea el video"
    },
    false: {
        icon: "<svg width=\"24\" height=\"24\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z\"/></svg>",
        title: "Mutea el video"
    }
};

let isSoundMute = true;
let videoKey = "";

async function showHeroMovie() {
    const heroVideo = await getVideoMovie(`/${id}/videos`, 1, "es");
    saveMovie(id, undefined, heroVideo);
    videoKey = heroVideo[0].key;

    const srcVideo = `https://www.youtube-nocookie.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&vq=auto&playlist=${videoKey}&mute=${isSoundMute ? 1: 0}`;
    const genres = getGenres(genre_ids);

    $title.textContent = title;
    $average.textContent = `${vote_average}/10`;
    $votes.textContent = `${vote_count} votos`;
    $video.src = srcVideo;
    $genres.innerHTML = genres;
}  

async function toggleSound() {
    isSoundMute = !isSoundMute;
    const { title, icon } = muteSound[isSoundMute];

    $soundBtn.title = title;
    $soundBtn.innerHTML = icon;

    $video.src = `https://www.youtube-nocookie.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&vq=auto&playlist=${videoKey}&mute=${isSoundMute ? 1: 0}`;
}

showHeroMovie();

$dataBtn.addEventListener("click", showData);
$soundBtn.addEventListener("click", toggleSound);