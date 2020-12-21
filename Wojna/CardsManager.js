class CardsManager {
    constructor() {
        let _cardsAll = [];
        let _cardsPlayer = [];
        let _cardsComputer = [];
        let _chosenPlayerCards = [];
        let _chosenComputerCards = [];
        let _amountCardToTake = 1;


        this.generateCards = () => {
            for (let i = 1; i <= 52; i++) {
                _cardsAll.push(new Card(i));
            }
            for (let i = 1; i <= 52; i++) {
                _cardsAll.push(new Card(i));
            }

        }

        this.giveCards = () => {
            let allCardsLength = _cardsAll.length;
            for (let i = 1; i <= allCardsLength; i++) {
                let randomIndex = Math.floor(Math.random() * _cardsAll.length);
                let randomCard = _cardsAll[randomIndex];
                if (i % 2 !== 0) {
                    _cardsPlayer.push(randomCard);
                } else {
                    _cardsComputer.push(randomCard);
                }
                _cardsAll.splice(randomIndex, 1);
            }
            console.log(_cardsAll.length);
        }

        this.clearCards = () => {
            _cardsAll = [];
            _cardsPlayer = [];
            _cardsComputer = [];
            _chosenPlayerCards = [];
            _chosenComputerCards = [];
        }


        let _checkChosenCardsResult = () => {
            let topPlayerCardValue = _chosenPlayerCards[_chosenPlayerCards.length - 1].getValue();
            let topComputerCardValue = _chosenComputerCards[_chosenComputerCards.length - 1].getValue();

            console.log('PLAYER:' + topPlayerCardValue);
            console.log('COMPUTER:' + topComputerCardValue);

            if (topPlayerCardValue > topComputerCardValue) {
                return TurnResult.PlayerWin;

            }
            if (topPlayerCardValue < topComputerCardValue) {
                return TurnResult.ComputerWin;
            }
            if (topPlayerCardValue === topComputerCardValue) {
                return TurnResult.Draw;
            }
        }

        let _checkIfGameIsOver = () => {
            if (_cardsPlayer.length === 0 || _cardsComputer.length === 0) {
                return true;
            }
            return false;
        }

        this.logCards = () => {
            console.log('_cardsAll ' + _cardsAll.length);
            console.log('_cardsComputer ' + _cardsComputer.length);
            console.log('_cardsPlayer ' + _cardsPlayer.length);
            console.log('_chosenPlayerCards ' + _chosenPlayerCards.length);
            console.log('_chosenComputerCards ' + _chosenComputerCards.length);
        }


        this.makeNextTurn = () => {
            for (let i = 0; i < _amountCardToTake; i++) {
                _chosenPlayerCards.push(_cardsPlayer.pop());
                _chosenComputerCards.push(_cardsComputer.pop());
            }

            let result = _checkChosenCardsResult();


            if (result === TurnResult.PlayerWin) {
                _cardsPlayer = _chosenComputerCards.concat(_cardsPlayer);
                _chosenComputerCards = [];
                _cardsPlayer = _chosenPlayerCards.concat(_cardsPlayer);
                _chosenPlayerCards = [];
                _amountCardToTake = 1;
                console.log('wygrałeś');
            }

            if (result === TurnResult.ComputerWin) {
                _cardsComputer = _chosenPlayerCards.concat(_cardsComputer);
                _chosenPlayerCards = [];
                _cardsComputer = _chosenComputerCards.concat(_cardsComputer);
                _chosenComputerCards = [];
                _amountCardToTake = 1;
                console.log('przegrałeś');
            }

            if (result === TurnResult.Draw) {
                console.log('remisss!!!');
                _amountCardToTake++;
                if (_cardsPlayer.length < _amountCardToTake ||
                    _cardsComputer.length < _amountCardToTake) {
                    return true;
                }
                return false;
            }

            return _checkIfGameIsOver();
        }
    }
}