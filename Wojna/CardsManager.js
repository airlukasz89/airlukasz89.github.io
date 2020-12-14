class CardsManager {
    constructor() {
        let _cardsAll = [];
        let _cardsPlayer = [];
        let _cardsComputer = [];
        let _usedCardsPlayer = [];
        let _usedCardsComputer = [];
        let _chosenPlayerCard = null;
        let _chosenComputerCard = null;
        let _playerPoints = 0;


        this.generateCards = () => {
            for (let i = 1; i <= 104; i++) {
                _cardsAll.push(new Card(i));
            }

        }

        this.giveCards = () => {
            for (let i = 1; i <= _cardsAll.length; i++) {
                let randomIndex = Math.floor(Math.random() * _cardsAll.length);
                let randomCard = _cardsAll[randomIndex];
                if (i % 2 !== 0) {
                    _cardsPlayer.push(randomCard);
                } else {
                    _cardsComputer.push(randomCard);
                }



            }
        }
        this.makeNextTurn = () => {
            _chosenPlayerCard = _cardsPlayer.pop();
            _chosenComputerCard = _cardsComputer.pop();
            if (_chosenPlayerCard.getValue() > _chosenComputerCard.getValue()) {
                _playerPoints++;
            }

            _usedCardsPlayer.push(_chosenPlayerCard);
            _usedCardsComputer.push(_chosenComputerCard);



            console.log(_chosenPlayerCard.getValue());
            console.log(_chosenComputerCard.getValue());

        }
    }
}