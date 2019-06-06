// Globals
const gameBoard = document.querySelector('.deck');
let revealedCards = [];
let currentClicked = [];
let initialClicked = [];
let matches = [];
const matched = document.querySelectorAll('.match')
let moves = 0;
let pluralize = document.querySelector('.pluralize')
const movesDisplay = document.querySelector('.moves')
const restart = document.querySelector('.fa-repeat');
const rateStar = document.querySelector('.stars');
let mins = document.querySelector('span.minutes');
let secs = document.querySelector('span.seconds');
let currentTimer = 0;
let incrementer;
const subMinutes = document.querySelector('.sub-minutes');
const subSeconds = document.querySelector('.sub-seconds');
const elapsedTime = document.querySelector('.time');
const modal = document.querySelector('#modal-container');
const modalContent = document.querySelector('.modal-content')
const closeModal = document.querySelector('.close-btn');
const modal2 = document.querySelector('#modal2-container')
const closeModal2 = document.querySelector('.start-btn');
const restartNo = document.querySelector('.start-no');
const restartYes = document.querySelector('.start-yes');
const modal3 = document.querySelector('#modal3-container');
const modal4 = document.querySelector('#modal4-container');
const playAgainYes = document.querySelector('.play-again-yes');
const playAgainNo = document.querySelector('.play-again-no');
const rank = document.querySelector('.rank');
const starRate = document.querySelector('.stars');
const totalMoves = document.querySelector('.total-moves');
const totalTime = document.querySelector('.total-time');


/*
 * Create a list that holds all of the cards
 */
const cardIcons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
				"fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
				"fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
				"fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o",
				"fa fa-cube"];

// Shuffle the cards
let symbols = shuffle(cardIcons);

// Display the cards on the game board
for(let i = 0; i < symbols.length; i++) {
	const card = document.createElement('li');
	card.classList.add('card');
	card.innerHTML = `<i class = '${symbols[i]}'></i>`;
	gameBoard.appendChild(card);
}

// assign the cards to a variable: This results to a node list
const cardList = document.querySelectorAll('.deck li');

// convert the node list to an array
const cardArray = Array.from(cardList);


// Display the cards at the start of the game before hiding

function initialOpen () {
	for(let i = 0; i < symbols.length; i++) {
	cardArray[i].classList.add('show', 'open', 'avoid-click');
}
}

function initialHide () {
	for(let i = 0; i < symbols.length; i++) {
	cardArray[i].classList.remove('show', 'open', 'avoid-click');
}
}



	 
// Event listeners

// when card is clicked, reveal content.
for(let i = 0; i < symbols.length; i++) {
	cardArray[i].addEventListener('click', displayContent);
}

// restart game
restart.addEventListener('click', function() {
	launchModal3();
	stopTimer();
});

// Prompt to play again
closeModal.addEventListener('click', function() {
	exitModal();
	launchModal4();
});

// close the instruction and start screen
closeModal2.addEventListener('click', hideModal2);



// Restart decline
restartNo.addEventListener('click', function() {
	hideModal3();
	latest();
});

// Agree to restart
restartYes.addEventListener('click', reset);

// Agree to play again
playAgainYes.addEventListener('click', reset);

// Decline to play again
playAgainNo.addEventListener('click', hideModal4);



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// function to flip open
function displayContent() {
	currentClicked = this;
	initialClicked = revealedCards[0];
	if(revealedCards.length === 1) {
		currentClicked.classList.add('show', 'open', 'avoid-click');
		revealedCards.push(currentClicked);
		compare();
		resetRevealedCount()
		
	} else {
		currentClicked.classList.add('show', 'open', 'avoid-click');
		revealedCards.push(currentClicked);
	}
	setTimeout(gameOver, 650);
	}

// compare flipped cards
function compare() {
	if(currentClicked.innerHTML === initialClicked.innerHTML) {
		matchCount();
		addMatch();
	} else {
		disableClick(); //disable click on cards while the unmatched flipped cards are still open
		setTimeout(enableClick, 650); //enable click on cards after the unmatched opened cards have been flipped to close
		setTimeout(flipClose, 650); //flip unmatched opened cards back to close after 650ms
	}
	movesCount();
};

// Reset count for revealed cards
function resetRevealedCount() {
	if(revealedCards.length === 2) {
		revealedCards = [];
	}	
};

// when a match is made
function addMatch() {
	initialClicked.classList.add('match', 'noclick');
	currentClicked.classList.add('match', 'noclick');
	resetRevealedCount()
}

// flip close function to revert cards to hide content
function flipClose() {
	initialClicked.classList.remove('open', 'show', 'avoid-click');
	currentClicked.classList.remove('open', 'show', 'avoid-click');
	resetRevealedCount()
};

// disable click
function disableClick() {
	if(revealedCards.length === 2) {
		for(let i=0; i<cardArray.length; i++) {
cardArray[i].classList.add('avoid-click');
}
	}
}

// function to enable click
function enableClick() {
	if(revealedCards.length < 3){
		for(let i=0; i<cardArray.length; i++) {
cardArray[i].classList.remove('avoid-click');
}
	}
}

// count the mathes made
function matchCount() {
	matches.push(currentClicked, initialClicked);
}

// count the moves
function movesCount() {
	moves++;
	movesDisplay.innerHTML = moves;
	if(moves > 1) {
		pluralize.innerHTML = 'moves';
	};
	if(moves > 10 && moves < 13) {
		rateStar.innerHTML = `<li><i class="fa fa-star"></i></li>
        					 <li><i class="fa fa-star"></i></li>
        					 <li><i class="fa fa-star"></i></li>
        					 <li><i class="fa fa-star"></i></li>`;
	} else if(moves > 13 && moves < 15) {
		rateStar.innerHTML = `<li><i class="fa fa-star"></i></li>
							  <li><i class="fa fa-star"></i></li>
        					 <li><i class="fa fa-star"></i></li>`;
	}
	else if(moves > 15 && moves < 17) {
		rateStar.innerHTML = `<li><i class="fa fa-star"></i></li>
							  <li><i class="fa fa-star"></i></li>`;
	}
	else if( moves > 17) {
		rateStar.innerHTML = `<li><i class="fa fa-star"></i></li>`;
	}
}

// Reset function
function reset() {
    window.location.reload();
}

// Game over
function gameOver() {
	if(matches.length === cardArray.length) {
		launchModal();
		stopTimer();
	}
}

// Stopwatch
function latest() {
	incrementer = setInterval(function() {
		currentTimer += 1;
		//convert current time to hr,min,sec
		calculateTime(currentTimer);
		mins.innerHTML = minutes;
		secs.innerHTML = seconds;
	}, 1000)	
}

// time calculator function
function calculateTime() {
	minutes = (Math.floor((currentTimer/60)%60)).toPrecision(2);
	seconds = (currentTimer%60).toPrecision(2);
	msec = (currentTimer*10).toPrecision(2);
}

// Stop Timer
function stopTimer() {
    clearInterval(incrementer);
}

// open modal
function launchModal() {
	modal.style.display = 'block';
	modalTimeDisplay();
}

// display elapsed time on modal
function modalTimeDisplay(){
	modalContent.appendChild(starRate);
	modalContent.insertBefore(elapsedTime, rank);
	modalContent.insertBefore(totalMoves, totalTime);
}

// lines 268-274: i tried to dynamically add the subscripts
// for the time but realised that these lines are not necessary.
/*function addMinuteSubscript() {
	mins.add(subMinutes);
}*/

/*function addsecondsSubscript() {
	secs.add(subSeconds);
}*/

// close modal
function exitModal() {
	modal.style.display = 'none';
// display the timer again on top of the Game board
	let addTimeToBoard = document.querySelector('.score-panel');
	addTimeToBoard.appendChild(modalContent.lastChild);
}

// hide modal2
function hideModal2() {
	modal2.style.display = 'none';
	latest();
	initialOpen();
	setTimeout(initialHide, 10000)
}

// Display Modal3
function launchModal3() {
	modal3.style.display = 'block';
}

// Hide Modal3
function hideModal3() {
	modal3.style.display = 'none';
}

// Display Modal4
function launchModal4() {
	modal4.style.display = 'block';
}

// Hide Modal 4
function hideModal4() {
	modal4.style.display = 'none';
}

/*
Initial design for restarting the game but i found an easier way.
// Restart Game
function quit(){
	reset();
    mins.innerHTML = "00";
    secs.innerHTML = "00";
	currentTimer = 0;
	minutes = 0;
	seconds = 0;
	msec = 0;
	matches = [];
	revealedCards = [];
	initialClicked = [];
	moves = 0;
	movesDisplay.innerHTML = 0;
	pluralize.innerHTML = 'move';
	rateStar.innerHTML = `<li><i class="fa fa-star"></i></li>
        				  <li><i class="fa fa-star"></i></li>
        				  <li><i class="fa fa-star"></i></li>`;
	for(let i = 0; i < cardArray.length; i++){
		cardArray[i].classList.remove('open', 'show', 'match', 'avoid-click');
	};
		//latest();
}
*/


// Game Instructions
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
