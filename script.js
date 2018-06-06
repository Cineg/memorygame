const game = {
  init: function(){
    let deck = [...game.cards, ...game.cards];
    game.shuffle(deck);
    game.assignCards(deck);
    game.movesRemaining();
  },

  cards: [
    {
     id: 1,
     name: "Figlet"
   },
   {
     id: 2,
     name: "Diglet"
   },
 {
     id: 3,
     name: "Pimpet"
   },
   {
     id: 4,
     name: "Bedlid"
   },
   {
     id: 5,
     name: "Blendzior"
   },
   {
     id: 6,
     name: "Kiklet"
   },
   {
     id: 7,
     name: 'Manded'
   },
   {
     id: 8,
     name: 'Kaftep'
   }
  ],


  // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
  shuffle: function(array){
			let counter = array.length;
      let temp;
      let index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

    assignCards: function(x){
      //get cards by class name of card
      let cardDivs = document.getElementsByClassName('card');
      //and put them in the array
      let cardDivArray = [...cardDivs];
      //for each element in array
      for(let i = 0; i < cardDivArray.length; i++){
        //add this:
        cardDivArray[i].addEventListener('click', game.click);
        cardDivArray[i].innerHTML = '<p>' + x[i].name + '</p>';
        cardDivArray[i].classList.add('closed');
        cardDivArray[i].setAttribute('seed', x[i].id);
      }
      return cardDivArray;
    },

    //toggle classes if clicked
    toggle: function(x){
      x.classList.toggle('open');
      x.classList.toggle('closed');
      x.classList.toggle('locked');
    },

    //what do we do if we click on div
    click: function(){
      //toggle class list
      game.toggle(this);
      //get element by toggled locked class
      var clicked = document.getElementsByClassName('locked');
      //put it in the array
      var clickedArr = [...clicked];
      //Lock if above 2 clicks
      if(clickedArr.length > 2){
        game.toggle(this);
      }
      console.log("Clicked", this, clicked.length, clickedArr); //checking what im clicking on, could be deleted as well
      if(clickedArr.length == 2){
        //if there are two clicks compare them
        game.compare(clickedArr);
      }

    },


    compare: function(x){
      //If success
      if(x[0].getAttribute('seed') === x[1].getAttribute('seed')){
        game.setDone(x[0]);
        game.setDone(x[1]);
        game.movesRemaining();
      } //if failed
        else if(x[0].getAttribute('seed') !== x[1].getAttribute('seed')) {
          //wait half second to toggle, to remember cards
        setTimeout(function(){
          game.toggle(x[1]);
          game.toggle(x[0]);
        }, 500);
      }
    },

    setDone: function(x){
      //if compare succeed do this
      x.removeEventListener('click', game.click);
      x.classList.add('done');
      x.classList.toggle('locked');
    },

    movesRemaining: function(){
      //get whole deck
      let deck = [...game.cards, ...game.cards];
      //get cards with class done
      let cardsDone = document.getElementsByClassName('done');
      let cardsRemaining = deck.length-cardsDone.length;
      //write out how many of them remains
      document.getElementById('movesLeft').innerHTML = cardsRemaining;

      if(cardsRemaining == 0){
        //if cards are spend, get customalert visible
        let customAlert = document.getElementById('customAlert');
          customAlert.style.display='block';
      }
    },

    cardsRestart: function(){
      // get every card with class done
      let cardsDone = document.getElementsByClassName('done');
      //put them in the array
      let singleCard = [...cardsDone];
      //for each remove class done and locked, and toggle other classes
      for(let i = 0; i < singleCard.length; i++){
        game.toggle(singleCard[i]);
        singleCard[i].classList.remove('done');
        singleCard[i].classList.remove('locked');
      }
    },

}

game.init();

function restart(){
  let customAlert = document.getElementById('customAlert');
  customAlert.style.display='none';
  game.cardsRestart();
  game.init();
}

function closeBTN(){
  console.log("clicked");
  let customAlert = document.getElementById('customAlert');
  customAlert.style.display='none';
}
