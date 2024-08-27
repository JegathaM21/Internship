const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [{
        title: 'Track 1 - Sample Audio 1',
        artist: 'Bensound | Royalty Free Music',
        coverPath: 'img/track1.jfif',
        discPath: 'music/track1.mp3',
    },
    {
        title: 'Track 2 - Sample Audio 2',
        artist: 'Bensound | Royalty Free Music',
        coverPath: 'img/track2.jpg',
        discPath: 'music/track2.mp3',
    },
    {
        title: 'Track 3 - Sample Audio 3',
        artist: 'Bensound | Royalty Free Music',
        coverPath: 'img/track3.jpg',
        discPath: 'music/track3.mp3',
    },
    {
        title: 'Aasa Kooda (From "Think Indie")',
        artist: 'Sai Smrith | Assa kooda',
        coverPath: 'img/ASSAKOODA.jpeg',
        discPath: 'music/Aasa_Kooda.mp3',
    },
    {
        title: 'Achacho',
        artist: 'Kharesma Ravichandran,Srinisha Jayaseelan & Hiphop Tamizha',
        coverPath: 'img/ACCHO.jpeg',
        discPath: 'music/Achacho - Video Song _ Aranmanai 4  _ Sundar.C _ Tamannaah _ Raashii Khanna _ Hiphop Tamizha.mp3',
    },
];

window.addEventListener('load', function() {
    // Load song initially
    loadSong(songs[songIndex]);
})


// Load the given song
function loadSong(song) {
    var dur = 0;
    cover.src = song.coverPath;
    disc.src = song.discPath;
    title.textContent = song.title;
    artist.textContent = song.artist;
    disc.addEventListener('canplaythrough', function() {
        dur = disc.duration
        mins = Math.floor(Math.abs(dur / 60))
        mins = String(mins).padStart('2', 0)
        sec = Math.floor(dur - (parseInt(mins) * 60))
        sec = String(sec).padStart('2', 0)
        duration.textContent = `${mins}:${sec}`
    })
}

// Toggle play and pause
function playPauseMedia() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}

// Update icon
function updatePlayPauseIcon() {
    if (disc.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

// Update progress bar
function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow) {
        playPauseMedia();
    }
}

// Go to next song
function gotoNextSong(playImmediately) {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow || playImmediately) {
        playPauseMedia();
    }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

// Navigate song slider
function progressSlider(ev) {
    var is_playing = !disc.paused
    if (is_playing)
        disc.pause()
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
    if (is_playing)
        disc.play()
    document.addEventListener('mousemove', slideMoving);
    document.addEventListener('mouseup', function() {
        if (is_playing)
            disc.play()
        document.removeEventListener('mousemove', slideMoving);
    });

}

// Navigate song slider while moving
function slideMoving(ev) {
    var is_playing = !disc.paused
    if (is_playing)
        disc.pause()
    const totalWidth = progressContainer.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
    if (is_playing)
        disc.play()
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('mousedown', progressSlider);