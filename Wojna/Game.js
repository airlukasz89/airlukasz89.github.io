class Game {
    constructor() {
        let _isGameStarted = false;
        let _choosenPlayerImg = document.getElementById('choosenPlayer');
        let _choosenComputerImg = document.getElementById('choosenComputer');

        let _cardsManager = new CardsManager(_choosenPlayerImg, _choosenComputerImg);

        let _startButton = document.getElementsByClassName('start')[0];
        _startButton.addEventListener('click', () => {
            if (_isGameStarted) return;

            _cardsManager.generateCards();
            _cardsManager.giveCards();
            _cardsManager.makeNextTurn();
            _cardsManager.logCards();
            _isGameStarted = true;
        });

        let _nextTurnButton = document.getElementsByClassName('next')[0];
        _nextTurnButton.addEventListener('click', () => {
            if (!_isGameStarted) return;


            console.log('--------------------------------------')
            if (_cardsManager.makeNextTurn()) {
                _cardsManager.clearCards();
                _isGameStarted = false;
                console.log('koniec gry!!!');
            }

            _cardsManager.logCards();
            console.log('--------------------------------------')
        });


    }
}