const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "No Ordinary Love",
    artist: "Sade",
    duration: "7:20",
    src: "https://ia801508.us.archive.org/5/items/sade_20220313/Sade%20-%201992%20-%20Love%20Deluxe%20%28DE%20-%20Epic%20-%20472626%202%20-%201992-10-23%29/Sade%20-%201992%20-%20Love%20Deluxe%20-%2001%20-%20No%20Ordinary%20Love.mp3",
  },
  {
    id: 1,
    title: "Kiss Of Life",
    artist: "Sade",
    duration: "5:51",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade%20-%201992%20-%20Love%20Deluxe%20%28DE%20-%20Epic%20-%20472626%202%20-%201992-10-23%29/Sade%20-%201992%20-%20Love%20Deluxe%20-%2005%20-%20Kiss%20Of%20Life.mp3",
  },
  {
    id: 2,
    title: "Cherish The Day",
    artist: "Sade",
    duration: "5:35",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade%20-%201992%20-%20Love%20Deluxe%20%28DE%20-%20Epic%20-%20472626%202%20-%201992-10-23%29/Sade%20-%201992%20-%20Love%20Deluxe%20-%2006%20-%20Cherish%20The%20Day.mp3",
  },
  {
    id: 3,
    title: "Bullet Proof Soul",
    artist: "Sade",
    duration: "5:26",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade%20-%201992%20-%20Love%20Deluxe%20%28DE%20-%20Epic%20-%20472626%202%20-%201992-10-23%29/Sade%20-%201992%20-%20Love%20Deluxe%20-%2008%20-%20Bullet%20Proof%20Soul.mp3",
  },
  {
    id: 4,
    title: "Somebody Already Bkoke My Heart",
    artist: "Sade",
    duration: "5:01",
    src: "https://ia801508.us.archive.org/5/items/sade_20220313/Sade%20-%202000%20-%20Lovers%20Rock%20%28DE%20-%20Epic%20-%20500%20766%202%20-%202000-11-14%29/Sade%20-%202000%20-%20Lovers%20Rock%20-%2004%20-%20Somebody%20Already%20Broke%20My%20Heart.mp3",
  },
  {
    id: 5,
    title: "Smooth Operator",
    artist: "Sade",
    duration: "5:00",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade/Sade%20-%201984%20-%20Diamond%20Life%20%28JP%20-%20EPIC_SONY%20-%2025•8P-5190%20-%201989-03-01%29/Sade%20-%201984%20-%20Diamond%20Life%20-%2001%20-%20Smooth%20Operator.mp3",
  },
  {
    id: 6,
    title: "Hang On To Your Love",
    artist: "Sade",
    duration: "6:01",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade/Sade%20-%201984%20-%20Diamond%20Life%20%28JP%20-%20EPIC_SONY%20-%2025•8P-5190%20-%201989-03-01%29/Sade%20-%201984%20-%20Diamond%20Life%20-%2003%20-%20Hang%20On%20To%20Your%20Love.mp3",
  },
  {
    id: 7,
    title: "Paradise",
    artist: "Sade",
    duration: "4:02",
    src: "https://ia601508.us.archive.org/5/items/sade_20220313/Sade/Sade%20-%201988%20-%20Stronger%20Than%20Pride%20%28JP%20-%20EPIC_SONY%20-%2025•8P-5015%20-%201988-04-29%29/Sade%20-%201988%20-%20Stronger%20Than%20Pride%20-%2002%20-%20Paradise.mp3",
  },
  {
    id: 8,
    title: "Cherry Pie",
    artist: "Sade",
    duration: "6:19",
    src: "https://ia801508.us.archive.org/5/items/sade_20220313/Sade/Sade%20-%201984%20-%20Diamond%20Life%20%28JP%20-%20EPIC_SONY%20-%2025•8P-5190%20-%201989-03-01%29/Sade%20-%201984%20-%20Diamond%20Life%20-%2006%20-%20Cherry%20Pie.mp3",
  },
  {
    id: 9,
    title: "Nothing Can Come Between Us",
    artist: "Sade",
    duration: "4:24",
    src: "https://ia801508.us.archive.org/5/items/sade_20220313/Sade/Sade%20-%201988%20-%20Stronger%20Than%20Pride%20%28JP%20-%20EPIC_SONY%20-%2025•8P-5015%20-%201988-04-29%29/Sade%20-%201988%20-%20Stronger%20Than%20Pride%20-%2003%20-%20Nothing%20Can%20Come%20Between%20Us.mp3",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());