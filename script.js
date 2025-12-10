
const studyCards = [
    { id: '1', question: "What does HTML stand for?", answer: "HyperText Markup Language", category: "Web Development", mastered: false },
    { id: '2', question: "What property changes the background color?", answer: "background-color", category: "CSS", mastered: false },
    { id: '3', question: "How do you declare a variable in ES6?", answer: "Using 'let' or 'const'", category: "JavaScript", mastered: false },
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
const studyBtn = document.querySelector('.tab')
const card = document.querySelector('.flashcard_inner');
const cardFlipped = document.getElementById('current_card');
const cardQuestion = document.getElementById('card_question');
const cardAnswer = document.getElementById('card_answer');
const q_cardSubject = document.getElementById('q_card_subject');
const a_cardSubject = document.getElementById('a_card_subject');
const a_progress = document.getElementById('a_progress');
const q_progress = document.getElementById('q_progress');

//card Actions//
const markMastered = document.getElementById('mark_mastered');
const originalButtonText = markMastered.textContent;
const reset = document.getElementById('reset_button');

//card controls//
const cardShuffle = document.getElementById('shuffle_btn');
const check_hideMastered = document.getElementById('hide_mastered');
const showCategories = document.getElementById('categories');

//card navigation//
const nextCard = document.getElementById('next_btn');
const previousCard = document.getElementById('prev_btn');
const cardCounter = document.getElementById('card_counter');

// Navbar buttons
const studyModeBtn = document.getElementById('study_mode_btn');
const allCardsBtn = document.getElementById('all_cards_btn');


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
    currentCardIndex = 0;
    showCard();
    updateStats();
    
}

//show current card content//
function showCard(){

    const currentCard = activeCard[currentCardIndex];
    const totalcards = activeCard.length;
    const AllMasteredCards =studyCards.filter(card => card.mastered).length

    //inside card content//
    card.classList.remove('is_flipped');
    cardQuestion.textContent = currentCard.question;
    cardAnswer.textContent = currentCard.answer;
    a_cardSubject.textContent= q_cardSubject.textContent = currentCard.category;
    a_progress.textContent= q_progress.textContent =`${AllMasteredCards}/${totalcards}`;
    cardCounter.textContent = `Card ${currentCardIndex + 1} of ${totalcards}`;
    //card actions//
    if(currentCard.mastered){
        markMastered.classList.add('active');
        markMastered.innerHTML ="Already mastered";
    }else{
        markMastered.classList.remove('active');
        markMastered.innerHTML = originalButtonText;
    }

}

// categories //
function setCategories(){
    const categories = new Set(studyCards.map(card => card.category));
    showCategories.innerHTML ='<option value ="all">All Categories </option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        showCategories.appendChild(option);
    });

    showCategories.value = currentCategory;
}

//statistics section //
function updateStats(){
    const total = studyCards.length;
    const mastered = studyCards.filter(card => card.mastered).length;
    const unmastered = studyCards.filter(card => !card.mastered).length;

    document.getElementById('total_stat').textContent = total;
    document.getElementById('mastered_stat').textContent = mastered;
    document.getElementById('inprogress_stat').textContent = unmastered;
    document.getElementById('unstarted_stat').textContent = unmastered;

    if (activeCard.length > 0){ 
        showCard();
    }
    
}

// Function to handle tab switching
function switchTab(selectedButton) {
    if (selectedButton.id === 'study_mode_btn') {
        studyModeBtn.classList.add('active_mode');
        studyModeBtn.classList.remove('inactive_mode');
        allCardsBtn.classList.add('inactive_mode');
        allCardsBtn.classList.remove('active_mode');
        console.log('Switched to Study Mode');
    } else if (selectedButton.id === 'all_cards_btn') {
        allCardsBtn.classList.add('active_mode');
        allCardsBtn.classList.remove('inactive_mode');
        studyModeBtn.classList.add('inactive_mode');
        studyModeBtn.classList.remove('active_mode');
        console.log('Switched to All Cards');
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
    card.classList.remove('is_flipped')
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

check_hideMastered.addEventListener('change' , (e) => {
    hideMastered = e.target.checked;
    filterCards()
});

cardShuffle.addEventListener('click', () => {
    shuffleCards(activeCard);
    currentCardIndex = 0;
    showCard();
});

card.addEventListener('click', () => {
    card.classList.toggle('is_flipped');
});


//card actions//
markMastered.addEventListener('click', () => {
    const currenCardId = activeCard[currentCardIndex].id;
    const updateCardStatus =studyCards.find(card => card.id === currenCardId);

    if(updateCardStatus){
        //update the status in the original study cards array//
        updateCardStatus.mastered = true;

        if(hideMastered){
            filterCards();
        } else {
            showCard()
        }

    updateStats();
    }   
});

reset.addEventListener('click', () => {
    studyCards.forEach(card => card.mastered = false);
    markMastered.textContent = originalButtonText;
    filterCards();
    console.log("studycards has been reseted")
    updateStats();
});

function startStudyCards(){
    setCategories();
    updateStats();
    filterCards();
    showCard();
}


// Event listeners for navbar buttons
studyModeBtn.addEventListener('click', () => switchTab(studyModeBtn));
allCardsBtn.addEventListener('click', () => switchTab(allCardsBtn));


document.addEventListener('DOMContentLoaded', startStudyCards);


