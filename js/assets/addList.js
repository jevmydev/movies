import { $ } from "./selectors.js";
import { getSaveMovie, getMovies } from "./apiTools.js";

const $sign = $(".sign");

export async function addList({ currentTarget }) {
    const dataID = currentTarget.getAttribute("data-id");
    const saveMovieFile = getSaveMovie(dataID);

    const movie = saveMovieFile.data || await getMovies(`/${dataID}`, 1, "es");

    $sign.classList.add("sign--visible");
    localStorage.setItem(dataID, JSON.stringify(movie));

    setTimeout(() => $sign.classList.remove("sign--visible"), 2000)
}