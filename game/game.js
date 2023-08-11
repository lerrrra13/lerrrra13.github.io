// Создаем муху
const fly = document.createElement("img");
fly.src = "images/fly.png";
fly.style.position = "absolute";
fly.style.top = "50%";
fly.style.left = "50%";
document.body.appendChild(fly);

// Создаем победившего мальчика
const noFly = document.createElement("img");
noFly.src = "images/nofly.png";
noFly.style.position = "absolute";
noFly.style.top = "50%";
noFly.style.left = "50%";
noFly.style.transform = "translate(-50%, -50%)";
noFly.style.display = "none";
document.body.appendChild(noFly);


// Создаем функцию для полета комара
function moveFly() {
    // Получение текущего положения комара
    let currentTop = parseInt(fly.style.top);
    let currentLeft = parseInt(fly.style.left);

    // Генерируем случайное направление движения комара
    let direction = Math.floor(Math.random() * 5);

    // Перемещение комара
    switch (direction) {
        case 0: // ВВерх
            currentTop -= 50;
            break;
        case 1: // Вниз
            currentTop += 50;
            break;
        case 2: // Влево
            currentLeft -= 50;
            break;
        case 3: // Вправо
            currentLeft += 50;
            break;
    }

    // Проверка, находится ли комар в пределах экрана
    if (currentTop < 0 || currentTop > window.innerHeight - fly.height ||
        currentLeft < 0 || currentLeft > window.innerWidth - fly.width) {
        // Если муха вышла за пределы, везвращаем ее обратно в пределы
        currentTop = Math.min(Math.max(currentTop, 0), window.innerHeight - fly.height);
        currentLeft = Math.min(Math.max(currentLeft, 0), window.innerWidth - fly.width);
    }

    // Обновление положение комара
    fly.style.top = currentTop + "px";
    fly.style.left = currentLeft + "px";

}


// Вызывать функцию moveFly каждые 100 мс.
setInterval(moveFly, 100);

// Добавление слушателя событий на клик к элементу fly
fly.addEventListener("click", function () {
    // Скрыть элемент fly и показать элемент noFly
    fly.style.display = "none";
    noFly.style.display = "block";
    let text = document.getElementById('text');
    text.style.display = "flex";
    text.innerHTML = "Да вы мастер антикомариной борьбы!<br> " +
        "<span>Чтобы еще раз побороться с комаром - кликните по мальчику:)</span>";

});

// Добавление слушателя событий на клик к элементу noFly
noFly.addEventListener("click", function () {
    // Скрыть элемент nofly и показать элемент Fly
    fly.style.display = "block";
    noFly.style.display = "none";
    let text = document.getElementById('text');
    text.innerHTML = "";
    text.style.display = "none";


});


