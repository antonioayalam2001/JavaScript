// Song data
const songList = [
  {
    title: "Acoustic Breeze",
    file: "acousticbreeze.mp3",
    cover: "1.jpeg",
  },
  {
    title: "A New Beginning",
    file: "anewbeginning.mp3",
    cover: "2.jpeg",
  },
  {
    title: "Creative Minds",
    file: "creativeminds.mp3",
    cover: "3.jpeg",
  },
];

let actualSong = null

// Capturando elementos del DOM
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');

const progressBar = document.getElementById('progress');
const progressContainer = document.getElementById('progress_container');
// Mostrar Listado de canciones
const songContainer = document.querySelector('.song_list');
const audio = document.getElementById('audio');

const cover = document.getElementById('cover');
const title = document.querySelector('.title');


//

const durationTime = document.getElementById('duration');
const totalDuration = document.getElementById('total_duration');



progressContainer.addEventListener("click", setProgress);

audio.addEventListener("timeupdate", updateProgress);

play.addEventListener('click', () => { 
  if (play.classList.contains('fa-play')) { 
    playSong()
  } else  {
    console.log('hola');
    pauseSong()
  }
})

prev.addEventListener('click', () => {
  prevSong()
})
next.addEventListener("click", () => {
  nextSong();
});

function loadSongs(songList) {
    
    songList.forEach((cancion,index) => {
        // Creando elemento de la lista
        let lista = document.createElement('li')
        // Creando etiqueta dde enlace
        let link = document.createElement('a')
        // Agregando atributo de referencia
        link.href = '#'
        // Esucchar click
      link.addEventListener('click', () => {
        loadSong(index)
      })
        // Dando valor a la etiqueta
        link.textContent = cancion.title
        lista.appendChild(link)
        // Añadiendo al contenedo
        songContainer.appendChild(lista)
    })
}

// Carcar cancion Seleccionada
function loadSong(songIndex) {

  if (songIndex<0) {
    songIndex=2
  } else if (songIndex > songList.length - 1) {
    songIndex=0
  }
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex)
    actualSong = songIndex
    audio.src = `./audio/${songList[songIndex].file}`
    audio.play()
    updateUI()
    cover.src = `./img/${songList[songIndex].cover}`
    title.textContent = `${songList[songIndex].title}`
  }
}

function changeActiveClass(lastIndex,newIndex) {
  const links = document.querySelectorAll('a');
  if (lastIndex!==null) {
    links[lastIndex].classList.remove('activo')
  }
    links[newIndex].classList.add('activo')
}

// Actualizar progreso de la canción
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement
  totalDuration.innerText = `${(duration/60).toFixed(2)} `
  durationTime.innerText = `${Math.round(currentTime)}`;
  const percent = (currentTime / duration) * 100
  progressBar.style.width = `${percent}%`
  //Total y actual del porcentaje
  // audio.currentTime()
  // audio.ended()
  // audio.timeUpdate()
}


function setProgress(event) {
  const totalWidth = this.offsetWidth
  const progressWidth = event.offsetX
  const current = progressWidth / totalWidth * audio.duration
  audio.currentTime=current
}


// Actualizar controles
function updateUI() {
  if (audio.paused) {
    play.classList.remove('fa-pause')
    play.classList.add('fa-play')
  } else { 
    play.classList.add('fa-pause') 
    play.classList.remove('fa-play')
  }
}

function playSong() {
  if (actualSong!==null) {
    audio.play()
    updateUI();
  }
}

function pauseSong() {
  audio.pause()
  updateUI();
}

function prevSong() {
  loadSong(actualSong-1)  
}
function nextSong() {
  loadSong(actualSong+1)
  
}

audio.addEventListener('ended', nextSong)



// function prevSong() {
//   let newIndex = actualSong
//   newIndex--
//   if (actualSong!==null) {
//     if (newIndex < 0) {
//       newIndex = songList.length-1;
//       loadSong(newIndex)
//     } else { 
//       loadSong(newIndex)
//     } 
//   }
//   loadSong(newIndex)
// }

// function nextSong() {
//   let newIndex = actualSong;
//   newIndex++
//   if (actualSong !== null) {
//     if (newIndex > songList.length - 1) {
//       newIndex = 0;
//       loadSong(newIndex);
//     } else {
//       loadSong(newIndex);
//     }
//   }
//   loadSong(newIndex);
// }

loadSongs(songList)


