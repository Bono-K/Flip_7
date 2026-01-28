

let baseDeck = [
//	"0",
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

	const activeKey = keyboard[activePlayer*7+round]
//	const nextTile = activeTile[round+1]
	cardSelect = Math.floor(Math.random() * deck.length)
    activeTile.textContent = deck[cardSelect]
    activeKey.textContent = deck[cardSelect]
	activeTile.textContent = deck[cardSelect]
    bust()
	deck.splice(cardSelect,1)
    playerChange()
	return
	  
}


//stopInteraction()

function pressStay() {	
	stayPlayers.push(activePlayer)
	sums[activePlayer].classList.add("stay")		
	keyboard[activePlayer*7].classList.add("stay")	
	keyboard[activePlayer*7+1].classList.add("stay")	
	keyboard[activePlayer*7+2].classList.add("stay")	
	keyboard[activePlayer*7+3].classList.add("stay")	
	keyboard[activePlayer*7+4].classList.add("stay")	
	keyboard[activePlayer*7+5].classList.add("stay")	
	keyboard[activePlayer*7+6].classList.add("stay")	
    playerChange()
	    return
}

function playerChange() {
	removeStatusUpdate (keyboard, active)
	let roundSum = 0
    roundSum = roundSum+Number(keyboard[activePlayer*7].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+1].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+2].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+3].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+4].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+5].textContent)
    roundSum = roundSum+Number(keyboard[activePlayer*7+6].textContent)
	const activeSum = sums[activePlayer]	
	activeSum.textContent = roundSum
	activePlayer = activePlayer + 1
	if (activePlayer == keyboard.length/7) {
		round = round + 1
		activePlayer = 0
	}
	if (stayPlayers.length > 0) {
	  //isMatch=stayPlayers.indexOf(activePlayer)
	  while (stayPlayers.indexOf(activePlayer)>=0) {
	    activePlayer = activePlayer + 1
		if (activePlayer == keyboard.length/7) {
		  round = round + 1
		  activePlayer = 0
	    }  
	  }	
	}
	addStatusUpdate (keyboard, active)
	guessGrid[0].textContent=keyboard[activePlayer*7].textContent
	guessGrid[1].textContent=keyboard[activePlayer*7+1].textContent	
	guessGrid[2].textContent=keyboard[activePlayer*7+2].textContent		
	guessGrid[3].textContent=keyboard[activePlayer*7+3].textContent	
	guessGrid[4].textContent=keyboard[activePlayer*7+4].textContent	
	guessGrid[5].textContent=keyboard[activePlayer*7+5].textContent	
	guessGrid[6].textContent=keyboard[activePlayer*7+6].textContent	
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

function bust() {
	let checkArray = []
	checkArray.push(Number(guessGrid[0].textContent))
	checkArray.push(Number(guessGrid[1].textContent))
	checkArray.push(Number(guessGrid[2].textContent))
	checkArray.push(Number(guessGrid[3].textContent))
	checkArray.push(Number(guessGrid[4].textContent))	
	checkArray.push(Number(guessGrid[5].textContent))
	checkArray.push(Number(guessGrid[6].textContent))	
	let setCheck = new Set(checkArray)
	let revertArray = Array.from(setCheck)
	if (revertArray.length !== round+2) {
		stayPlayers.push(activePlayer)
		showAlert(Number(guessGrid[0].textContent, 5000))
		showAlert(revertArray.length, 5000)
		showAlert(round, 5000)
		showAlert("Busted", 5000)
		addStatusUpdate (keyboard, "bust")
//		keyboard[activePlayer*7].classList.add("bust")
//		keyboard[activePlayer*7+1].classList.add("bust")
//		keyboard[activePlayer*7+2].classList.add("bust")
//		keyboard[activePlayer*7+3].classList.add("bust")
//		keyboard[activePlayer*7+4].classList.add("bust")
//		keyboard[activePlayer*7+5].classList.add("bust")
//		keyboard[activePlayer*7+6].classList.add("bust")
		sums[activePlayer].classList.add("bust")
	}
	return
}


function addStatusUpdate (divType, status) {
		divType[activePlayer*7].classList.add(status)
		divType[activePlayer*7+1].classList.add(status)
		divType[activePlayer*7+2].classList.add(status)
		divType[activePlayer*7+3].classList.add(status)
		divType[activePlayer*7+4].classList.add(status)
		divType[activePlayer*7+5].classList.add(status)
		divType[activePlayer*7+6].classList.add(status)	
}

function removeStatusUpdate (divType, status) {
		divType[activePlayer*7].classList.remove(status)
		divType[activePlayer*7+1].classList.remove(status)
		divType[activePlayer*7+2].classList.remove(status)
		divType[activePlayer*7+3].classList.remove(status)
		divType[activePlayer*7+4].classList.remove(status)
		divType[activePlayer*7+5].classList.remove(status)
		divType[activePlayer*7+6].classList.remove(status)	
}

