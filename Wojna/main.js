const h1Text = document.querySelector('.text');
const txt = 'Gra karciana typu wojna :D :D :D'

let indexText = 0;

const addLetter = () => {
    h1Text.textContent += txt[indexText];
    indexText++;
    if (indexText === txt.length) clearInterval(indexTyping);
}
const indexTyping = setInterval(addLetter, 90);