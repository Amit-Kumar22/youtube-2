const load = document.getElementById("load");

const vedioCardContainer = document.querySelector(".video-container");
const videodisplay = document.getElementById("video-container");

let api_key = "AIzaSyAvQ5O4FWAmdGZeVSi-58-2jJf8L4jnz5E";
let vedio_http =   "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

//"YouTube Data API v3 has not been used in project 634054953674 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=634054953674 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry."

fetch(
  vedio_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 75,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (vedio_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: vedio_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      vedio_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVedioCard(vedio_data);
    });
};

const makeVedioCard = (data) => {
  let snip = data.snippet;
  let videoId = data.id;
  let div = document.createElement("div");
  div.innerHTML += `
    <div class="vedio">
         <img src="${data.snippet.thumbnails.high.url}" heigth = 300px width = 300px class="thumbnail" alt="channel thumbnail">
           <div class="content">
              <img src="${data.channelThumbnail}" class="channel-icon" alt="channel icon">
                  <div class="info">
                     <h4 class="title">${data.snippet.title}</h4>
                     <p class="channel-name">${data.snippet.channelTitle}</p>
                  </div> 
                 </div>
                </div>
                `;
  let obj = {
    snip,
    videoId,
  };
  div.addEventListener("click", (e) => {
      localStorage.setItem("video", JSON.stringify(obj));
    window.location.href = "xcv.html";
  });
  vedioCardContainer.append(div);
};

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
// setTimeout
function searchYouTube() {
  const query = searchInput.value;

  gapi.load("client", () => {
    gapi.client
      .init({
        apiKey: api_key,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
        ],
      })
      .then(() => {
        // Make API request
        return gapi.client.youtube.search.list({
          part: "snippet",
          q: query,
          maxResults: 35,
          type: "video",
        });
      })
      .then(
        (response) => {
          // Handle the API response
          displayResults(response.result.items);
        },
        (error) => {
          console.error("Error loading YouTube API", error);
        }
      );
  });
}

function displayResults(items) {
  vedioCardContainer.innerHTML = "";

  items.forEach((data) => {
    console.log(data);
    const videoTitle = data.snippet.title;
    const videoId = data.id.videoId;
    const videoThumbnail = data.snippet.thumbnails.high.url;
    const gaya = data.snippet.thumbnails;

    let snip = data.snippet;
    let div = document.createElement("div");
    div.innerHTML += `
    <div class="vedio">
         <img src="${videoThumbnail}" heigth = 300px width = 300px class="thumbnail" alt="channel thumbnail">
           <div class="content">
              <img src="${videoThumbnail}" class="channel-icon" alt="channel icon">
                  <div class="info">
                     <h4 class="title">${videoTitle}</h4>
                     <p class="channel-name">${data.snippet.channelTitle}</p>
                  </div> 
                 </div>
                </div>
                `;
    // const cv=document.querySelector(".vedio")
    let obj = {
      snip,
      videoId,
    };
    div.addEventListener("click", (e) => {
        localStorage.setItem("video", JSON.stringify(obj));
        window.location.href = "xcv.html";
    });
    vedioCardContainer.append(div);
  });
}
