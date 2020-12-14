class Game {
    constructor() {
        let _cardsManager = new CardsManager();
        _cardsManager.generateCards();
        let _isGameStarted = false;
        let startButton = document.getElementsByClassName('start')[0];
        startButton.addEventListener('click', () => {
            if (_isGameStarted) return;
            _cardsManager.giveCards();
            _cardsManager.makeNextTurn();
            _isGameStarted = true;
        });

        let nextTurnButton = document.getElementsByClassName('next')[0];
        nextTurnButton.addEventListener('click', () => {
            if (!_isGameStarted) return;
            _cardsManager.makeNextTurn();
        });


    }
}