

let baseDeck = [
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

let stayPlayers = [];
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelectorAll(".tile")
const hitKey = document.querySelectorAll(".hitKey")
const stayKey = document.querySelectorAll(".stayKey")
const keyboard = document.querySelectorAll(".key")
const sums = document.querySelectorAll(".sum")

function buildDeck(keyboard){
	if (keyboard.length>baseDeck.length) {
		deck = baseDeck.flatMap(i => [i,i])
	}
	else {
		deck = baseDeck
	}
	return
}	

buildDeck(keyboard)



let round = 0
let activePlayer=0
startInteraction()

function startInteraction() {
  showAlert(activePlayer, 5000)	

  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[hitKey]")) {
//	hitKey.classList.add("press")
    pressKey()
    return
  }

  if (e.target.matches("[stayKey]")) {
    pressStay()
    return
  }

}
function handleKeyPress(e) {
   showAlert("key", 5000)
   showAlert(deck.length, 5000)	
   showAlert(keyboard.length, 5000)		
   if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}


function pressKey() {

	const activeTile = guessGrid[round]
	const activeSum = sums[activePlayer]
	const activeKey = keyboard[activePlayer*7+round]
//	const nextTile = activeTile[round+1]
	cardSelect = Math.floor(Math.random() * deck.length)
    activeTile.textContent = deck[cardSelect]
    activeKey.textContent = deck[cardSelect]
    sumRound()
	
	activeSum.textContent = sumRound()
	deck.splice(cardSelect,1)
    playerChange()
	return
	  
}


//stopInteraction()

function pressStay() {
    showAlert("Stay Press", 5000)
    showAlert(stayPlayers, 5000)	
	stayPlayers.push(activePlayer)
    playerChange()
	    return
}

function playerChange() {
	activePlayer = activePlayer + 1
	if (stayPlayers.length > 0) {
	  isMatch=stayPlayers.indexOf(activePlayer)
	  if (isMatch>=0) {
	    activePlayer = activePlayer + 1
	  }	
	}
	guessGrid[round]=keyboard[activePlayer*7].textContent
	guessGrid[round+1]=keyboard[activePlayer*7+1].textContent	
	guessGrid[round+2]=keyboard[activePlayer*7+2].textContent		
	guessGrid[round+3]=keyboard[activePlayer*7+3].textContent	
	guessGrid[round+4]=keyboard[activePlayer*7+4].textContent	
	guessGrid[round+5]=keyboard[activePlayer*7+5].textContent	
	guessGrid[round+6]=keyboard[activePlayer*7+6].textContent	
}

		
function sumRound() {
	let roundSum = 0
    roundSum = roundSum+Number(keyboard[activePlayer*7].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+1].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+2].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+3].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+4].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+5].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+6].textContent)
	return
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

