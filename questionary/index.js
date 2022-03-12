/**
 * Faz a relação de Questão x Resposta certa
 */
const correctAnswers = {
    'question-1': 'q1-op2',
    'question-2': 'q2-op2',
    'question-3': 'q3-op1',
    'question-4': 'q4-op2',
    'question-5': 'q5-op1',
    'question-6': 'q6-op1',
    'question-7': 'q7-op2',
    'question-8': 'q8-op2',
    'question-9': 'q9-op1',
    'question-10': 'q10-op2',
};

function validateQuestions() {
    const numberOfQuestions = document.getElementsByClassName('question').length;
    const correctElement = document.getElementById('correct');
    const incorrectElement = document.getElementById('incorrect');

    let index = 1;
    let numberOfCorrectQuestions = 0;
    let numberOfIncorrectQuestions = 0;

    for (index = 1; index <= numberOfQuestions; index++) {
        const currentQuestionName = `question-${index}`;

        const correctOptionId = correctAnswers[currentQuestionName];
        const optionElement = document.getElementById(correctOptionId);

        if (optionElement.checked) numberOfCorrectQuestions++;
        else numberOfIncorrectQuestions++;
    }

    correctElement.innerHTML = `Você acertou ${numberOfCorrectQuestions} questões`;
    incorrectElement.innerHTML = `Você errou ${numberOfIncorrectQuestions} questões`;
}