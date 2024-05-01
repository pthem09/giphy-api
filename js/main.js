const API_PREFIX_GIFS = "api.giphy.com/v1/gifs/search?api-key=";
const API_PREFIX_STICKERS = "api.giphy.com/v1/stickers/search?api-key=";
const API_KEY = "734eYDXm24Vsbjq8iOtzC0EA1fW9XTyF";
const API_SETTINGS = "limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

function getPrompt(event) {
    event.preventDefault();
    let userSearch = document.querySelector("[name=memeSearch]").value;
    window.alert(userSearch);
}

document.querySelector("#memeForm").addEventListener("submit", getPrompt);