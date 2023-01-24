import { movies } from "./movies.js";
import { getVideoMovie, getGenres } from "./assets/apiTools.js";
import { $ } from "./assets/selectors.js";

const $title = $(".hero__title");
const $video = $(".hero__video");
const $average = $(".hero__average");
const $votes = $(".hero__vote");
const $genres = $(".hero__genres");

async function showHeroMovie() {
    const heroMovie = movies.results[0];
    const { title, id, vote_average, vote_count, genre_ids } = heroMovie;

    const heroVideo = await getVideoMovie(`${id}/videos`, 1, "es");
    const videoKey = heroVideo.key;
    const srcVideo = `https://www.youtube-nocookie.com/embed/${videoKey}?controls=0&mute=1&autoplay=1&loop=1&playlist=${videoKey}`;

    $title.textContent = title;
    $average.textContent = `${vote_average}/10`;
    $votes.textContent = `${vote_count} votos`;
    $video.src = srcVideo;

    const genres = getGenres(genre_ids);
    $genres.innerHTML = genres;
}  

showHeroMovie();