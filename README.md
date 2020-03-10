# avtoinfo
### Пакет, который реализует метод, парсер/поиск информации по машине по ее ГРЗ
### для примера был создан npm пакет из данного проекта  

#### Пример вызова библиотеки из любого вашего проекта
```js
const apiAvtoinfo = new Avtoinfo();

(() => {
    const result = apiAvtoinfo.connectVin01('н490оу11');
    result.then((res) => {
        log('connectVin01 = ', res);
    });
})();
// Вызывать через async/await
```
#### Пример вызова файла и полученный результат
```js
$ ts-node src/index.ts

connectVin01 =  { errMsg: null, vinNumber: 'JT171SC1000138330' }
```