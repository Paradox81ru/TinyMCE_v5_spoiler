# TinyMCE_v5_spoiler

## Description
***[spoiler.js](spoiler/plugin.js)*** - the "Spoiler" plugin for the text WEB editor TinyMCE version 5. "Spoiler" is a component that is usually used in articles to temporarily hide some text, but when you click on the spoiler title, this text is displayed.

## Installation
Directories *[spoiler](spoiler)* you need to copy to the *plugins* directory located at the root of the *tinymce* directory. Next, this plugin must be connected in the initialization file of the editor TinyMCE *[init_tinymce.js](init_tinymce.js)* in the section `plugins: "spoiler ..."`, add it to the toolbar `toolbar: "spoiler` and add it to the menu section `menu: { insert: {items: 'spoiler ...}}`. Also, in the initializer, do not forget to add the option *"spoiler_windows"* with the value *true*.

## Using
After installing the plugin, the crossed-out eye icon should appear on the working panel ![img_spoiler](spoiler/img/eye-blocked.png) with a hint when hovering over it: "Add/Change spoiler". If the plugin is correctly installed and configured, then a similar button should also be displayed in the "Insert" menu item.". When you click on this button, a dialog box will appear for adding a spoiler title, which will always be displayed, and filling in the spoiler content, which will be hidden/displayed. If some text was highlighted when the button was pressed, it will automatically become the spoiler content. Then, by clicking the "Add" button, the "Spoiler" component will appear in the text at the cursor location. When you click on the spoiler title, its contents will be displayed, when you click on the spoiler title again, the spoiler content will be hidden again.
When you select the spoilers component in the text, the spoiler installation button on the toolbar will become highlighted, which means that the component is selected. When the button is activated at this moment, a spoiler editing dialog box will appear with its contents filled in. There is also a spoiler removal button in the spoiler editing dialog box. When a spoiler is removed, its content, if it is not the default content, will remain in the spoiler's place..

You can learn more in detail and visually about the creation and operation of the "Spoiler" plugin for the TinyMCE version 5 text WEB editor, its installation and use on my website "[Парадокс-Портал/Создание плагина "Спойлер" для текстового WEB редактора TinyMCE v5](http://www.paradox-portal.ru/blog/article/7-sozdanie_plagina_spojler_dlya_tekstovogo_web_redaktora_tinymce_v5)"
