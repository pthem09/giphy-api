const API_PREFIX_GIFS = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_PREFIX_STICKERS = "https://api.giphy.com/v1/stickers/search?api_key=";
const API_KEY = "734eYDXm24Vsbjq8iOtzC0EA1fW9XTyF";
const API_SETTINGS = "&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
const H1_LIGHT_TEXT = "Great Memes All Day";
const H2_LIGHT_TEXT = "Everyday";
const H1_DARK_TEXT = "Your Meme Dream Team";
const H2_DARK_TEXT = "You have great memes at your fingertips";
var isDark = true; //default setting for dark mode toggle
var isGif = true;

changeText(isDark);

function chooseTheme() {
    isDark = !isDark;
    document.getElementById("body-theme").classList.toggle("body-light");
    document.getElementById("img-theme").classList.toggle("img-light");
    changeText(isDark);
}

function gifBool() {
    isGif = !isGif;
/*    
    if (isGif === true) {
        console.log("gif");
    } else {
        console.log("sticker");
    }
*/

    document.getElementById("gif-radio-vis").classList.toggle("gif-selected");
    document.getElementById("sticker-radio-vis").classList.toggle("gif-selected");

}

function changeText(themeCheck) {
    if (themeCheck === false) {
        document.getElementById("h1-theme-target").innerText = H1_LIGHT_TEXT;
        document.getElementById("h2-theme-target").innerText = H2_LIGHT_TEXT;
    } else {
        document.getElementById("h1-theme-target").innerText = H1_DARK_TEXT;
        document.getElementById("h2-theme-target").innerText = H2_DARK_TEXT;
    }
}
function getPrompt(event) {
    event.preventDefault();
    let userSearch = document.querySelector("[name=memeSearch]").value;
    userSearch = userSearch.replace(" ", "+");
    if (isGif === true) {
        fetchMemes(userSearch, API_PREFIX_GIFS);
    } else {
        fetchMemes(userSearch, API_PREFIX_STICKERS);
    }
}

function fetchMemes(textInput, apiPrefix) {
    //console.log(`${apiPrefix}${API_KEY}&q=${textInput}${API_SETTINGS}`);
    fetch(`${apiPrefix}${API_KEY}&q=${textInput}${API_SETTINGS}`)
        .then((data) => data.json())
        .then(returnImgs)
        .catch(() => alertUser("Content unavailable."));
}

function returnImgs(apiText) {
    let htmlFormat = "";

    if (apiText.data.length === 0 ){
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
    document.querySelector(".js-display-memes").innerHTML = `
        <div class="alert alert-warning">${errText}</div>
    `;
}

document.querySelector("#themeForm").addEventListener("change", chooseTheme);
document.querySelector("#memeForm").addEventListener("submit", getPrompt);
document.querySelector("#gif-radio").addEventListener("change", gifBool);
document.querySelector("#sticker-radio").addEventListener("change", gifBool);