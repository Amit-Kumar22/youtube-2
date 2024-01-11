//console.log("amit")
const vedioCardContainer = document.querySelector(".video-container");
let userdata=JSON.parse(localStorage.getItem("video"));
console.log(userdata);
const playCont=document.getElementById("play");
const down=document.getElementById("down");
const detail=document.getElementById("details")
function playVideo(userdata){
    
    let iframe=document.createElement("iframe");
    iframe.src=`https://www.youtube.com/embed/${userdata.videoId}`;
    iframe.setAttribute('allowFullScreen', '')
    playCont.appendChild(iframe)
    detail.innerHTML=`
    <div id="detail">
    <p class="description">${userdata.snip.publishTime}</p>
                    <p><span class="title" > ${userdata.snip.title}</span><span class="ctitle" >by ${userdata.snip.channelTitle}</span></p>
                    
                </div>
    `
}
playVideo(userdata)
let api_key = "AIzaSyA9TUTdeZPdtfuSjEl2d6ZW9vukE5hfO8g";
let vedio_http =   "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

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
//setTimeout

const makeVedioCard = (data) => {
  let snip = data.snippet;
  let videoId = data.id;
  let div = document.createElement("div");
  div.innerHTML += `
    <div class="vedio">
         <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="channel thumbnail">
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
  down.append(div);
};



const cont = document.getElementById("container")
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

function searchYou() {
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
          // Hadle Loader
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
    <div class="vedio1">
         <img src="${videoThumbnail}" heigth = 300px width = 300px class="thumbnail1" alt="channel thumbnail">
           <div class="content1">
              <img src="${videoThumbnail}" class="channel-icon1" alt="channel icon">
                  <div class="info1">
                     <h4 class="title1">${videoTitle}</h4>
                     <p class="channel-name1">${data.snippet.channelTitle}</p>
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
    cont.style.display="none"
  });
}
