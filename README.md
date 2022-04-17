# TinyMCE_v5_spoiler

## Description
***[spoiler.js](spoiler/plugin.js)*** - the "Spoiler" plugin for the text WEB editor TinyMCE version 5. "Spoiler" is a component that is usually used in articles to temporarily hide some text, but when you click on the spoiler title, this text is displayed.

## Installation
Directories *[spoiler](spoiler)* you need to copy to the *plugins* directory located at the root of the *tinymce* directory. Next, this plugin must be connected in the initialization file of the editor TinyMCE *[init_tinymce.js](init_tinymce.js)* in the section `plugins: "spoiler ..."`, add it to the toolbar `toolbar: "spoiler` and add it to the menu section `menu: { insert: {items: 'spoiler ...}}`. Also, in the initializer, do not forget to add the option *"spoiler_windows"* with the value *true*.

## Использование
После установки плагина на рабочей панели должен появиться значёк перечёркнутого глаза ![img_spoiler](spoiler/img/eye-blocked.png) с подсказкой при наведении на него: "Добавить/Изменить спойллер". Если плагин правильно подключен и настроен, то аналогичная кнопка так же должна отображаться в пункте меню "Вставить". При нажатии на эту кнопку появиться диалоговое окно добавления заголовка спойлера, который будет отображаться всегда, и заполнения содержимого спойлера, которое будет скрываться/отображаться. Если при нажатии кнопки был выделен какой-то текст, то он автоматически станет содержимым спойлера. Далее по нажатию кнопки "Добавить" компонент "Спойлер" появиться в тексте на месте установки курсора. При нажатии заголовка спойлера, его содержимое отобразиться, при повторном нажатии на заголовок спойлера, содержимое спойлера снова будет скрыто.
При выборе компонента спойлера в тексте кнопка установки спойлера на рабочей панели станет подсвеченной, что означает что компонент выбран. При активации кнопки в этот момент, появиться диалоговое окно редактирования спойлера с заполненным его содержимым. Так же в диалоговом окне редактирования спойлера присутствует кнопка удаления спойлера. При удалении спойлера его содержимое, если это не содержимое по умолчанию, останется на месте спойлера.

Более подробно и наглядно узнать о создании и работе плагина "Спойлер" для текстового WEB редактора TinyMCE версии 5, его установке и использовании, можно на моём сайте "[Парадокс-Портал/Создание плагина "Спойлер" для текстового WEB редактора TinyMCE v5](http://www.paradox-portal.ru/blog/article/7-sozdanie_plagina_spojler_dlya_tekstovogo_web_redaktora_tinymce_v5)"
