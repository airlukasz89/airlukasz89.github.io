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

        let _winsPlayerSpan = document.querySelector("p.wins-player span");
        let _winsComputerSpan = document.querySelector("p.wins-computer span");
        let _drawsSpan = document.querySelector("p.draws span");
        let _whoWinSpan = document.querySelector('[data-summary="who-win"]');

        let _statistics = new Statistics(_winsPlayerSpan, _winsComputerSpan, _drawsSpan, _whoWinSpan);

        let _onStartClick = () => {
            if (_isGameStarted) return;

            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

            _card.classList.remove('is-none');
            _card2.classList.remove('is-none');

            _cardsManager.generateCards();
            _cardsManager.giveCards();
            _statistics.clear();

            _cardsManager.makeNextTurn();

            let lastTurnResult = _cardsManager.getLastTurnResult();
            _statistics.givePointWinner(lastTurnResult);

            _cardsManager.logCards();

            _isGameStarted = true;
        };

        let _onNextClick = () => {
            if (!_isGameStarted) return;

            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

            console.log('--------------------------------------')
            if (_cardsManager.makeNextTurn()) {
                _cardsManager.clearCards();
                _whoWinSpan.textContent = "KONIEC GRY";
                drawTitle("KONIEC GRY");
                _isGameStarted = false;
                console.log('koniec gry!!!');
                setTimeout(() => {
                    location.reload();
                }, 5000);
            } else {
                let lastTurnResult = _cardsManager.getLastTurnResult();
                setTimeout(() => {
                    _statistics.givePointWinner(lastTurnResult)
                }, 1000);
            }

            _cardsManager.logCards();
            console.log('--------------------------------------')
        }

        let _startButton = document.getElementsByClassName('start')[0];
        _startButton.addEventListener('click', () => {
            _onStartClick();
        });


        let _left;
        let _nextTurnButton = document.getElementsByClassName('next')[0];
        _nextTurnButton.addEventListener('click', () => {
            _onNextClick();
            let playerDeckImg = document.getElementById("playerDeck");
            console.log(playerDeckImg.getBoundingClientRect().top);
            console.log(playerDeckImg.getBoundingClientRect().left);

            let startPlaceY = playerDeckImg.getBoundingClientRect().top;
            let startPlaceX = playerDeckImg.getBoundingClientRect().left;
            let endPlaceY = _choosenPlayerImg.getBoundingClientRect().top;
            let endPlaceX = _choosenPlayerImg.getBoundingClientRect().left;
            let playerDeckAnimationImg = document.createElement("img");
            let dx = startPlaceX - endPlaceX;
            let dy = startPlaceY - endPlaceY;
            let angle = Math.atan2(dy, dx)
            _left = endPlaceX;
            let xVelocity = Math.cos(angle);
            let yVelocity = Math.sin(angle);

            playerDeckAnimationImg.src = `${window.pathPrefix}/JPEG/Green_back.jpg`;
            playerDeckAnimationImg.style = 'position:absolute;width:200px;height:260px;;z-index:100;background:#000';
            document.getElementsByClassName("card-container")[0].appendChild(playerDeckAnimationImg);
            setInterval(() => {
                playerDeckAnimationImg.style.left = `${_left+=xVelocity}px`;
            }, 50);


        });

        let _autoInterval = null;
        let _autoButton = document.getElementsByClassName('auto')[0];
        _autoButton.addEventListener('click', () => {
            if (!_isGameStarted) return;

            _autoButton.classList.toggle("active");

            if (_autoInterval != null) {
                clearInterval(_autoInterval)
                _autoInterval = null;
                _nextTurnButton.removeAttribute("disabled");
            } else {
                _nextTurnButton.setAttribute("disabled", "true");
                _onNextClick();
                _autoInterval = setInterval(() => {
                    _onNextClick();
                }, 1000);
            }
        });

    }
}