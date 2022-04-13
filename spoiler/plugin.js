'use strict';

tinymce.PluginManager.add('spoiler', function (editor, url) {
    const HEADER_DEFAULT = 'Заголовок спойлера';
    const BODY_DEFAULT = 'Содержимое спойлера.';
    const MENU_NAME = editor.settings.spoiler_windows ? 'Добавить/Изменить спойлер' : 'Добавить/Удалить спойлер';
    editor.contentCSS.push(url + '/css/spoiler.min.css');

    // editor.contentCSS.push('static/components/widgets/css/spoiler.min.css');
    editor.ui.registry.addIcon('spoiler', '<svg width="24" height="24"><use xlink:href="' + url + '/img/spoiler_icons.svg#addspoiler"></use></svg>');

    // Начальные опции диалогового окна.
    var beginWindowOptions = {
        size: 'large',
        body: {
            type: 'panel',
            items: [
                {type: 'input', name: 'title', inputMode: 'text', label: 'Title'},
                {type: 'textarea', flex: true, name: 'body', label: 'Body', minHeight: 500, maximized: true}
            ]
        },
        buttons: [
            {
                text: 'Close',
                type: 'cancel',
                onclick: 'close'
            },
        ],
    };

    /**
     * Опции для диалогового окна добавления спойлера
     * @returns {object}
     */
    function windowOptionsAddSpoiler() {
        // Для начала нужно создать копию опций диалогового окна,
        var windowOptions = JSON.parse(JSON.stringify(beginWindowOptions));
        windowOptions.title = 'Добавить спойлер';
        // Если спойлер не редактируется, значит он создается.
        // Надо добавить кнопку добавления спойлера,
        windowOptions.buttons.push({
            text: 'Add',
            type: 'submit',
            primary: true,
            enabled: false
        });
        // а так же обработчик на добавление спойлера.
        windowOptions.onSubmit = onSubmitAddSpoiler;
        return windowOptions;
    }

    /**
     * Опции для диалогового окна редактирования спойлера
     * @param spoiler
     * @returns {object}
     */
    function windowOptionsEditSpoiler(spoiler) {
        // Для начала нужно создать копию опций диалогового окна.
        var windowOptions = JSON.parse(JSON.stringify(beginWindowOptions));
        windowOptions.title = 'Редактировать спойлер';
        // Далее надо добавить кнопку изменения спойлера,
        windowOptions.buttons.push({
            text: 'Change',
            type: 'submit',
            primary: true,
            enabled: false
        });
        // и удаления.
        windowOptions.buttons.push({
            text: 'Delete',
            type: 'custom',
            primary: true,
        });
        // Так же надо добавить обработчик события для кнопки изменения спойлера.
        windowOptions.onSubmit = onSubmitEditSpoiler;
        // и кнопки удаления спойлера
        windowOptions.onAction = function (api) {
            if (confirm("Вы действительно хотите удалить спойлер?")) {
                removeSpoiler(spoiler);
                api.close();
            }
        };
        return windowOptions;
    }

    /**
     * Функция сабмита формы добавления нового спойлера
     * @param api
     */
    function onSubmitAddSpoiler(api) {
        var data = api.getData();
        // var body = data.body.replace(/\n/g, "<br>");
        // var body = normarizeContent(data.body);
        var body = data.body;
        var txt = '<div class="spoiler" contenteditable="false">' +
            '<div class="spoiler_head" title="Отобразить спойлер">' + data.title + '</div>' +
            '<div class="spoiler_body" contenteditable="true">' + body + '</div>' +
            '</div>';
        editor.undoManager.transact(function () {
            editor.insertContent(txt);
        });
        api.close();
    }

    /**
     * Функция сабмита формы изменения отредактированного спойлера
     * @param api
     */
    function onSubmitEditSpoiler(api) {
        var data = api.getData();
        // var body = data.body.replace(/\n/g, "<br>");
        // var body = normarizeContent(data.body);
        var body = data.body;
        // Для создания нового спойлера надо вначале создать div-блок,
        var newSpoiler = document.createElement('div');
        // и добавить ему класс "spoiler".
        newSpoiler.className = "spoiler";
        newSpoiler.setAttribute("contenteditable", "false");
        // Далее добавим внутрь этого блока заголовок и содержимое спойлера.
        newSpoiler.innerHTML = '<div class="spoiler_head" title="Отобразить спойлер">' + data.title + '</div>' +
            '<div class="spoiler_body" contenteditable="true">' + body + '</div>';
        // Теперь получим существующий спойлер,
        var oldSpoiler = getSpoiler();
        editor.undoManager.transact(function () {
            // и заменим его на новый, только что созданный, спойлер.
            oldSpoiler.parentNode.replaceChild(newSpoiler, oldSpoiler);
        });
        api.close();
    }

    /**
     * Открывает окно для создания спойлера, и добавляет спойлер в редактор.
     * @param bodyContent {Text}
     * @param titleContent {Text}
     * @param isEdit {bool}
     * @param spoiler {HTMLElement}
     */
    function openWindow(bodyContent, titleContent, isEdit, spoiler) {
        titleContent = titleContent || HEADER_DEFAULT;
        isEdit = isEdit || false;
        // В зависимости от того, создается ли спойлер или редактируется, возьмем нужные опции,
        var windowOptions = isEdit ? windowOptionsEditSpoiler(spoiler) : windowOptionsAddSpoiler();
        // и добавим в эти опции начальные значения заголовка и содержимого спойлера.
        windowOptions.initialData = {title: titleContent, body: bodyContent};

        // Откроем диалог создания или редактирования нового спойлера.
        editor.windowManager.open(windowOptions);
    }

    /**
     * Добавляет спойлер.
     */
    function addSpoiler() {
        // Возьмеме выделенный узел,
        var selectionNode = editor.selection.getNode();
        // и проверим, если этим узлом оказался корневой элемент редактора,
        if (editor.dom.hasClass(selectionNode, 'mce-content-body')) {
            // тогда надо показать сообщение об ошибке,
            alert('С такой выделенной областью спойлер создать нельзя.');
            // и закончить работу.
            return;
        }

        // Возьмем выделенное содержимое курсора.
        var bodyContent = editor.selection.getContent();
        // Если это содержимое есть, то оно должно стать содержимым спойлера.
        if (!bodyContent) {
            // Иначе в качестве содержимого установим текст по умолчанию.
            bodyContent = BODY_DEFAULT;
        }
        // Если в настройках редактора стоит, что спойлер должен открываться окном,
        if (editor.settings.spoiler_windows) {
            // то откроем окно.
            openWindow(bodyContent);
        } else {
            // Иначе сразу же создадим спойлер,
            var txt = '<div class="spoiler">' +
                '<div class="spoiler_head" title="Отобразить спойлер">' + HEADER_DEFAULT + '</div>' +
                '<div class="spoiler_body">' + bodyContent + '</div>' +
                '</div>';
            editor.undoManager.transact(function () {
                // и добавим его в редактор.
                editor.insertContent(txt);
            });
        }
    }

    /**
     * Открывает окно редактирования спойлера
     * @param spoiler элемент спойлер
     */
    function editSpoiler(spoiler) {
        // Из спойлера возьмем заголовок
        var title = spoiler.getElementsByClassName('spoiler_head')[0].textContent;
        // и содержимое спойлера,
        var body = spoiler.getElementsByClassName('spoiler_body')[0].innerHTML;
        // и передадим это в окно, вместе с флагом, что это окно для редакитрования спойлера.
        openWindow(body, title, true, spoiler);
    }

    /**
     * Удаляет спойлер
     */
    function removeSpoiler(spoiler) {
        // Проверим, если спойлер был найден,
        if (spoiler) {
            // то найдем содержимое спойлера.
            var spoilerBody = spoiler.getElementsByClassName('spoiler_body')[0].innerHTML;

            // Если содержимое спойлер составляет содержимое по умолчанию,
            if (spoilerBody === BODY_DEFAULT) {
                // то спойлер можно полностью удалить, вместе с его содержимым.
                spoiler.remove();
            } else {
                // Иначе вместо спойлера оставим только его содержимое. Для этого создадим новый параграф,
                var newPara = document.createElement('p');
                // и добавим в него содержимое спойлера.
                newPara.innerHTML = spoilerBody;
                editor.undoManager.transact(function () {
                    // Далее, заменим спойлер на созданный нами ранее блок с содержимым спойлера.
                    spoiler.parentNode.replaceChild(newPara, spoiler);
                });
            }

        }
    }

    /**
     * Возвращает верхний DOM спойлера, или null
     * @returns {*}
     */
    function getSpoiler() {
        var spoiler = null;
        // Найдем узел, на котором стоит курсор,
        var node = editor.selection.getNode();
        // и проверим, если это сам спойлер
        if (editor.dom.hasClass(node, "spoiler")) {
            // то его и возьмем.
            spoiler = node;
        } else {
            // Иначе найдем самый верхний узел спойлера, и возьмем его.
            spoiler = editor.dom.getParent(node, ".spoiler");
        }
        // Если спойлер был найден, то он и вернется. Иначе вернется undefined или null.
        return spoiler;
    }

    /**
     * Главная функция плагина
     * @param api
     */
    function main(api) {
        // Найдем спойлер.
        var spoiler = getSpoiler();
        // Если найден выбранный спойлер,
        if (spoiler) {
            if (editor.settings.spoiler_windows) {
                editSpoiler(spoiler);
            } else {
                // то надо удалить его.
                removeSpoiler(spoiler);
            }
        } else {
            // Иначе надо добавить новый спойлер.
            addSpoiler();
        }
    }

    /**
     * Переключатель активности кнопки
     * @param api
     * @returns {function(): *}
     */
    function toggleActiveState(api) {
        var nodeChangeHandler = function (eventApi) {
            api.setActive(getSpoiler());
        };

        /* onSetup should always return the unbind handlers */
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
            return editor.off('NodeChange', nodeChangeHandler);
        };
    }


    // Добавляет в редактор кнопку, кторая позволит создать или удалить спойлер.
    editor.ui.registry.addToggleButton('spoiler', {
        // text: 'Спойлер',
        tooltip: MENU_NAME,
        icon: 'spoiler',
        onAction: main,
        onSetup: toggleActiveState
    });
    editor.ui.registry.addMenuItem('spoiler', {
        icon: 'spoiler',
        text: MENU_NAME,
        context: 'insert',
        onAction: main
    });

    return {
        getMetadata: function () {
            return {
                name: "Spoiler",
                url: "http://www.paradox-portal.ru/blog/article/7-sozdanie_plagina_spojler_dlya_tekstovogo_web_redaktora_tinymce_v5"
            };
        }
    };
});