let musicCardStr = " ";
let musicCardContainer = document.querySelector(".music-card-container");
for (let i = 1; i <= 6; i++) {
  musicCardStr += `<div class="music-card">
            <div class="music-card-cover"><img src="material\\card${i}img.jpeg" alt=""></div>
            <div class="music-card-info">
              <span class="music-name">Ashiquie</span>
              <span class="music-singer">Nikunj Gohel, Raj Gohel</span>
            </div>
          </div>`;
}
musicCardContainer.innerHTML = musicCardStr;

let songListStr = "";
let songListContainer = document.querySelector(".song-list-container");
for (let i = 1; i <= 10; i++) {
  songListStr += `<div class="song-list-card">
            <div class="song-list-logo"><i class="fa-solid fa-music" style="color:#8F8F8F"></i>
            </div>
            <div class="song-list-info">
              <div class="song-list-info-one">Love ${i}</div>
              <div class="song-list-info-two">mp3:Nikunj Gohel</div>
            </div>
          </div>`
}
songListContainer.innerHTML = songListStr;