// Settings to play around with
const snowMax = 600 // how much snow
const snowColor = ['#DDD', '#EEE'] // a list of flake colors
const snowShape = '&#x2022;' // a bullet point. try switching to emoji
const snowSpeed = 0.3 // how fast it falls
const snowMinSize = 10 // minimum snow flake size
const snowMaxSize = 25 // maximum snow flake size

// starting values, reset
let snow = [],
  pos = [],
  coords = [],
  left = [],
  marginBottom,
  marginRight

const randomise = range => {
  return Math.floor(range * Math.random())
}

// 1. Machine to create snow
const makeSnow = () => {
  for (i = 0; i <= snowMax; i++) {
    const flake = document.createElement('span')
    flake.innerHTML = `${snowShape}`
    flake.classList.add(`flake`, `flake${i}`)

    const globe = document.querySelector('.globe-inner')
    globe.appendChild(flake)
  }

  marginBottom = document.body.scrollHeight - 5
  marginRight = document.body.clientWidth - 15

  // setting up the styling & positioning for every flake
  for (i = 0; i <= snowMax; i++) {
    coords[i] = 0 // every flake starts at 0
    left[i] = Math.random() * 15
    pos[i] = 0.03 + Math.random() / 10
    snow[i] = document.querySelector('.flake' + i)
    snow[i].size = randomise(snowMaxSize - snowMinSize) + snowMinSize
    snow[i].style.fontSize = snow[i].size + 'px'
    snow[i].style.color = snowColor[randomise(snowColor.length)]
    snow[i].style.zIndex = Math.round(Math.random() * 10)
    snow[i].posX = randomise(marginRight - snow[i].size)
    snow[i].posY = randomise(marginBottom - 2 * snow[i].size)
  }
  moveSnow()
}

// 2. Machine to make the snow move
const moveSnow = () => {
  // for every update, (10 ms) we're moving every flake downwards, with a little wiggle to it
  for (i = 0; i <= snowMax; i++) {
    coords[i] += pos[i]
    snow[i].posY += (snowSpeed * snow[i].size) / 5
    snow[i].style.left = snow[i].posX + left[i] * Math.sin(coords[i]) + 'px'
    snow[i].style.top = snow[i].posY + 'px'

    // if the flake "hits the bottom" set it to start at the top again.
    if (snow[i].posY >= marginBottom - 2 * snow[i].size) {
      snow[i].posY = 0
    }
  }

  setTimeout('moveSnow()', 10)
}

// 3. Machine to stop the snow
const stopSnow = () => {
  snow = []
  pos = []
  coords = []
  left = []
  let flakes = document.querySelectorAll('.flake')
  flakes.forEach(flake => flake.remove())
}

const music = new Audio("Jingle-Bells.mp3") 
// This is where we control the snow globe
const toggle = document.querySelector('#globe-switch')
const globe = document.querySelector('.globe')

toggle.addEventListener("change", () => {
	if (toggle.checked) {
		makeSnow()
    music.play()
	} else {
		stopSnow()
    music.pause()
	}
})