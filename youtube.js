// AIzaSyCrSScIglbJ7sFvPC1Bu8OMuGBi2v8 - pPM;

const API_KEY = "YOUR_API_KEY";
const VIDEO_LINK = "https://www.googleapis.com/youtube/v3/videos?";
const SEARCH_LINK = "https://www.googleapis.com/youtube/v3/search?";

export function getYoutubeData(event) {
  event.preventDefault();
  if (document.querySelector("[data-search]").value !== "") {
    const searchValue = document.querySelector("[data-search]").value;
    console.log("searh value", searchValue);

    return fetch(
      SEARCH_LINK +
        new URLSearchParams({
          key: API_KEY,
          q: searchValue,
          maxResults: 5,
          type: "video",
        })
    )
      .then(res => res.json())
      .then(({ items }) => {
        console.log("items", items);
        return items.map(vidInfo => {
          return vidInfo.id.videoId;
        });
      })
      .then(async ids => {
        return await fetchVideoDetail(ids);
      })

      .catch(err => console.log(err));
  }
}

async function fetchVideoDetail(videos) {
  //gets the data
  //look up how to remove the id and key from search string
  //parse the items data array and keep what i want
  // video snippet, title views, etc.

  const videoData = [];
  for (const vid of videos) {
    console.log(vid);
    const response = await fetch(
      VIDEO_LINK +
        new URLSearchParams({
          key: API_KEY,
          part: "snippet,player,statistics",
          id: vid,
        })
    );

    const result = await response.json();

    videoData.push({
      id: result.items[0].id,
      thumbnail: result.items[0].snippet.thumbnails.default.url,
      player: result.items[0].player.embedHtml,
      title: result.items[0].snippet.title,
      channelTitle: result.items[0].snippet.channelTitle,
      viewCount: result.items[0].statistics.viewCount,
    });
  }

  console.log("video data", videoData);
  return videoData;
}
