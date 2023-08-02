const but = document.querySelector('#show-popup');
const form = document.querySelector('#pop');
const popup = document.querySelector('.popup');

but.addEventListener('click', () => {
    form.classList.add('open');
    popup.classList.add('popup_open');
});

const x = document.querySelector('#x');
x.addEventListener('click', () => {
    form.classList.remove('open');
    popup.classList.remove('popup_open');
    document.getElementById('form').reset();
});

function validate1(ev) {
    const form = ev.currentTarget;
    //console.log(form);
    form.querySelectorAll("span").forEach((elem) => elem.remove());
    const vName = isFullText(form.name);
    const vFamily = isFullText(form.family);
    const vMail = isCorrectMail(form.mail);
    const vText = isFullText(form.text);
    console.log(vName);
    if (!vName || !vFamily || !vMail || !vText) ev.preventDefault();
}

function isFullText(fieldInp) {

    console.log(fieldInp)
    if (fieldInp.value.trim().length === 0) {
        fieldInp.classList.add("alert");
        const message = document.createElement("span");
        message.textContent = "Заполните это поле!";
        fieldInp.after(message);
        return false;
    }
    fieldInp.classList.remove("alert");
    return true;
}

/*Возраст должно быть не пустым, допустимы числовые значения в диапазоне от 6 до 125 лет*/


const email = document.getElementById('mail');


function isCorrectMail(text) {
    if (!isFullText(text)) return false;
    if (email.validity.typeMismatch) {
        text.classList.add("alert");
        const message = document.createElement("span");
        message.textContent = "Некорректное значение, пример: ivanov@ivanov.by";
        text.after(message);
        return false;
    }
    text.classList.remove("alert");
    return true;
}

window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#form").addEventListener("submit", validate1);

});
