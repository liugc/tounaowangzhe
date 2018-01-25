1. 连接fiddler代理，编辑FiddlerScript，在 `OnBeforeResponse` 函数里添加代码把数据转发到其他地方
```
if (oSession.fullUrl.Contains("question.hortor.net/question/bat/findQuiz"))
    {
        var _xhr = new ActiveXObject('Microsoft.XMLHTTP');
        var url = 'http://localhost:3999/brain';

        _xhr.onreadystatechange = function() {}
        _xhr.open('POST', url, true);
        _xhr.setRequestHeader("Content-Type", "application/json");
        _xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        _xhr.send(oSession.GetResponseBodyAsString());
    }
```

2. `npm i` 安装依赖

3. 运行 `npm run start` 或 `node app.js`