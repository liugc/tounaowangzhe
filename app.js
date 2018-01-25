var request = require("request");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.post("/brain", function(req, res) {
    var question = req.body.data.quiz;
    var options = req.body.data.options;
    request.get("http://www.baidu.com/s?wd=" + encodeURI(question), function(err, res, body) {
        if (err) throw err;
        var obj = {};
        var max = 0;
        options.forEach(function(option) {
            var j = body.match(new RegExp(option, "g"));
            if (j && j.length) {
                obj[option] = j.length;
                if (j.length > max) {
                    max = j.length;
                }
            } else {
                obj[option] = 0;
            }
        });
        console.log(question);
        console.log(options);
        var answers = ['A', 'B', 'C', 'D'];
        for (var k in obj) {
            if (obj[k] == max) {
                for (var i=0; i<options.length; i++) {
                    if (options[i] == k) {
                        console.log("建议选择： " + answers[i] + '、' + k + "\n");
                    }
                }
            }
        }
    });
    res.send("ok");
});

app.listen(3999);