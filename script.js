const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const QuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// loading spinner showen

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Remove Loading spinner 
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote from API//
async function getQuote() {
 loading();
  const proxyUrl = "https://myfirstprox.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknowen";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    complete();
  } catch (error) {
    getQuote();
  }
  // Tweet Quote
  function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, "_blank");
  }
  // Event Listeners
  tweetBtn.addEventListener("click", tweetQuote);
  QuoteBtn.addEventListener("click", getQuote);
}
// Load the Api
getQuote();
