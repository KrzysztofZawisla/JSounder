import {
    Howl,
    Howler
} from 'howler';

import './style.css';

const playButton = document.querySelector('#play-button');


const backButton = document.querySelector('#back-button');
const forwardButton = document.querySelector('#forward-button');
const progressFill = document.querySelector('#progress-bar-fill');
const progressBar = document.querySelector('#progress-bar');
const addMedia = document.querySelector('#media-button')
const volumeControl = document.querySelector('#volume-control');


let isPlaying = false;

// const songs = ['audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3'];
const songs = [
    new Howl({
        src: 'audio/1.mp3',
        loop: false,
        volume: 0.5
    }),
    new Howl({
        src: 'audio/2.mp3',
        loop: false,
        volume: 0.5
    }),
    new Howl({
        src: 'audio/3.mp3',
        loop: false,
        volume: 0.5
    })
];

let index = 0;

let sound = songs[index];



volumeControl.addEventListener('input', (e) => {
    sound.volume(e.target.value / 100);
})

addMedia.addEventListener('click', async () => {
    // const [media] = await window.showOpenFilePicker({
    //     types: [{
    //         description: 'Music files',
    //         accept: {
    //             'audio/*': []
    //         }
    //     }, ],
    //     excludeAcceptAllOption: true,
    //     multiple: false
    // });
    // const file = await media.getFile();

    // console.log(file);

    const directory = await window.showDirectoryPicker();

    // const reader = new FileReader();
    // reader.addEventListener('load', async () => {
    //     const data = reader.result;

    //     console.log(data);

    //     sound = new Howl({
    //         src: data,
    //         loop: false,
    //         volume: 1
    //     });

    // })

    // reader.readAsArrayBuffer(directory);
});


forwardButton.addEventListener('click', () => {
    sound.stop();
    if (index < songs.length - 1) {
        index++;
    } else {
        index = 0;
    }
    sound = songs[index];
    sound.play();
    isPlaying = true;
    updatePlayButton(isPlaying);
});

backButton.addEventListener('click', () => {
    sound.stop();
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1;
    }
    sound = songs[index];
    sound.play();
    isPlaying = true;
    updatePlayButton(isPlaying);

});



playButton.addEventListener('click', () => {
    if (isPlaying) {
        sound.pause();
        isPlaying = false;
    } else {
        sound.play();
        isPlaying = true;
    }
    updatePlayButton(isPlaying);
});

progressBar.addEventListener('click', (e) => {
    const progressBarWidth = progressBar.offsetWidth;
    sound.seek((e.offsetX / progressBarWidth) * sound.duration());
});


const updatePlayButton = (state) => {
    playButton.innerHTML = state ? "" : "";
};


sound.on('end', () => {
    isPlaying = false;
    updatePlayButton(isPlaying);
    forwardButton.click();

});



setInterval(() => {
    progressFill.style.width = `${sound.seek() / sound.duration() * 100}%`;
}, 50);