var http = require("http")
var express = require("express")
var url = require("url")
var fs = require("fs")

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/allure-results'));

var home = __dirname + "/boxes.html";

app.get('/', function(req, res) {
    console.log(req.url);
    res.sendFile(home);
})

var fileNameRegex = new RegExp(/\d{14}/);

app.get('/bddweb', function(req, res){
    var webDirectoryList = []
    console.log(req.url);
    const bddWebFolder =  './allure-results/bddweb'
    fs.readdirSync(bddWebFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            webDirectoryList.push(file);
                app.get('/'+file, function(req, res){ 
                 res.sendFile( __dirname + '/allure-results/bddweb/'+file+'/index.html');    
                });
        }
    });
    console.log(webDirectoryList);
    res.send(webDirectoryList);
});


app.get('/bddandroid', function(req, res){
    var androidDirectoryList = []
    console.log(req.url);
    const bddAndroidFolder =  './allure-results/bddandroid'
    fs.readdirSync(bddAndroidFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            androidDirectoryList.push(file);
                app.get('/'+file, function(req, res){ 
                 res.sendFile( __dirname + '/allure-results/bddandroid/'+file+'/index.html');    
                });
        }
    });
    console.log(androidDirectoryList);
    res.send(androidDirectoryList);
});


app.get('/bddios', function(req, res){
    var iosDirectoryList = []
    console.log(req.url);
    const bddIosFolder =  './allure-results/bddios'
    fs.readdirSync(bddIosFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            iosDirectoryList.push(file);
                app.get('/'+file, function(req, res){ 
                 res.sendFile( __dirname + '/allure-results/bddios/'+file+'/index.html');    
                });
        }
    });
    console.log(iosDirectoryList);
    res.send(iosDirectoryList);
});

app.get('/karate', function(req, res){
    var karateDirectoryList = []
    console.log(req.url);
    const karateFolder =  './allure-results/karate'
    fs.readdirSync(karateFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            karateDirectoryList.push(file);
                app.get('/'+file, function(req, res){ 
                 res.sendFile( __dirname + '/allure-results/karate/'+file+'/index.html');    
                });
        }
    });
    console.log(karateDirectoryList);
    res.send(karateDirectoryList);
});


app.listen(80, function(){
    console.log('Server running at http://127.0.0.1:80/');
});

