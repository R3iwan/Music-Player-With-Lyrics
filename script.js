const audio = document.getElementById('audio');
const lyricsDisplayElement = document.getElementById('lyrics');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
let currentDisplayedLyrics = ''; 
let lyricsData; 

fetch('lyrics.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        lyricsData = data;
    })
    .catch(error => console.error('Error fetching lyrics: ', error));

function displayLyrics() {
    const currentTime = Math.floor(audio.currentTime);
    console.log("Current Time:", currentTime);
    const currentLyrics = lyricsData.find(lyric => lyric.time === currentTime);
    console.log("Current Lyrics:", currentLyrics);
    if (currentLyrics && currentDisplayedLyrics !== currentLyrics.text) {
        lyricsDisplayElement.innerText = currentLyrics.text;
        currentDisplayedLyrics = currentLyrics.text; 
    }
}

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerText = 'Pause';
    } else {
        audio.pause();
        playPauseButton.innerText = 'Play';
    }
});

stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.innerText = 'Play';
});

audio.addEventListener('timeupdate', displayLyrics);