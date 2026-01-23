let deck = [
	"0",
	"1",
	"2",
	"2",
	"3",
	"3",
	"3",
	"4",
	"4",
	"4",
	"4",
	"5",
	"5",
	"5",
	"5",
	"5",
	"6",
	"6",
	"6",
	"6",
	"6",
	"6",
	"7",
	"7",
	"7",
	"7",
	"7",
	"7",
	"7",
	"8",
	"8",
	"8",
	"8",
	"8",
	"8",
	"8",
	"8",
	"9",
	"9",
	"9",
	"9",
	"9",
	"9",
	"9",
	"9",
	"9",
	"10",
	"10",
	"10",
	"10",
	"10",
	"10",
	"10",
	"10",
	"10",
	"10",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"11",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12",
	"12"
]

//const winMessages = [



// const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")

startInteraction()

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[hitKey]")) {
    kitKey.classList.add("press")
    pressKey()
    return
  }

//  if (e.target.matches("[stayKey]")) {
//    submitGuess()
//    return
//  }

}
function handleKeyPress(e) {
   if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}


function pressKey() {
  const activeTiles = getActiveTiles()
  const nextTile = guessGrid.querySelector(":not([data-letter])")
//  cardSelect = Math.floor(Math.random()*(1,deck.length)-1)
//  nextTile.textContent = deck[cardSelect]
  nextTile.textContent = "1"
//  deck=deck.splice(1,cardSelect)
  nextTile.dataset.state = "active"
}



stopInteraction()





function getActiveTiles() {
  return guessGrid.querySelectorAll('.tile[data-state="active"]')
}

function getAllTiles() {
  return guessGrid.querySelectorAll(".tile")
}
