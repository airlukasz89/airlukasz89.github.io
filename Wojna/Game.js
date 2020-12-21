class Game {
    constructor() {
        let _cardsManager = new CardsManager();
        let _isGameStarted = false;

        let startButton = document.getElementsByClassName('start')[0];
        startButton.addEventListener('click', () => {
            if (_isGameStarted) return;

            _cardsManager.generateCards();
            _cardsManager.giveCards();
            _cardsManager.makeNextTurn(1);
            _isGameStarted = true;
        });

        let nextTurnButton = document.getElementsByClassName('next')[0];
        nextTurnButton.addEventListener('click', () => {
            if (!_isGameStarted) return;

            if (_cardsManager.makeNextTurn(1)) {
                _cardsManager.clearCards();
                _isGameStarted = false;
                console.log('koniec gry!!!');
            }


        });


    }
}