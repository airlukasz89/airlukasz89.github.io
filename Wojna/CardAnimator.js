class CardAnimator {
    constructor(playerDeckImg, computerDeckImg, choosenPlayerImg, choosenComputerImg) {
        let _playerDeckImg = playerDeckImg;
        let _computerDeckImg = computerDeckImg;
        let _choosenPlayerImg = choosenPlayerImg;
        let _choosenComputerImg = choosenComputerImg

        this.animate = () => {
            let playerDeckAnimationImg = document.createElement("img");

            playerDeckAnimationImg.src = `${window.pathPrefix}/JPEG/blue_back.jpg`;
            playerDeckAnimationImg.classList.add("aniamtion-img");
            playerDeckAnimationImg.style.left = `${_playerDeckImg.getBoundingClientRect().left}px`
            document.getElementsByClassName("card-container")[0].appendChild(playerDeckAnimationImg);

            setTimeout(() => {
                playerDeckAnimationImg.style.left = `${_choosenPlayerImg.getBoundingClientRect().left}px`
            }, 1)
        }

    }
}