const gameContainer = document.getElementById("game");
const reset = document.querySelector('h1')
reset.addEventListener('click',function(event){clearPicks('','');})
let pick1 = ''; 
let pick2 = ''; 
let pick1Pos = [];
let ready = true;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(ready){
    if(!pick1){
      pick1 = event.target.classList[0];
      event.target.style.backgroundColor = event.target.classList[0]
      pick1Pos[0] = event.target.getBoundingClientRect().x;
      pick1Pos[1] = event.target.getBoundingClientRect().y;
    }
    else if(!pick2){
      let pick2X = event.target.getBoundingClientRect().x;
      let pick2Y = event.target.getBoundingClientRect().y; 
      if(pick1Pos[0] != pick2X || pick1Pos[1] != pick2Y){
        pick2 = event.target.classList[0];
        event.target.style.backgroundColor = event.target.classList[0]
        if(pick1 != pick2){
          ready = false;
          setTimeout(clearPicks, 1000, pick1, pick2);
        }
        pick1 = ''
        pick2 = ''
      }
    }
  }
}

function clearPicks(one, two){
  let cards = document.querySelectorAll('#game')[0].children;
  for(let divs of cards){
    if(one){
      if(divs.className === one||divs.className === two){
        divs.style.backgroundColor='';
      }
    }
    else{
      divs.style.backgroundColor='';
    }
  }
  ready = true;
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */