const card = document.querySelector('.flipped');

card.addEventListener('click', function (){
    card.classList.toggle('is_flipped');
});

const studyCards = [
    { id: '1', question: "What does HTML stand for?", answer: "HyperText Markup Language", category: "Web Development", mastered: false },
    { id: '2', question: "What property changes the background color?", answer: "background-color", category: "CSS", mastered: false },
    { id: '3', question: "How do you declare a variable in ES6?", answer: "Using `let` or `const`", category: "JavaScript", mastered: false },
    { id: '4', question: "What is the capital of France?", answer: "Paris", category: "General Knowledge", mastered: false },
    { id: '5', question: "What is the primary function of CSS?", answer: "To style and lay out web pages.", category: "Web Development", mastered: false },
    { id: '6', question: "Which loop runs at least once?", answer: "do...while loop", category: "JavaScript", mastered: false },
    { id: '7', question: "What is 'cascading' in CSS?", answer: "The order in which styles are applied, based on specificity, inheritance, and origin.", category: "CSS", mastered: false },
    { id: '8', question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee", category: "Literature", mastered: false },
];

let activeCard=[];
let currentCardIndex = 0;
let currentCategory = "all";
let hideMastered = false;

//inside studycards//
const cardFlipped = document.getElementById('current_card');
const cardQuestion = document.getElementById('card_question');
const cardAnswer = document.getElementById('card_answer');
const q_cardSubject = document.getElementById('q_card_subject');
const a_cardSubject = document.getElementById('a_card_subject');
const a_progress = document.getElementById('q_progress');
const q_progress = document.getElementById('a_progress');

//card Actions//
const markMastered = document.getElementById('mark_mastered');
const reset = document.getElementById('reset_button');

//card controls//
const cardShuffle = document.getElementById('shuffle_btn');
const check_hideMastered = document.getElementById('hide_mastered');
const showCategories = document.getElementById('categories');

//card navigation//
const nextCard = document.getElementById('next_btn');
const previousCard = document.getElementById('prev_btn');
const cardCounter = document.getElementById('card_counter');


//------------------functions----------------------//
//Cards Shuffle//
function shuffleCards(array){
    for (let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j], array[i]]
    }
}

//Filtering Cards//
function filterCards(){
    let filtered = studyCards;

     //category filter//
    if(currentCategory !== "all"){
        filtered = filtered.filter(card => card.category === currentCategory);
    }

    //hide mastered//
    if(hideMastered){
        filtered = filtered.filter(card => !card.mastered);
    }

    activeCard = filtered;
    showCard();
}

//show current card content//
function showCard(){
    const currentCard = activeCard[currentCardIndex];
    const totalcards = activeCard.length;

    //inside card content//
    cardQuestion.textContent = currentCard.question;
    cardAnswer.textContent = currentCard.answer;
    a_cardSubject.textContent= q_cardSubject.textContent = currentCard.category;
    a_progress.textContent= q_progress.textContent =`${currentCardIndex + 1}/${totalcards}`;

    //card navigation//
    cardCounter.textContent = `Card ${currentCardIndex + 1} of ${totalcards}`;

    //card actions//
    if(currentCard.mastered){
        console.log("add an active class")
        markMastered.classList.add('active');
    }else{
        markMastered.classList.remove('active');
    }
}

//-----------------------------------------------------//

//card navigation//
nextCard.addEventListener('click', () => {
    if(currentCardIndex < activeCard.length -1){
        currentCardIndex++;
        showCard();
    }
});

previousCard.addEventListener('click', () => {
    if(currentCardIndex > 0){
        currentCardIndex--;
        showCard();
    }
});


//card controls//
showCategories.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    filterCards()
});

check_hideMastered.addEventListener('change' , (e) =>{
    hideMastered = e.target.checked;
    filterCards()
});

cardShuffle.addEventListener('click', ()=> {
        shuffleCards(activeCard);
        currentCardIndex = 0;
        showCard();
});


//card actions//
markMastered.addEventListener('click', () =>{
    const currenCardId = activeCard[currentCardIndex].id;
    const updateCardStatus =studyCards.find(card => card.id === currenCardId);

    if(updateCardStatus){
        //update the status in the original study cards array//
        updateCardStatus.mastered = true;
    }

    if(hideMastered){
        // adds the mastered card to the hide mastered
        filterCards();
    } else showCard();

    console.log("marked mastered")
})

reset.addEventListener('click', () => {
    studyCards.forEach(card => card.mastered = false);
    filterCards();
    console.log("studycards has been reseted")
});



function startStudyCards(){
    filterCards();
    showCard();
}

document.addEventListener('DOMContentLoaded' , startStudyCards);


