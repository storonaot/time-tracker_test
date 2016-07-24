
Для запуска проекта:

  1. Клонируем репо

  - Если node.js не установлен:
    2. Устанавливаем node.js
       Устанавливаем nvm:
        `$ npm install -g nvm`

  - Если node.js установлен:
    2. Обновляем node.js через:
        `$ nvm install stable`
        `$ nvm use stable`
       Обновляем npm:
        `$ npm install npm -g`

  3. Устанавливаем gulp глобально
    `$ npm install --global gulp-cli`

  4. Устанавливаем gulp 4 локально из корневой директории проекта
    `$ npm init`
    `$ npm install gulpjs/gulp.git#4.0 --save`

  5. Устанавливаем зависимости
    `$ npm install`

  6. Запускаем проект
    `$ gulp dev`
