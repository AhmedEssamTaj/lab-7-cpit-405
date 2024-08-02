let xhrButton = document.getElementById("search");
let searchFetchAsyncAwaitButton = document.getElementById("searchFetchAsyncAwait");
let searchFetchButton = document.getElementById("searchFetch");
let input = document.getElementsByTagName("input")[0];
let searchResults = document.getElementById("searchResults");

const apiKey = "JzeKzTFSyVZnraB8QJTE2PAgUN4l11DX";

xhrButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingXHR(q);
});

searchFetchButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingFetch(q);
});

searchFetchAsyncAwaitButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingFetchAsyncAwait(q);
});

function getImagesUsingXHR(q) {
  let images = [];
  let xhr = new XMLHttpRequest();
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let jsonText = xhr.responseText;
      let resObj = JSON.parse(jsonText);
      for (let item of resObj.data) {
        images.push(item.images.downsized_medium.url);
      }
      generateImgElements(images);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function getImagesUsingFetch(q) {
  let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
  let images = [];
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((respObj) => {
      for (let item of respObj.data) {
        images.push(item.images.downsized_medium.url);
      }
      generateImgElements(images);
    })
    .catch((e) => {
      console.log("error: " + e);
    });
}

async function getImagesUsingFetchAsyncAwait(q) {
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
  let images = [];
  let response = await fetch(url);
  let responseObj = await response.json();
  for (let item of responseObj.data) {
    images.push(item.images.downsized_medium.url);
  }
  generateImgElements(images);
}

function generateImgElements(imagesURLs) {
  for (let imageURL of imagesURLs) {
    let imgElement = document.createElement("img");
    imgElement.src = imageURL;
    searchResults.appendChild(imgElement);
  }
}