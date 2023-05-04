import { getYoutubeData } from "./youtube.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit").addEventListener("click", clicked);
});

function clicked(event) {
  getYoutubeData(event).then(renderData);
}

function setValue(selector, value, { parent = document } = {}) {
  console.log(value);

  parent.querySelector(`[data-${selector}]`).textContent = value;
}

const videoCardTemplate = document.getElementById("video-card-template");
const cardContainer = document.querySelector("[data-video-container]");

function renderData(videoInformation) {
  videoInformation.forEach(video => {
    const { id, player, thumbnail, title, channelTitle, viewCount } = video;
    // console.log(videoDetails[0]);
    // const ul = document.querySelector("[data-recommendations]");

    // temp.content;title,
    const element = videoCardTemplate.content.cloneNode(true);
    // console.log("title", { parent: element });

    setValue("video-title", title, { parent: element });
    setValue("channel-name", channelTitle, { parent: element });
    setValue("video-views", formatter.format(viewCount), { parent: element });
    // setValue("video-title", title, { parent: element });
    // setValue("data-image ", thumbnail, { parent: element });
    element.querySelector("[data-video-thumbnail]").src = thumbnail;
    // element.querySelector("[data-video]").src = player;

    // element.querySelector("[data-video]").src = player;
    // setValue("video", player, { parent: element });
    // el.querySelector("#title").innerHTML = title;

    cardContainer.append(element);
  });
  document.querySelector("[data-search]").placeholder = "Search";
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });
