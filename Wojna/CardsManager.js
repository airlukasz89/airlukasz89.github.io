class CardsManager {
    constructor() {
        let _cardsAll = [];
        let _cardsPlayer = [];
        let _cardsComputer = [];
        let _usedCardsPlayer = [];
        let _usedCardsComputer = [];
        let _chosenPlayerCards = [];
        let _chosenComputerCards = [];


        this.generateCards = () => {
            for (let i = 1; i <= 6; i++) {
                _cardsAll.push(new Card(i));
            }
            for (let i = 1; i <= 6; i++) {
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
            _usedCardsPlayer = [];
            _usedCardsComputer = [];
            _chosenPlayerCards = [];
            _chosenComputerCards = [];
        }


        let _checkChosenCardsResult = () => {
            let topPlayerCardValue = _chosenPlayerCards[_chosenPlayerCards.length - 1].getValue();
            let topComputerCardValue = _chosenComputerCards[_chosenComputerCards.length - 1].getValue();

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

        let _tryTransferUsedCardsToPlayers = () => {
            if (_cardsPlayer.length === 0) {
                _cardsPlayer = [..._usedCardsPlayer];
                _usedCardsPlayer = [];

            }

            if (_cardsComputer.length === 0) {
                _cardsComputer = [..._usedCardsComputer];
                _usedCardsComputer = [];
            }
        }

        let _checkIfGameIsOver = () => {
            if (_cardsPlayer.length === 0 || _cardsComputer.length === 0) {
                return true;
            }
            return false;
        }

        let _logCards = () => {
            console.log('_cardsAll ' + _cardsAll.length);
            console.log('_cardsComputer ' + _cardsComputer.length);
            console.log('_cardsPlayer ' + _cardsPlayer.length);
            console.log('_usedCardsPlayer ' + _usedCardsPlayer.length);
            console.log('_usedCardsComputer ' + _usedCardsComputer.length);
            console.log('_chosenPlayerCards ' + _chosenPlayerCards.length);
            console.log('_chosenComputerCards ' + _chosenComputerCards.length);
        }


        this.makeNextTurn = (amountCardToTake) => {
            console.log('--------------------------------------')
            for (let i = 0; i < amountCardToTake; i++) {
                _chosenPlayerCards.push(_cardsPlayer.pop());
                _chosenComputerCards.push(_cardsComputer.pop());
            }

            let result = _checkChosenCardsResult();


            if (result === TurnResult.PlayerWin) {
                _usedCardsPlayer = _usedCardsPlayer.concat(_chosenComputerCards);
                _chosenComputerCards = [];
                _usedCardsPlayer = _usedCardsPlayer.concat(_chosenPlayerCards);
                _chosenPlayerCards = [];
                console.log('wygrałeś');
            }

            if (result === TurnResult.ComputerWin) {
                _usedCardsComputer = _usedCardsComputer.concat(_chosenPlayerCards);
                _chosenPlayerCards = [];
                _usedCardsComputer = _usedCardsComputer.concat(_chosenComputerCards);
                _chosenComputerCards = [];
                console.log('przegrałeś');
            }

            if (result === TurnResult.Draw) {
                console.log('remisss!!!');
                this.makeNextTurn(amountCardToTake + 1);
            }

            _tryTransferUsedCardsToPlayers();
            _logCards();

            console.log('--------------------------------------')
            return _checkIfGameIsOver();
        }
    }
}