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
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const offsetFromDate = new Date(2025, 3, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 12
const targetWord = targetWords[Math.floor(dayOffset)]
const winMessage = winMessages[Math.floor(dayOffset)]

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
  if (e.target.matches("hitKey")) {
    pressKey()
    return
  }

  if (e.target.matches("stayKey")) {
    submitGuess()
    return
  }

}

function pressKey() {
  const activeTiles = getActiveTiles()
//  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(":not([data-letter])")
//  nextTile.dataset.letter = key.toLowerCase()
  cardSelect = Math.floor(Math.random()*(1,deck.length)-1)
  nextTile.textContent = deck[cardSelect]
  deck=deck.splice(1,cardSelect)
  nextTile.dataset.state = "active"
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess() {
	const activeTiles = [...getActiveTiles()]
//	if (activeTiles.length !== WORD_LENGTH) {
		showAlert('Not enough letters')
		shakeTiles(activeTiles)
		return
	}

	const guess = activeTiles.reduce((word, tile) => {
		return word + tile.dataset.letter
	}, '')

	
	if (!dictionary.includes(guess)) {
		showAlert('Not in word list')
		shakeTiles(activeTiles)
		return
	}

	stopInteraction()

	// My algorithm for determining classname of the letter
	let matchingChars = ''
	const classDictionary = { 1: '', 2: '', 3: '', 4: '', 5: '' }

	for (let i = 0; i < targetWord.length; i++) {
		const letter = guess[i]

		console.log(matchingChars)

		const rgx = new RegExp(`${letter}`, 'g')
		// Need to know the total appearances of the letter in the word
		const totalAppearances = (targetWord.match(rgx) || []).length
		// Also need to know all prior appearances of the letter in the word,
		//  so we don't mistakenly tell the user that a duplicate letter exists
		const priorAppearances = (matchingChars.match(rgx) || []).length

		// Letter not in word
		if (!targetWord.includes(letter)) {
			classDictionary[i + 1] = 'wrong'
			continue
		}

		// The letter is correct
		if (targetWord[i] === guess[i]) {
			classDictionary[i + 1] = 'correct'

			matchingChars = matchingChars + letter
			continue
		}

		// The letter is included in the word somewhere...

		// Look ahead... If there is a correct appearance further in the word, we need to know
		let futureCorrectAppearances = 0
		for (let j = i; j < targetWord.length; j++) {
			if (targetWord[j] === guess[j] && targetWord[j] === letter)
				futureCorrectAppearances++
		}

		console.log(
			`There are already ${futureCorrectAppearances} correct ahead of [${i}]: "${letter}"`
		)
		console.log(
			`There are already ${priorAppearances} which come before [${i}]: "${letter}"`
		)

		console.log(futureCorrectAppearances, priorAppearances, totalAppearances)

		// If there are already too many future / prior / future+prior appearances,
		//  there can not be another instance of this letter, so we must continue
		if (futureCorrectAppearances >= totalAppearances) {
			classDictionary[i + 1] = 'wrong'
			continue
		}
		if (priorAppearances >= totalAppearances) {
			classDictionary[i + 1] = 'wrong'
			continue
		}
		if (priorAppearances + futureCorrectAppearances >= totalAppearances) {
			classDictionary[i + 1] = 'wrong'
			continue
		}

		classDictionary[i + 1] = 'wrong-location'

		matchingChars = matchingChars + letter
	}

	activeTiles.forEach((value, index, array) => {
		flipTile(value, index, array, guess, classDictionary[index + 1])
	})

}


function flipTile(tile, index, array, guess, className) {
	const letter = tile.dataset.letter
	const key = keyboard.querySelector(`[data-key="${letter}"i]`)
	
	setTimeout(() => {
		tile.classList.add('flip')
	}, (index * FLIP_ANIMATION_DURATION) / 2)
	
	tile.addEventListener(
		'transitionend',
		() => {
			tile.classList.remove('flip')
			tile.dataset.state = className
			key.classList.add(className)
			if (index === array.length - 1) {
				tile.addEventListener(
					'transitionend',
					() => {
						startInteraction()
						checkWinLose(guess, array)
					},
					{ once: true }

				)
			}
		},
		{ once: true }
	)
}


function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function getAllTiles() {
  return guessGrid.querySelectorAll()
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

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert(winMessage, 4000)
    showAlert("Great job! You got it!", 4000)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {
    showAlert(winMessage, 5000)
    showAlert(("Uh-oh, better luck next time! The word was " +targetWord.toUpperCase()), 5000)
    hideWords() 
    stopInteraction()
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
          hideWords()
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}

function hideWords(tiles) {
   const allCorrectTiles = [...guessGrid.querySelectorAll('[data-state="correct"]')]
   const allWrongTiles = [...guessGrid.querySelectorAll('[data-state="wrong"]')]
   const allWrongLTiles = [...guessGrid.querySelectorAll('[data-state="wrong-location"]')]
   allCorrectTiles.push(...allWrongTiles)
   allCorrectTiles.push(...allWrongLTiles)
   allCorrectTiles.forEach(tile => {
		setTimeout(() => {
		     tile.classList.add("win-lose")
	        }, 1000) 
   })
}
