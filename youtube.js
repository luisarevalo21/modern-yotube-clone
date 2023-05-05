// const formatter = Intl.NumberFormat("en", { notation: "compact" });

import axios from "axios";

const API_KEY = "AIzaSyCrSScIglbJ7sFvPC1Bu8OMuGBi2v8-pPM";
const VIDEO_LINK = "https://www.googleapis.com/youtube/v3/videos?";
const CHANNEL_END_POINT = "https://www.googleapis.com/youtube/v3/channels?";
const SEARCH_LINK = "https://www.googleapis.com/youtube/v3/search?";

export function loadMostPopularVideos() {
  console.log("most popular called");
  return (
    axios
      .get(VIDEO_LINK, {
        params: {
          key: API_KEY,
          part: "snippet",
          chart: "mostPopular",
          maxResults: 25,
          regionCode: "US",
        },
      })
      .then(({ data }) => {
        data.items.forEach(item => {
          getChannelIcon(item);
        });
        console.log("data after for each loop", data);
        return data;
      })
      // .then(data => console.log(data))
      .catch(err => console.error(err))
  );
}

function getChannelIcon(video) {
  return axios
    .get(CHANNEL_END_POINT, {
      params: {
        key: API_KEY,
        part: "snippet",
        id: video.snippet.channelId,
      },
    })
    .then(({ data }) => data.items)
    .then(item => {
      //   console.log("item", item);
      video.channelThumbnail = item[0].snippet.thumbnails.default.url;
      makeVideoCard(video);
    });
}

function setValue(selector, value, { parent = document } = {}) {
  // console.log(value);
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

const videoCardTemplate = document.getElementById("video-card-template");
const cardContainer = document.querySelector("[data-video-container]");

// function renderData(videoInformation) {
//   console.log(videoInformation);
//   videoInformation.items.forEach(video => {
//     console.log("video", video.channelThumbnail);
//     // const { channelThumbnail } = video;
//     const { title, channelTitle, viewCount, thumbnails, id } = video.snippet;

//     const element = videoCardTemplate.content.cloneNode(true);

//     setValue("title", title, { parent: element });
//     setValue("channel-name", channelTitle, { parent: element });
//     element.querySelector("[data-video-thumbnail]").src = thumbnails.high.url;
//     element.querySelector("[data-channel-thumbnail]").src = video.channelThumbnail;

//     console.log("id", id);
//     element.addEventListener("click", () => {
//       location.href = `https://youtube.com/watch?v=${id}`;
//     });
//     cardContainer.append(element);
//   });
// }

function makeVideoCard(video) {
  //   console.log(video.id);
  const { title, channelTitle, viewCount, thumbnails } = video.snippet;

  const element = videoCardTemplate.content.cloneNode(true);

  setValue("title", title, { parent: element });
  setValue("channel-name", channelTitle, { parent: element });
  element.querySelector("[data-video-thumbnail]").src = thumbnails.high.url;
  element.querySelector("[data-channel-thumbnail]").src = video.channelThumbnail;

  element.querySelector(".video").addEventListener("click", () => {
    location.href = `https://youtube.com/watch?v=${video.id}`;
  });

  cardContainer.append(element);
}
