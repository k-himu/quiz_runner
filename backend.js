/* ============================================================
   CSE MCQ QUIZ
   backend.js
   ============================================================ */


/* ============================================================
   1. CONFIGURATION
   ============================================================ */

const QUESTION_FILE = "Questionformat.json";


/* ============================================================
   2. APPLICATION STATE
   ============================================================ */

let quizData = null;
let questions = [];

let currentQuestionIndex = 0;

let selectedAnswer = null;

let quizStarted = false;
let answerChecked = false;

let correctAnswers = 0;
let incorrectAnswers = 0;

let timerInterval = null;
let remainingSeconds = 0;


/* ============================================================
   3. DOM ELEMENTS
   ============================================================ */

// Main screens
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");
const loadingScreen = document.getElementById("loading-screen");

// Quiz header
const quizTitle = document.getElementById("quiz-title");
const quizDescription = document.getElementById("quiz-description");

const questionCounter = document.getElementById("question-counter");
const timerElement = document.getElementById("timer");

// Progress
const progressBar = document.getElementById("progress-bar");
const progressPercentage = document.getElementById("progress-percentage");

// Question information
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");

const questionSubject = document.getElementById("question-subject");
const questionTopic = document.getElementById("question-topic");
const questionDifficulty = document.getElementById("question-difficulty");

// Code / pseudocode
const codeContainer = document.getElementById("code-container");
const questionCode = document.getElementById("question-code");

// Options
const optionsContainer = document.getElementById("options-container");
const optionCards = document.querySelectorAll(".option-card");

// Feedback
const answerFeedback = document.getElementById("answer-feedback");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackMessage = document.getElementById("feedback-message");
const answerExplanation = document.getElementById("answer-explanation");

// Buttons
const checkAnswerButton =
    document.getElementById("check-answer-btn");

const nextQuestionButton =
    document.getElementById("next-question-btn");

const restartButton =
    document.getElementById("restart-btn");

// Results
const finalScore = document.getElementById("final-score");
const scorePercentage = document.getElementById("score-percentage");

const correctCount = document.getElementById("correct-count");
const incorrectCount = document.getElementById("incorrect-count");

const scoreChart = document.getElementById("score-chart");
const resultsMessage = document.getElementById("results-message");


/* ============================================================
   4. APPLICATION INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", initializeQuiz);


/**
 * Starts the application.
 */
async function initializeQuiz() {

    try {

        showLoading("Loading quiz...");

        await loadQuizData();

        validateQuizData();

        setupQuizInformation();

        resetQuizState();

        displayQuestion();

        startTimer();

        quizStarted = true;

        hideLoading();

    } catch (error) {

        console.error("Quiz initialization failed:", error);

        showError(
            "Unable to load the quiz. Please check your Questionformat.json file and make sure Live Server is running."
        );
    }
}


/* ============================================================
   5. LOAD JSON DATA
   ============================================================ */

/**
 * Fetches Questionformat.json.
 */
async function loadQuizData() {

    const response = await fetch(QUESTION_FILE);

    if (!response.ok) {
        throw new Error(
            `Failed to load ${QUESTION_FILE}: ${response.status}`
        );
    }

    quizData = await response.json();

    questions = quizData.questions;
}


/* ============================================================
   6. VALIDATE QUIZ DATA
   ============================================================ */

/**
 * Performs basic validation on the JSON file.
 *
 * This prevents the application from silently breaking
 * because of malformed quiz data.
 */
function validateQuizData() {

    if (!quizData || typeof quizData !== "object") {
        throw new Error("Invalid quiz JSON.");
    }

    if (!quizData.quiz) {
        throw new Error("Missing 'quiz' object.");
    }

    if (!Array.isArray(quizData.questions)) {
        throw new Error("Missing 'questions' array.");
    }

    if (quizData.questions.length === 0) {
        throw new Error("The quiz contains no questions.");
    }

    questions.forEach((question, index) => {

        if (!question.question) {
            throw new Error(
                `Question ${index + 1} is missing its question text.`
            );
        }

        if (!Array.isArray(question.options)) {
            throw new Error(
                `Question ${index + 1} has no options array.`
            );
        }

        if (question.options.length !== 4) {
            throw new Error(
                `Question ${index + 1} must have exactly 4 options.`
            );
        }

        if (!question.correctAnswer) {
            throw new Error(
                `Question ${index + 1} is missing correctAnswer.`
            );
        }

        const optionIds =
            question.options.map(option => option.id);

        if (!optionIds.includes(question.correctAnswer)) {
            throw new Error(
                `Question ${index + 1} has an invalid correctAnswer.`
            );
        }
    });
}


/* ============================================================
   7. SETUP QUIZ INFORMATION
   ============================================================ */

/**
 * Displays quiz metadata from the JSON file.
 */
function setupQuizInformation() {

    const quiz = quizData.quiz;

    quizTitle.textContent =
        quiz.title || "CSE Mock Test";

    quizDescription.textContent =
        quiz.description || "";

    document.title =
        quiz.title || "CSE Mock Test";
}


/* ============================================================
   8. RESET QUIZ STATE
   ============================================================ */

/**
 * Resets all quiz variables.
 */
function resetQuizState() {

    currentQuestionIndex = 0;

    selectedAnswer = null;

    quizStarted = false;
    answerChecked = false;

    correctAnswers = 0;
    incorrectAnswers = 0;

    resetTimer();

    showQuestionScreen();

    resetResultScreen();
}


/* ============================================================
   9. DISPLAY QUESTION
   ============================================================ */

/**
 * Renders the current question on the page.
 */
function displayQuestion() {

    if (
        currentQuestionIndex < 0 ||
        currentQuestionIndex >= questions.length
    ) {
        return;
    }

    const question =
        questions[currentQuestionIndex];

    selectedAnswer = null;

    answerChecked = false;


    /* --------------------------------------------------------
       Question counter
       -------------------------------------------------------- */

    const currentNumber =
        currentQuestionIndex + 1;

    const totalQuestions =
        questions.length;

    questionCounter.textContent =
        `${currentNumber} / ${totalQuestions}`;

    questionNumber.textContent =
        `Question ${String(currentNumber).padStart(2, "0")}`;


    /* --------------------------------------------------------
       Question text
       -------------------------------------------------------- */

    questionText.textContent =
        question.question;


    /* --------------------------------------------------------
       Metadata
       -------------------------------------------------------- */

    questionSubject.textContent =
        question.subject || "CSE";

    questionTopic.textContent =
        question.topic || "General";

    questionDifficulty.textContent =
        question.difficulty || "Medium";


    /* --------------------------------------------------------
       Optional code / pseudocode
       -------------------------------------------------------- */

    if (
        question.code !== null &&
        question.code !== undefined &&
        String(question.code).trim() !== ""
    ) {

        questionCode.textContent =
            question.code;

        codeContainer.classList.remove("hidden");

    } else {

        questionCode.textContent = "";

        codeContainer.classList.add("hidden");
    }


    /* --------------------------------------------------------
       Answer options
       -------------------------------------------------------- */

    renderOptions(question.options);


    /* --------------------------------------------------------
       Reset feedback
       -------------------------------------------------------- */

    resetFeedback();


    /* --------------------------------------------------------
       Buttons
       -------------------------------------------------------- */

    checkAnswerButton.classList.remove("hidden");

    nextQuestionButton.classList.add("hidden");

    checkAnswerButton.disabled = true;


    /* --------------------------------------------------------
       Progress
       -------------------------------------------------------- */

    updateProgress(
        currentNumber,
        totalQuestions
    );
}


/* ============================================================
   10. RENDER OPTIONS
   ============================================================ */

/**
 * Places the four JSON options into the four
 * HTML option cards.
 */
function renderOptions(options) {

    optionCards.forEach((card, index) => {

        const option = options[index];

        if (!option) {
            card.classList.add("hidden");
            return;
        }

        card.classList.remove("hidden");

        card.dataset.option =
            option.id;

        const letterElement =
            card.querySelector(".option-letter");

        const textElement =
            card.querySelector(".option-text");

        letterElement.textContent =
            option.id;

        textElement.textContent =
            option.text;


        /* Remove previous states */

        card.classList.remove(
            "selected",
            "correct",
            "incorrect",
            "disabled"
        );
    });
}


/* ============================================================
   11. OPTION SELECTION
   ============================================================ */

optionCards.forEach(card => {

    card.addEventListener("click", () => {

        if (answerChecked) {
            return;
        }

        const optionId =
            card.dataset.option;

        selectAnswer(optionId);
    });
});


/**
 * Selects an answer.
 */
function selectAnswer(optionId) {

    selectedAnswer = optionId;

    optionCards.forEach(card => {

        const isSelected =
            card.dataset.option === optionId;

        card.classList.toggle(
            "selected",
            isSelected
        );
    });

    checkAnswerButton.disabled = false;
}


/* ============================================================
   12. CHECK ANSWER
   ============================================================ */

checkAnswerButton.addEventListener(
    "click",
    checkAnswer
);


/**
 * Checks the selected answer against the JSON answer key.
 */
function checkAnswer() {

    if (answerChecked) {
        return;
    }

    if (!selectedAnswer) {
        return;
    }

    const question =
        questions[currentQuestionIndex];

    const isCorrect =
        selectedAnswer === question.correctAnswer;

    answerChecked = true;


    /* --------------------------------------------------------
       Update score
       -------------------------------------------------------- */

    if (isCorrect) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }


    /* --------------------------------------------------------
       Highlight answers
       -------------------------------------------------------- */

    highlightAnswers(
        question.correctAnswer,
        selectedAnswer
    );


    /* --------------------------------------------------------
       Show feedback
       -------------------------------------------------------- */

    showAnswerFeedback(
        question,
        isCorrect
    );


    /* --------------------------------------------------------
       Disable answer selection
       -------------------------------------------------------- */

    optionCards.forEach(card => {

        card.classList.add("disabled");
    });


    /* --------------------------------------------------------
       Update buttons
       -------------------------------------------------------- */

    checkAnswerButton.classList.add("hidden");

    nextQuestionButton.classList.remove("hidden");


    /* --------------------------------------------------------
       Change button text on final question
       -------------------------------------------------------- */

    if (
        currentQuestionIndex ===
        questions.length - 1
    ) {

        nextQuestionButton.innerHTML =
            `View Results <span aria-hidden="true">→</span>`;
    }
}


/* ============================================================
   13. HIGHLIGHT ANSWERS
   ============================================================ */

/**
 * Highlights the correct answer and, if necessary,
 * the user's incorrect selection.
 */
function highlightAnswers(
    correctAnswer,
    userAnswer
) {

    optionCards.forEach(card => {

        const optionId =
            card.dataset.option;


        /* Correct answer */

        if (optionId === correctAnswer) {

            card.classList.add("correct");

            return;
        }


        /* User's incorrect answer */

        if (
            optionId === userAnswer &&
            userAnswer !== correctAnswer
        ) {

            card.classList.add("incorrect");
        }
    });
}


/* ============================================================
   14. SHOW ANSWER FEEDBACK
   ============================================================ */

/**
 * Displays correct/incorrect feedback and explanation.
 */
function showAnswerFeedback(
    question,
    isCorrect
) {

    answerFeedback.classList.remove(
        "hidden",
        "incorrect"
    );


    if (isCorrect) {

        feedbackIcon.textContent = "✓";

        feedbackTitle.textContent =
            "Correct";

        feedbackMessage.textContent =
            "Excellent. Your answer is correct.";

    } else {

        answerFeedback.classList.add(
            "incorrect"
        );

        feedbackIcon.textContent = "×";

        feedbackTitle.textContent =
            "Incorrect";

        feedbackMessage.textContent =
            `The correct answer is ${question.correctAnswer}.`;
    }


    answerExplanation.textContent =
        question.explanation ||
        "No explanation was provided for this question.";
}


/* ============================================================
   15. RESET FEEDBACK
   ============================================================ */

/**
 * Clears the feedback area when moving to a new question.
 */
function resetFeedback() {

    answerFeedback.classList.add("hidden");

    answerFeedback.classList.remove("incorrect");

    feedbackIcon.textContent = "✓";

    feedbackTitle.textContent = "Correct";

    feedbackMessage.textContent =
        "Your answer is correct.";

    answerExplanation.textContent = "";
}


/* ============================================================
   16. NEXT QUESTION
   ============================================================ */

nextQuestionButton.addEventListener(
    "click",
    moveToNextQuestion
);


/**
 * Moves to the next question or results screen.
 */
function moveToNextQuestion() {

    if (!answerChecked) {
        return;
    }

    if (
        currentQuestionIndex <
        questions.length - 1
    ) {

        currentQuestionIndex++;

        displayQuestion();

        scrollToQuizTop();

    } else {

        finishQuiz();
    }
}


/* ============================================================
   17. PROGRESS
   ============================================================ */

/**
 * Updates the progress bar and percentage.
 */
function updateProgress(
    current,
    total
) {

    const percentage =
        Math.round(
            (current / total) * 100
        );

    progressBar.style.width =
        `${percentage}%`;

    progressPercentage.textContent =
        `${percentage}%`;
}


/* ============================================================
   18. TIMER
   ============================================================ */

/**
 * Initializes the timer from the JSON duration.
 */
function resetTimer() {

    stopTimer();

    const duration =
        Number(
            quizData?.quiz?.durationMinutes
        );

    if (
        Number.isFinite(duration) &&
        duration > 0
    ) {

        remainingSeconds =
            Math.round(duration * 60);

    } else {

        /*
         * If durationMinutes is missing or zero,
         * the timer becomes a count-up-free display.
         */

        remainingSeconds = 0;
    }

    updateTimerDisplay();
}


/**
 * Starts the countdown timer.
 */
function startTimer() {

    stopTimer();

    const duration =
        Number(
            quizData?.quiz?.durationMinutes
        );

    if (
        !Number.isFinite(duration) ||
        duration <= 0
    ) {

        timerElement.textContent =
            "—";

        return;
    }

    remainingSeconds =
        Math.round(duration * 60);

    updateTimerDisplay();

    timerInterval =
        setInterval(() => {

            remainingSeconds--;

            updateTimerDisplay();

            if (remainingSeconds <= 0) {

                remainingSeconds = 0;

                stopTimer();

                handleTimeUp();
            }

        }, 1000);
}


/**
 * Stops the timer.
 */
function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


/**
 * Displays the remaining time.
 */
function updateTimerDisplay() {

    if (remainingSeconds <= 0) {

        timerElement.textContent =
            "00:00";

        return;
    }

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );

    const seconds =
        remainingSeconds % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


/**
 * Handles the timer reaching zero.
 */
function handleTimeUp() {

    if (!quizStarted) {
        return;
    }

    /*
     * If the user has already checked the current question,
     * simply finish the quiz.
     */

    if (answerChecked) {

        finishQuiz();

        return;
    }


    /*
     * If the user selected an answer but did not check it,
     * count it as incorrect.
     */

    if (selectedAnswer !== null) {

        incorrectAnswers++;

    } else {

        /*
         * An unanswered question is also counted as incorrect.
         */

        incorrectAnswers++;
    }

    finishQuiz();
}


/* ============================================================
   19. FINISH QUIZ
   ============================================================ */

/**
 * Calculates and displays final results.
 */
function finishQuiz() {

    stopTimer();

    quizStarted = false;

    const totalQuestions =
        questions.length;

    const answeredQuestions =
        correctAnswers +
        incorrectAnswers;


    /*
     * Safety check:
     * If the quiz ends with unanswered questions,
     * count them as incorrect.
     */

    if (
        answeredQuestions <
        totalQuestions
    ) {

        incorrectAnswers +=
            totalQuestions -
            answeredQuestions;
    }


    const percentage =
        Math.round(
            (correctAnswers /
                totalQuestions) *
            100
        );


    /* --------------------------------------------------------
       Score
       -------------------------------------------------------- */

    finalScore.textContent =
        correctAnswers;

    scorePercentage.textContent =
        `${percentage}%`;

    correctCount.textContent =
        correctAnswers;

    incorrectCount.textContent =
        incorrectAnswers;


    /* --------------------------------------------------------
       Chart
       -------------------------------------------------------- */

    updateScoreChart(percentage);


    /* --------------------------------------------------------
       Results message
       -------------------------------------------------------- */

    resultsMessage.textContent =
        createResultsMessage(
            percentage
        );


    /* --------------------------------------------------------
       Switch screens
       -------------------------------------------------------- */

    questionScreen.classList.add("hidden");

    resultsScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================================
   20. SCORE CHART
   ============================================================ */

/**
 * Updates the CSS donut chart.
 */
function updateScoreChart(percentage) {

    scoreChart.style.setProperty(
        "--score-angle",
        `${percentage}%`
    );
}


/* ============================================================
   21. RESULTS MESSAGE
   ============================================================ */

/**
 * Generates a simple result message.
 *
 * This is intentionally not a grading judgment.
 */
function createResultsMessage(percentage) {

    if (percentage === 100) {

        return "You answered every question correctly.";

    }

    if (percentage >= 80) {

        return "You answered most of the questions correctly.";

    }

    if (percentage >= 60) {

        return "You answered more than half of the questions correctly.";

    }

    if (percentage >= 40) {

        return "You answered some of the questions correctly.";

    }

    return "Quiz completed. Review the explanations and try again.";
}


/* ============================================================
   22. RESTART QUIZ
   ============================================================ */

restartButton.addEventListener(
    "click",
    restartQuiz
);


/**
 * Restarts the quiz from Question 1.
 */
function restartQuiz() {

    stopTimer();

    resetQuizState();

    startTimer();

    quizStarted = true;

    displayQuestion();

    scrollToQuizTop();
}


/* ============================================================
   23. SCREEN MANAGEMENT
   ============================================================ */

/**
 * Shows the question screen.
 */
function showQuestionScreen() {

    questionScreen.classList.remove(
        "hidden"
    );

    resultsScreen.classList.add(
        "hidden"
    );
}


/**
 * Resets the result screen.
 */
function resetResultScreen() {

    finalScore.textContent = "0";

    scorePercentage.textContent = "0%";

    correctCount.textContent = "0";

    incorrectCount.textContent = "0";

    resultsMessage.textContent =
        "You have completed the quiz.";

    updateScoreChart(0);
}


/* ============================================================
   24. LOADING STATE
   ============================================================ */

/**
 * Shows the loading overlay.
 */
function showLoading(message) {

    const loadingMessage =
        document.getElementById(
            "loading-message"
        );

    if (loadingMessage) {

        loadingMessage.textContent =
            message;
    }

    loadingScreen.classList.remove(
        "hidden"
    );
}


/**
 * Hides the loading overlay.
 */
function hideLoading() {

    loadingScreen.classList.add(
        "hidden"
    );
}


/* ============================================================
   25. ERROR HANDLING
   ============================================================ */

/**
 * Displays an application error.
 */
function showError(message) {

    hideLoading();

    questionScreen.classList.add(
        "hidden"
    );

    resultsScreen.classList.add(
        "hidden"
    );


    const errorElement =
        document.createElement("div");

    errorElement.className =
        "error-message";

    errorElement.textContent =
        message;


    document
        .querySelector(".quiz-app")
        .appendChild(errorElement);
}


/* ============================================================
   26. SCROLL HELPERS
   ============================================================ */

/**
 * Scrolls the quiz window to the top.
 */
function scrollToQuizTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================================
   27. KEYBOARD SUPPORT
   ============================================================ */

/**
 * Allows A/B/C/D keyboard shortcuts.
 *
 * Example:
 * Press A → select option A
 * Press B → select option B
 * Press C → select option C
 * Press D → select option D
 */
document.addEventListener(
    "keydown",
    event => {

        if (!quizStarted || answerChecked) {
            return;
        }

        const key =
            event.key.toUpperCase();

        if (
            key === "A" ||
            key === "B" ||
            key === "C" ||
            key === "D"
        ) {

            const option =
                document.querySelector(
                    `.option-card[data-option="${key}"]`
                );

            if (option) {

                selectAnswer(key);
            }
        }
    }
);


/* ============================================================
   28. PREVENT ACCIDENTAL FORM-LIKE SUBMISSION
   ============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document.activeElement.tagName === "BUTTON"
        ) {

            event.preventDefault();
        }
    }
);