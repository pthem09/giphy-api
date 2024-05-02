const API_PREFIX_GIFS = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_PREFIX_STICKERS = "https://api.giphy.com/v1/stickers/search?api_key=";
const API_KEY = "734eYDXm24Vsbjq8iOtzC0EA1fW9XTyF";
const API_SETTINGS = "&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
var isChecked = true;

function chooseTheme() {
    let userTheme = "light";
    isChecked = !isChecked;
    if (isChecked === true) {
        userTheme = "dark";
    }
}

function getPrompt(event) {
    event.preventDefault();
    let userSearch = document.querySelector("[name=memeSearch]").value;
    userSearch = userSearch.replace(" ", "+");
    fetchMemes(userSearch);
}

function fetchMemes(textInput) {
    console.log(`${API_PREFIX_GIFS}${API_KEY}&q=${textInput}${API_SETTINGS}`);
    
    fetch(`${API_PREFIX_GIFS}${API_KEY}&q=${textInput}${API_SETTINGS}`)
        .then((data) => data.json())
        .then(returnImgs)
        .catch(() => alertUser("Content unavailable."));
}

function returnImgs(apiText) {
    let htmlFormat = "";

    if (apiText.length === 0 ){
        alertUser("No results -- try another search.");
    } else {
        for (let meme of apiText.data){
            htmlFormat += `
                <img src="${meme.images.original.url}" alt="${meme.alt_text}" class="meme-sticker" />
            `;
        }
    }

    document.querySelector(".js-display-memes").innerHTML = htmlFormat;

}

function alertUser(errText) {
    document.querySelector(".js-display-memes").innerHTML = `<div class="alert alert-warning">${errText}</div>`;
}

document.querySelector("#themeForm").addEventListener("change", chooseTheme);
document.querySelector("#memeForm").addEventListener("submit", getPrompt);