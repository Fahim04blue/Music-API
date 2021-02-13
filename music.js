const searchBTN = document.getElementById('search-btn');
const songDisplay = document.getElementById('songDisplay');
const songLyrics = document.getElementById('songLyrics');
const errorTag = document.getElementById('error-msg');
searchBTN.addEventListener('click', getSongName);

async function getSongName() {
    const searchSong = document.getElementById('search-song').value;
    const searchURL = `https://api.lyrics.ovh/suggest/${searchSong}`;
    toggle();
    try {
        const response = await fetch(searchURL);
        const data = await response.json();
        displaySong(data.data) 
    } catch (error) {
        songDisplay.innerHTML='';
        displayError("Sorry! This Song is Not Available at this moment");
    }
    //console.log(searchURL)
    
    // console.log(data);
    // return data;
}
// getSongName.then(data=>{ // Can't do that because click er time e already function call hoye gese.
//     displaySong(data);
// });

const displaySong = songs => {
    let markup = '';
    errorTag.innerHTML='';
    songs.forEach(song => {
        markup += `
           <div class="search-result col-md-8 mx-auto py-4">
            <div class="single-result row align-items-center my-3 p-3">
              <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
                </audio>
              </div>
             
              <div class="col-md-3 text-md-right text-center">
                <button onClick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
              </div>
            </div>
          </div>
           `
    });
    songLyrics.innerHTML = '';
    songDisplay.innerHTML = markup;
    toggle();
}

async function getLyrics(artist, title) {
    const lyricsURL = `https://api.lyrics.ovh/v1/${artist}/${title}`
    toggle();
    try {
        const response = await fetch(lyricsURL)
        const data = await response.json();
        displayLyrics(data.lyrics);
        console.log(data.lyrics);
    } catch (error) {
        displayError("Oppss!Lyrics Not Available");
    }

}

function displayLyrics(lyrics ) {
    errorTag.innerHTML='';
    songLyrics.innerText = lyrics;
    toggle();

}

const displayError = error => {
   
    errorTag.innerText = error;
}

const toggle=()=>{
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('d-none');
    songDisplay.classList.toggle('d-none');
}