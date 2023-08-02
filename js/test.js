//работа анкеты
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");


//Класс, который представляет сам тест
class Quiz {
    constructor(type, questions, results) {

        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index) {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if (value >= 1) {
            correct = index;
        } else {
            //Иначе ищем, какой ответ может быть правильным
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next() {
        this.current++;

        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

//Класс, представляющий вопрос
class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

//Класс, представляющий ответ
class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

//Класс, представляющий результат
class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value) {
        return this.value <= value;
    }
}

//Массив с результатами
const results =
    [
        new Result("Вы, наверняка, быстро бегаете и ничего не знаете о комарах!", 0),
        new Result("Оу, Комаринскую Вы точно умеете танцевать и веткой часть комаров разгоните - есть шансы на спасение!", 2),
        new Result("Да Вы почти комариный эксперт! Бойся комариная братия!", 4),
        new Result("К Вашим ответам и комар носа не подточит! Комары вряд ли с Вами свяжутся", 6)
    ];

//Массив с вопросами
const questions =
    [
        new Question("Почему зудят комариные укусы?",
            [
                new Answer("Из-за особенностей строения хоботка", 0),
                new Answer("Из-за глубины прокола", 0),
                new Answer("Из-за комариной слюны", 1),
                new Answer("Из-за микробов на поверхности кожи", 0)
            ]),

        new Question("Кто кусается: комар или комариха?",
            [
                new Answer("Все комары кусаются", 0),
                new Answer("Только комары-самцы", 0),
                new Answer("Только комарихи", 1),
                new Answer("Да они вообще не кусаются!", 0)
            ]),

        new Question("Что не едят/пьют комары?",
            [
                new Answer("Нектары растений", 0),
                new Answer("Слезы животных и птиц", 1),
                new Answer("Соки растений", 0),
                new Answer("Воду", 0)
            ]),

        new Question("Чем пищит комар?",
            [
                new Answer("Крыльями", 1),
                new Answer("Хоботком", 0),
                new Answer("Лапками", 0),
                new Answer("Усиками", 0)
            ]),

        new Question("Что не привлекает комаров?",
            [
                new Answer("Пот", 0),
                new Answer("Цвет глаз", 1),
                new Answer("Дыхание", 0),
                new Answer("Температура тела", 0)
            ]),

        new Question("Как называют химические препараты, которые, испаряясь, тлея или дымя, уничтожают комаров (и других насекомых-вредителей) в радиусе своего действия?",
            [
                new Answer("Фуникулёры", 0),
                new Answer("Фосфаты", 0),
                new Answer("Фумиганты", 1),
                new Answer("Фумаролы", 0)
            ])
    ];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
    //Проверяем, есть ли ещё вопросы
    if (quiz.current < quiz.questions.length) {
        //Если есть, меняем вопрос в заголовке
        headElem.innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", 'i');

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    } else {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Очки: " + quiz.score;

    }
}

function Init() {
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) {
            Click(e.target.getAttribute("index"));
        });
    }
}

function Click(index) {
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);

    //Находим все кнопки
    let btns = document.getElementsByClassName("button");


    //Делаем кнопки серыми
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }

    //это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if (quiz.type === 1) {
        if (correct >= 0) {
            btns[correct].className = "button button_correct";
        }

        if (index !== correct) {
            btns[index].className = "button button_wrong";
        }
    } else {
        //Иначе просто подсвечиваем зелёным ответ пользователя
        btns[index].className = "button button_correct";
    }

    //Ждём секунду и обновляем тест
    setTimeout(Update, 2000);
}