class Game {
    constructor() {
        let _isGameStarted = false;
        let _choosenPlayerImg = document.getElementById('choosenPlayer');
        let _choosenComputerImg = document.getElementById('choosenComputer');
        let _choosenPlayerImg2 = document.getElementById('choosenPlayer2');
        let _choosenComputerImg2 = document.getElementById('choosenComputer2');


        let _cardsManager = new CardsManager(_choosenPlayerImg, _choosenComputerImg, _choosenPlayerImg2, _choosenComputerImg2);

        let _card = document.querySelector('.card');
        let _card2 = document.querySelector('.card2');

        let _startButton = document.getElementsByClassName('start')[0];
        _startButton.addEventListener('click', () => {
            if (_isGameStarted) return;
            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

            _cardsManager.generateCards();
            _cardsManager.giveCards();

            _cardsManager.makeNextTurn();
            _cardsManager.logCards();

            _isGameStarted = true;
        });

        let _nextTurnButton = document.getElementsByClassName('next')[0];
        _nextTurnButton.addEventListener('click', () => {
            if (!_isGameStarted) return;
            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

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