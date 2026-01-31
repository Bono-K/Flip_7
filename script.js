

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
const selectKeys =document.querySelectorAll(".selectKey")
const emptyTile =document.querySelectorAll(".tileEmpty")
const emptyBlock = document.querySelectorAll(".tileOneEmpty")


//const playerCount = keyboard.length/7


function buildDeck(keyboard){
	playerCount=Number(emptyBlock[1].textContent)
	if (playerCount*7>baseDeck.length) {
		deck = baseDeck.flatMap(i => [i,i])
	}
	else {
		deck = baseDeck
	}
	return
}	




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
  if (e.target.matches("[data-select]")) {
    assignPlayers(e)
	return
  }
	
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

function assignPlayers(e) {
    const playerCount = Number(e.target.textContent)
	emptyBlock[1].textContent=playerCount
	if (playerCount < 16) {
		for (let i=0; i<16; i++) {
			selectKeys[i].classList.add("inactive")
		}
		for (let i=((playerCount*7)); i<(keyboard.length); i++) {
			keyboard[i].classList.add("inactive")
		}
		for (let i=((playerCount)); i<(sums.length); i++) {
			sums[i].classList.add("inactive")
		}
	}
	hitKey[0].classList.add("active")
	stayKey[0].classList.add("active")
	buildDeck(keyboard)
	let displayPlayer = activePlayer+1
	emptyTile[0].textContent = "Player " + displayPlayer
	return
}


function handleKeyPress(e) {
    playerCount=Number(emptyBlock[1].textContent)
	showAlert(playerCount, 5000)	   
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
	activeKey.classList.add(deck[cardSelect])
	activeTile.classList.add(deck[cardSelect])
	deck.splice(cardSelect,1)
    bust()
	playerChange()
	return
	  
}



function pressStay() {	
	stayPlayers.push(activePlayer)
	sums[activePlayer].classList.add("stay")		
	addStatusUpdate (keyboard, "stay", activePlayer)
//	if (stayPlayers.length = playerCount) {
//			return
//	}
	playerChange()
	    return
}

function playerChange() {
    playerCount=Number(emptyBlock[1].textContent)
	sums[activePlayer].classList.remove("active")
	removeStatusUpdate (keyboard, "active", activePlayer)
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
	for (let i=(activePlayer*7); i<(activePlayer*7+round+1); i++) {
		let updateAmount = String(keyboard[i].textContent)
		//showAlert(activePlayer*7+round,5000)
		//showAlert(i, 5000)
		//showAlert(updateAmount, 5000)
		keyboard[i].classList.add(updateAmount)
		keyboard[i].classList.add("1")
	}
	activePlayer = activePlayer + 1
	if (activePlayer == playerCount) {
		round = round + 1
		activePlayer = 0
	}
	if (stayPlayers.length > 0) {
	  //isMatch=stayPlayers.indexOf(activePlayer)
	  if (stayPlayers.length == playerCount) {
		  return
	  }
	  while (stayPlayers.indexOf(activePlayer)>=0) {
	    activePlayer = activePlayer + 1
		if (activePlayer == playerCount) {
		  round = round + 1
		  activePlayer = 0
	    }  
	  }	
	}
	let displayPlayer = activePlayer+1
	emptyTile[0].textContent =  "Player " + displayPlayer
	addStatusUpdate (keyboard, "active", activePlayer)
	sums[activePlayer].classList.add("active")
	guessGrid[0].textContent=keyboard[activePlayer*7].textContent
	guessGrid[1].textContent=keyboard[activePlayer*7+1].textContent	
	guessGrid[2].textContent=keyboard[activePlayer*7+2].textContent		
	guessGrid[3].textContent=keyboard[activePlayer*7+3].textContent	
	guessGrid[4].textContent=keyboard[activePlayer*7+4].textContent	
	guessGrid[5].textContent=keyboard[activePlayer*7+5].textContent	
	guessGrid[6].textContent=keyboard[activePlayer*7+6].textContent	
	for (let i=0; i<round; i++) {
		let updateAmount = String(guessGrid[i].textContent)
		//showAlert(activePlayer*7+round,5000)
		//showAlert(i, 5000)
		//showAlert(updateAmount, 5000)
		//guessGrid[i].classList.add(updateAmount)
		guessGrid[i].classList.add("1")
	}
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
	playerCount=Number(emptyBlock[1].textContent)
	let checkArray = []
	checkArray.push(Number(guessGrid[0].textContent))
	checkArray.push(Number(guessGrid[1].textContent))
	checkArray.push(Number(guessGrid[2].textContent))
	checkArray.push(Number(guessGrid[3].textContent))
	checkArray.push(Number(guessGrid[4].textContent))	
	checkArray.push(Number(guessGrid[5].textContent))
	checkArray.push(Number(guessGrid[6].textContent))	
	checkArray.push(0)	
	let setCheck = new Set(checkArray)
	let revertArray = Array.from(setCheck)
	if (revertArray.length !== round+2) {
		stayPlayers.push(activePlayer)
		addStatusUpdate (keyboard, "bust", activePlayer)
		sums[activePlayer].classList.add("bust")
		//if (stayPlayers.length = playerCount) {
			//stopInteraction()
			//return
		//}
		stopInteraction()
		setTimeout(() => {
			startInteraction()
  			}, 500)	
		
		}
	return
}


function addStatusUpdate (divType, status, activePlayer) {
		divType[activePlayer*7].classList.add(status)
		divType[activePlayer*7+1].classList.add(status)
		divType[activePlayer*7+2].classList.add(status)
		divType[activePlayer*7+3].classList.add(status)
		divType[activePlayer*7+4].classList.add(status)
		divType[activePlayer*7+5].classList.add(status)
		divType[activePlayer*7+6].classList.add(status)	
}

function removeStatusUpdate (divType, status, activePlayer) {
		divType[activePlayer*7].classList.remove(status)
		divType[activePlayer*7+1].classList.remove(status)
		divType[activePlayer*7+2].classList.remove(status)
		divType[activePlayer*7+3].classList.remove(status)
		divType[activePlayer*7+4].classList.remove(status)
		divType[activePlayer*7+5].classList.remove(status)
		divType[activePlayer*7+6].classList.remove(status)	
}

