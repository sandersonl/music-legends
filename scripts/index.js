
const MAX_TIME = 100

let TOTAL_MUSIC = 0
let time = 0
let music = 0
let musics = []
let isPlaying = false
let timeEvent = null

function changeMusic(direction) {
  music = music + direction

  time = 0
  const timeline = document.getElementById('timeline')
  timeline.style.width = `${time}%`

  if(music < 0) {
    music = TOTAL_MUSIC - 1
  } else if(music > TOTAL_MUSIC - 1){
    music = 0
  }

  document.querySelector('.controll span').innerHTML = `${music + 1} / ${TOTAL_MUSIC}`

  document.querySelectorAll('h2').forEach((element) => {
    element.innerHTML = musics[music].name
  })
  document.querySelectorAll('h3').forEach((element) => {
    element.innerHTML = musics[music].artist
  })

}

fetch('../musics.json').then( response => response.json()).then(data => {
  musics = data
  TOTAL_MUSIC = data.length
  changeMusic(0)
})

function handleToggle() {
  const buttonToggle = document.getElementById('button__toggle')
  const navigation = document.getElementById('navigation')

  buttonToggle.classList.toggle('active')
  navigation.classList.toggle('active')
}

function changeIconButtonPlay() {
  const buttonPlay = document.getElementById('button__play')

  if(isPlaying){
    buttonPlay.classList.remove('play')
    buttonPlay.classList.add('pause')
  } else {
    buttonPlay.classList.remove('pause')
    buttonPlay.classList.add('play')
  }
}

function resetMusic() {
  time = 0
  changeMusic(1)
  isPlaying = false
  changeIconButtonPlay()
  clearInterval(timeEvent)
}

function playMusic() {
  isPlaying = !isPlaying
  changeIconButtonPlay()

  if (isPlaying) {
    const timeline = document.getElementById('timeline')

    timeEvent = setInterval(() => {
      if (time >= MAX_TIME) {
        resetMusic()
      }
      time ++
      timeline.style.width = `${time}%`
    }, 500)
  } else {
    clearInterval(timeEvent)
  }
}

const eventsKeydown = {
  Space: () => playMusic(),
  ArrowRight: () => changeMusic(1),
  ArrowLeft: () => changeMusic(-1),
}

document.addEventListener('keydown', (event)=> {
  const { code } = event
  eventsKeydown[code]()
})