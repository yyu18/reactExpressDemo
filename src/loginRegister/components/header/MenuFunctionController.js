export const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
}

export const closeSearch = () => {
    document.getElementById("search-overlay").style.display = "none";
}

export const openNav = () => {
    document.getElementById("mySidenav").classList.add('open-side');
}

export const closeNav = () => {
    document.getElementById("mySidenav").classList.remove('open-side');
}