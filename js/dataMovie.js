import { $, $body } from "./assets/selectors.js";
import { getMovies, getVideoMovie, saveMovie, getSaveMovie } from "./assets/apiTools.js";
import { buildIframeMovie } from "./assets/builds.js";
import { addList } from "./assets/addList.js";

const $dataMovie = $(".datamovie");
const $datamovieVideos = $(".datamovie__videos");

const $video = $(".datamovie__video");
const $title = $(".datamovie__title");
const $poster = $(".datamovie__poster");
const $description = $(".datamovie__description");
const $data = $(".datamovie__data");

const $listBtn = $(".datamovie__button--list");
const $closeBtn = $(".datamovie__button--close");

const maxVideos = 2;

let isSoundMute = true;

async function searchData(dataID) {
    const saveMovieFile = getSaveMovie(dataID);

    const movie = saveMovieFile.data || (await getMovies(`/${dataID}`, 1, "es"));
    const fragmentVideos = document.createDocumentFragment();

    const videos = saveMovieFile.videos || (await getVideoMovie(`${dataID}/videos`, 1, "es"));
    saveMovie(dataID, undefined, videos);

    const videoKey = videos[0].key;
    const srcVideo = `https://www.youtube-nocookie.com/embed/${videoKey}?controls=0&vq=auto&mute=${isSoundMute ? 1 : 0}&autoplay=1&loop=1&playlist=${videoKey}`;
    const { title, poster_path, vote_average, genre, vote_count, overview } = movie;

    $title.textContent = title;
    $description.textContent = overview;
    $video.src = srcVideo;
    $poster.src = `https://image.tmdb.org/t/p/w200/${poster_path}`;
    $poster.alt = title;
    $data.innerHTML = `
        <span class="datamovie__info">Promedio: ${vote_average}</span>
        <span class="datamovie__info">Votos: ${vote_count}</span>
        <span class="datamovie__info">Géneros: ${genre}</span>
    `;

    videos.forEach(({ key }, index) => {
        if (index >= maxVideos) return "";

        const srcVideo = `https://www.youtube-nocookie.com/embed/${key}?controls=1&mute=0&vq=auto&autoplay=0`;
        const iframe = buildIframeMovie(srcVideo);

        fragmentVideos.appendChild(iframe);
    });

    $listBtn.setAttribute("data-id", dataID);
    $listBtn.addEventListener("click", addList);
    $datamovieVideos.appendChild(fragmentVideos);
}

export function showData({ currentTarget }) {
    const dataID = currentTarget.getAttribute("data-id");
    searchData(dataID);

    $body.classList.add("body--event");
    $dataMovie.classList.add("datamovie--visible");
}

function hideData() {
    $body.classList.remove("body--event");
    $dataMovie.classList.remove("datamovie--visible");
    $datamovieVideos.innerHTML = "";
}

$(".datamovie__out").addEventListener("click", hideData);
$closeBtn.addEventListener("click", hideData);
