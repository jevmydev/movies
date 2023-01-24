import { $, $$, $body } from "./assets/selectors.js";

const $menu = $(".nav__ul");
const $menuBtn = $(".nav__button--menu");
const $menuRectTop = $(".nav__rect--top");
const $menuRectBottom = $(".nav__rect--bottom")

function toggleMenu() {
    $menu.classList.toggle("nav__ul--visible");
    $body.classList.toggle("body--event");

    if($menu.classList.contains("nav__ul--visible")) $menuBtn.title = "Cerrar el menú";
    else $menuBtn.title = "Abrir el menú";

    $menuRectTop.classList.toggle("nav__rect--topchange");
    $menuRectBottom.classList.toggle("nav__rect--bottomchange");
}

$menuBtn.addEventListener("click", toggleMenu);