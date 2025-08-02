let currentSong = new Audio();

let body = document.querySelector("body");
let playMusicCount = 0;
let songs;

async function getData() {
  //fetch song from link
  let s = await fetch("http://127.0.0.1:5500/whole%20Spotify/songs/");

  // fetch detaill convert in detail and store in responce
  let responce = await s.text();

  // create div and store html foramat of data (responce)
  let div = document.createElement("div");
  div.innerHTML = responce;

  // devide a tag from another html tags
  let as = div.getElementsByTagName("a");

  let songs = []; // for store songs name the format of array
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }

  return songs;
}
//play song
const playSong = (track, paused = false) => {

  currentSong.src = `\\whole Spotify\\songs\\` + track;
  console.log(currentSong)
  if (!paused) {
    currentSong.play();
    play.src = "svg\\pause.svg";
  }

  document.querySelector(".songInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = `00:00/00:00`;
};

function convertSeconds(seconds) {
  // Calculate minutes and remaining seconds
  if (isNaN(seconds) || seconds < 0) {
    return `00:00`
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Add leading zero to seconds if it's less than 10
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // Return the formatted time
  return `${minutes}:${formattedSeconds}`;
}

//main Function
async function main() {
  songs = await getData();
  console.log(songs[0].replaceAll("%20", " "))
  playSong(songs[playMusicCount].replaceAll("%20", " "), true); // by default first song is apeared

  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];

  for (let song of songs) {
    song = song.slice("/songs");
    songUl.innerHTML =
      songUl.innerHTML +
      `                                       <li class="invert">
                                              <img src="svg\\music.svg"class="musicListLogo" alt="">
                                              <div class="musicInfo">
                                                <div>${song.replaceAll(
        "%20",
        " "
      )}</div>
                                                <div>Song Artist</div>
                                              </div>
                                              <span>
                                                Play now
                                                <img src="svg\\play.svg" alt="">
                                              </span></li>`;
  }

  //for click song and play song

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".musicInfo").firstElementChild.innerHTML);
      playSong(
        e.querySelector(".musicInfo").firstElementChild.innerHTML.trim()
      );
    });
  });

  // attach event listener to next , previous and play button

  play.addEventListener("click", () => {
    console.log("play button is clicked");
    if (currentSong.paused) {
      play.src = "svg\\pause.svg";

      currentSong.play();
    } else {
      play.src = "svg\\play.svg";

      currentSong.pause();
    }
  });
  currentSong.addEventListener("timeupdate", () => {
    console.log(
      convertSeconds(currentSong.currentTime),
      " ",
      currentSong.duration
    );
    // for get time and duration of song
    document.querySelector(".songTime").innerHTML = `${convertSeconds(
      Math.floor(currentSong.currentTime)
    )} / ${convertSeconds(Math.floor(currentSong.duration))}`;

    // for seekCircle 
    document.querySelector(".seekCircle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //Event listener on seekbar
  document.querySelector(".seekBar").addEventListener("click", (e) => {
    console.log(e.x);
    console.log(e);
    let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".seekCircle").style.left = persent + "%";

    currentSong.currentTime = ((currentSong.duration) * persent) / 100;
  })

  //add eventListener to hamBurger
  document.querySelector(".hamBurger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";


  })

  //add eventListener to close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";

  })

  // add eventListener to previos button
  previous.addEventListener("click", () => {
    console.log("Previos is clicked");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(index)
    if ((index - 1) >= 0) {
      playSong(songs[index - 1])

    }
  })
  //add eventListener to next button
  next.addEventListener("click", () => {
    console.log("next is clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(index)
    if ((index + 1) < songs.length) {
      playSong(songs[index + 1])
    }
    else {
      playSong(songs[0]);
    }
  })

  //add eventListener to volume seek bar

  document.querySelector(".range").addEventListener("change", (e) => {
    console.log(e.target, e.target.value);
    currentSong.volume = parseInt(e.target.value) / 100;
  })
}

main();
