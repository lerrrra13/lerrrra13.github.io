//лоадер до полной загрузки страницы
window.onload = function () {
    window.setTimeout(function () {
        document.body.classList.add('loaded_hiding');
        setTimeout(function () {
            document.body.classList.add('loaded');
        }, 500)
    }, 2500);
}
const lerp = (a, b, n) => (1 - n) * a + n * b;

class Cursor {
    constructor() {
        // config
        this.target = {x: 0.5, y: 0.5}; // mouse position
        this.cursor = {x: 0.5, y: 0.5}; // cursor position
        this.speed = 0.2;
        this.init();
    }

    bindAll() {
        ["onMouseMove", "render"].forEach((fn) => (this[fn] = this[fn].bind(this)));
    }

    onMouseMove(e) {
        //get normalized mouse coordinates [0, 1]
        this.target.x = e.clientX / window.innerWidth;
        this.target.y = e.clientY / window.innerHeight;
        // trigger loop if no loop is active
        if (!this.raf) this.raf = requestAnimationFrame(this.render);
    }

    render() {
        //calculate lerped values
        this.cursor.x = lerp(this.cursor.x, this.target.x, this.speed);
        this.cursor.y = lerp(this.cursor.y, this.target.y, this.speed);
        document.documentElement.style.setProperty("--cursor-x", this.cursor.x);
        document.documentElement.style.setProperty("--cursor-y", this.cursor.y);
        //cancel loop if mouse stops moving
        const delta = Math.sqrt(
            Math.pow(this.target.x - this.cursor.x, 2) +
            Math.pow(this.target.y - this.cursor.y, 2)
        );
        if (delta < 0.001) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
            return;
        }
        //or continue looping if mouse is moving
        this.raf = requestAnimationFrame(this.render);
    }

    init() {
        this.bindAll();
        window.addEventListener("mousemove", this.onMouseMove);
        this.raf = requestAnimationFrame(this.render);
    }
}

new Cursor();

// плавный скролл

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}


//отображение Офлайн магазинов
const button_ofline = document.querySelector('.ofline_6');
button_ofline.addEventListener('click', toggleElements1);

function toggleElements1() {
    // Получение элементов класса
    const elements = document.getElementsByClassName('toggle-element');
    const elements1 = document.getElementsByClassName('toggle-element1');
    //
    const isHidden = Array.from(elements1).some(element => element.style.display === 'none');

    // Проверка видимости элементов
    Array.from(elements1).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
    Array.from(elements).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'block';
        }
    });
}

const button_online = document.querySelector('.online_6');
button_online.addEventListener('click', toggleElements);

function toggleElements() {
    // получаем элементы
    const elements = document.getElementsByClassName('toggle-element');
    const elements1 = document.getElementsByClassName('toggle-element1');
    //
    const isHidden = Array.from(elements).some(element => element.style.display === 'none');

    // проверка видимости элементов
    Array.from(elements).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
    Array.from(elements1).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'block';
        }
    });
}

// Добавление события на кнопку

const logo_6 = document.querySelector('.logo_6');
logo_6.addEventListener('click', visualElementsAll);

function visualElementsAll() {
    const elements = document.getElementsByClassName('toggle-element');
    const elements1 = document.getElementsByClassName('toggle-element1');
    //
    const isHidden = Array.from(elements1).some(element => element.style.display === 'none');

    // проверка видимости элементов
    Array.from(elements1).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'block';
        }
    });
    Array.from(elements).forEach(element => {
        if (isHidden) {
            element.style.display = 'block';
        } else {
            element.style.display = 'block';
        }
    });
}


// аккордеон
let accItem = document.getElementsByClassName('accordionItem');
let accHD = document.getElementsByClassName('accordionItemHeading');
for (let i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass === 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
}

//бургер

const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__link");

burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
});

menuLinks.forEach((link) =>
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        burger.classList.remove("active");
    })
);
//Проигрыватель
// Добавляем кнопку

document.getElementById('video_play').onclick = function () {
    let el = document.getElementById('videoScreen');
    let field = document.getElementById('field');
    el.style.display === 'flex' ? el.style.display = 'none' : el.style.display = 'flex';
    field.style.display === 'none' ? field.style.display = 'flex' : field.style.display = 'none';


}
document.getElementById('video').onclick = function () {
    if (this.pause) {
        this.play()
    } else {
        this.pause()
    }
    let el = document.getElementById('videoScreen');
    let field = document.getElementById('field');
    el.style.display === 'none' ? el.style.display = 'flex' : el.style.display = 'none';
    field.style.display === 'flex' ? field.style.display = 'none' : field.style.display = 'flex';

}