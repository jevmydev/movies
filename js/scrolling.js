import { $ } from "./assets/selectors.js";

const $header = $(".header");

window.addEventListener("scroll", () => {
    const { scrollY } = window;

    if(scrollY > 0) $header.classList.add("header--scroll")
    else $header.classList.remove("header--scroll")
})