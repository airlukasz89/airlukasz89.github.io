class CardAnimator {
    constructor(playerDeckImg, computerDeckImg, choosenPlayerImg, choosenComputerImg) {
        let _playerDeckImg = playerDeckImg;
        let _computerDeckImg = computerDeckImg;
        let _choosenPlayerImg = choosenPlayerImg;
        let _choosenComputerImg = choosenComputerImg

        //let _animate(src, fromImg, toImg)
        //this.animatePlayerCard() -> _animate(...)
        //this.animateComputerCard() -> _animate(...)
        this.animate = () => {
            let playerDeckAnimationImg = document.createElement("img");

            playerDeckAnimationImg.src = `${window.pathPrefix}/JPEG/blue_back.jpg`;
            playerDeckAnimationImg.classList.add("aniamtion-img");
            playerDeckAnimationImg.style.left = `${_playerDeckImg.getBoundingClientRect().left}px`
            document.getElementsByClassName("card-container")[0].appendChild(playerDeckAnimationImg);

            setTimeout(() => {
                playerDeckAnimationImg.style.left = `${_choosenPlayerImg.getBoundingClientRect().left}px`
            }, 1)

            setTimeout(() => {
                document.getElementsByClassName("card-container")[0].removeChild(playerDeckAnimationImg);
            }, 2000);

            let computerDeckAnimationImg = document.createElement("img");

            computerDeckAnimationImg.src = `${window.pathPrefix}/JPEG/Green_back.jpg`;
            computerDeckAnimationImg.classList.add("aniamtion-img");
            computerDeckAnimationImg.style.left = `${_computerDeckImg.getBoundingClientRect().left}px`
            document.getElementsByClassName("card-container")[2].appendChild(computerDeckAnimationImg);

            setTimeout(() => {
                computerDeckAnimationImg.style.left = `${_choosenComputerImg.getBoundingClientRect().left}px`
            }, 1)

            setTimeout(() => {
                document.getElementsByClassName("card-container")[2].removeChild(computerDeckAnimationImg);
            }, 2000)
        }

    }
}