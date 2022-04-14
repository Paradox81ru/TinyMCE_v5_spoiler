# TinyMCE_v5_spoiler

## Описание
***[spoiler.js](spoiler/plugin.js)*** - плагин "Спойлер" для текстового WEB редактора TinyMCE версии 5. "Спойлер" - Это компонент, используемый как правило в статьях, чтобы временно скрыть некоторый текст, но, при нажатии на заголовок которого, этот текст отображается.

## Установка
Директорий *[spoiler](spoiler)* нужно скопировать в директорий *plugins*, расположенный в корне директория *tinymce*. Далее этот плагин надо подключить в файле инициализации редактора TinyMCE *[init_tinymce.js](init_tinymce.js)* в разделе `plugins: "spoiler ..."`, добавить его на рабочую панель `toolbar: "spoiler` и добавить его в раздел меню `menu: { insert: {items: 'spoiler ...}}`. Так же в инициализаторе надо не забыть добавить опцию *"spoiler_windows"* со значением *true*.

## Использование
После установки плагина на рабочей панели должен появиться значёк перечёркнутого глаза ![img_spoiler](spoiler/img/eye-blocked.png) с подсказкой при наведении на него: "Добавить/Изменить спойллер". Если плагин правильно подключен и настроен, то аналогичная кнопка так же должна отображаться в пункте меню "Вставить". При нажати на эту кнопку появиться диалоговое окно добавления заголовка спойлера, который будет отображаться всегда, и заполнения содержимого спойлера, которое будет скрываться/отображаться. Если при нажатии кнопки был выделен какой-то текст, то он автоматически станет содержимым спойлера. Далее по нажатию кнопки "Добавить" компонент "Спойлер" появиться в тексте на месте установки курсора. При нажатии заголовка спойлера, его содержимое отобразиться, при повторном нажатии на загловок спойлера, содержимое спойлера сново будет скрыто.
При выборе компоненета спойлера в тексте кнопка установки спойлера на рабочей панели станет подсвеченой, что означает что компоент выбран. При активации кнопки в этот момент, появиться диалоговое окно редактирования спойлера с заполненым его содержимиы, Так же в диалоговом окне редактирования спойлера присутствует конпка удаления спойлера. При удалении спойлера его содержимое, если это не содержимое по умолчанию, останется на месте спойлера.
