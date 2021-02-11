const startButton = document.getElementById('start_button');
const nextButton = document.getElementById('next_button');
const questionContainerElement = document.getElementById('question_cont');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentIndexOfQuestion++
    setNextQuestion()
})

const questionElement = document.getElementById('question');

const answerElement = document.getElementById('answers');

const pointsDiv = document.getElementById('points');

let shuffleQuestions, currentIndexOfQuestion;

let points;

function startGame(){
    points = 0;
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentIndexOfQuestion = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function showQuestion(question){
    pointsDiv.innerText = 'Twoje punkty: ' + points
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct){      
        button.dataset.correct = answer.correct     
        points ++ ;   
    }
    button.addEventListener('click',selectAnswer)
    answerElement.appendChild(button);
});
}


function setNextQuestion(){
    resetState();
    showQuestion(shuffleQuestions[currentIndexOfQuestion]);
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body,correct)
    Array.from(answerElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentIndexOfQuestion + 1){
    nextButton.classList.remove('hide')
    } else{
        startButton.innerText = "Powtórz"
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')   
        pointsDiv.innerText = 'Twoje punkty: ' + points 
    } else {
        element.classList.add('wrong')
    }

}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

const questions = [

    {
        question: 'Ile to jest 5 + 5',
        answers: [
            {text: '10', correct: true},
            {text: '4', correct: false},
            {text: '7', correct: false},
            {text: '9', correct: false}
        ]
    },

    {
        question: 'Ile to jest 2 + 2',
        answers: [
            {text: '10', correct: false},
            {text: '4', correct: true},
            {text: '7', correct: false},
            {text: '9', correct: false}
        ]
    },

    {
        question: 'Ile to jest 6 + 2',
        answers: [
            {text: '10', correct: false},
            {text: '8', correct: true},
            {text: '7', correct: false},
            {text: '9', correct: false}
        ]
    }

]