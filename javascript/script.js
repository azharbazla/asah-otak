document.addEventListener("DOMContentLoaded", () => {
    const inputContainer = document.getElementById('input-container');
    const clueElement = document.getElementById('clue');
    const resultElement = document.getElementById('result');
    const totalScoreElement = document.getElementById('total-score');
    const submitAnswerButton = document.getElementById('submit-answer');
    const saveScoreButton = document.getElementById('save-score');
    const resetGameButton = document.getElementById('reset-game');

    let currentWord = '';
    let totalScore = 0;
    let clue = '';

    function fetchRandomWord() {
        fetch('php/get_word.php')
            .then(response => response.json())
            .then(data => {
                currentWord = data.kata.toUpperCase();
                clue = data.clue;
                clueElement.textContent = `Clue: ${clue}`;
                generateInputBoxes(currentWord);
            })
            .catch(error => console.error('Error fetching word:', error));
    }

    function generateInputBoxes(word) {
        inputContainer.innerHTML = '';
        for (let i = 0; i < word.length; i++) {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '1');
            input.setAttribute('data-index', i);
            input.classList.add('letter-input');
            inputContainer.appendChild(input);

            if (i === 2 || i === 6) {
                input.value = word[i];
                input.setAttribute('readonly', true);
            }
        }
    }

    function calculateScore() {
        const inputs = document.querySelectorAll('.letter-input');
        let score = 0;

        inputs.forEach((input, index) => {
            const userAnswer = input.value.toUpperCase();
            const correctAnswer = currentWord[index];

            if (index === 2 || index === 6)
                return
            if (userAnswer === correctAnswer)
                score += 10;
            if (userAnswer !== correctAnswer)
                score -= 2;
        });

        totalScore += score;
        totalScoreElement.textContent = totalScore;
        resultElement.textContent = `Poin yang anda dapat adalah ${score}`;
    }

    function resetGame() {
        totalScore = 0;
        totalScoreElement.textContent = totalScore;
        resultElement.textContent = '';
        fetchRandomWord();
    }

    function fetchScoreHistory() {
        fetch('php/score_history.php')
            .then(response => response.json())
            .then(data => {
                const scoreHistoryElement = document.getElementById('score-history');
                scoreHistoryElement.innerHTML = '';
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(score => {
                        const li = document.createElement('li');
                        li.textContent = `${score.nama_user}: ${score.total_point} points`;
                        scoreHistoryElement.appendChild(li);
                    });
                } else
                    scoreHistoryElement.innerHTML = 'No scores found';
            })
            .catch(error => console.error('Error fetching score history:', error));
    }

    submitAnswerButton.addEventListener('click', calculateScore);
    resetGameButton.addEventListener('click', resetGame);

    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');

    saveScoreButton.addEventListener('click', () => {
        document.getElementById('totalScore').value = totalScore;
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        resetGame();
    });

    fetchRandomWord();
    fetchScoreHistory();
});
