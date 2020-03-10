# cp-api-avtocod
### Пакет, который реализует методы, для работы с API.avtocod 

Вызывать методы можно через асинхронную функцию `async/await` или `Promise` 

#### Для работы необходимо в файл с расширением .env прописать домен, почту, апи-кей от омнидекса

Пример файла .env 
```js
AVTOCOD_USER_URL='testname.avtocod.ru'
AVTOCOD_USER_EMAIL='testname@b2bfamily.com'
AVTOCOD_API_KEY='1626d7f12f7ea7ccb6a3d3bf2'
```

#### Методы реализуемые данной библиотекой:
```js
    QueryVinTest(): Promise<any>;
    GetReportTest(): Promise<any>;
```
 Методы тестовые, тип возвращаемых данных еще не типизировал, это в будущем - в проде

#### Пример вызова библиотеки из любого вашего проекта
```js
const apiAvtocod = new Avtocod();

(() => {
    const result = apiAvtocod.QueryVinTest();
    result.then((res) => {
        log('QueryVinTest = ', res);
    });
})();

(() => {
    const result = apiAvtocod.GetReportTest();
    result.then((res) => {
        log('GetReportTest = ', res);
    });
})();

(() => {
    const result = apiAvtocod.connectVin01('н490оу11');
    result.then((res) => {
        log('connectVin01 = ', res);
    });
})();
// Вызывать через async/await
// просто так вызвать в консоль метод не получится, я поднимал сервер и вызывал функцией async/await
```
#### Пример вызова файла и полученный результат
```js
$ ts-node src/index.ts

QueryVinTest =  { state: 'ok',
  size: 1,
  stamp: '2020-01-14T17:37:53.475Z',
  data:
   [ { uid: 'report_2_1579023473475',
       isnew: false,
       suggest_get: '2020-01-14T17:37:53.475Z' } ] }
       
GetReportTest =  { state: 'ok',
  size: 1,
  stamp: '2020-01-14T17:37:53.478Z',
  data:
   [ { domain_uid: 'test',
       report_type_uid: 'test-report-type@test',
       vehicle_id: 'Z94CB41AAGR323020',
       query: [Object],
       progress_ok: 9,
       progress_wait: 0,
       progress_error: 1,
       uid: 'report_2',
       name: 'Тестовый отчет №report_2',
       comment: 'Отчет для тестирования подключения сторонних систем',
       created_at: '2020-01-14T17:37:38.478Z',
       updated_at: '2020-01-14T17:37:53.478Z' } ] }

connectVin01 =  { errMsg: null, vinNumber: 'JT171SC1000138330' }
```