const btnMes = document.querySelector(".start");
const spnText = document.querySelector('.text');
const spnCursor = document.querySelector('.cursor');
const txt = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias ducimus quidem neque culpa eius repellendus dignissimos voluptas dolor, illum eligendi nihil corrupti nam eum perferendis quia ad. Repudiandae, voluptatum deleniti?'

let indexText = 0;
const time = 50;
let indexTyping;

const showMessage = () => {
  spnText.textContent += txt[indexText]
  indexText++;

  if (indexText === txt.length)
    clearInterval(indexTyping);
}

const cursorAnimation = () => {
  spnCursor.classList.toggle("active");
}

btnMes.addEventListener("click", () => {
  indexText = 0;
  setInterval(cursorAnimation, 400);
  setTimeout(() => {
    indexTyping = setInterval(showMessage, time);
  }, 2000)
});
