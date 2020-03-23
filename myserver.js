var http = require("http")
var express = require("express")
var url = require("url")
var fs = require("fs")

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/allure-results'));

app.get('/', function(req, res) {
    console.log(req.url);
    res.sendFile( __dirname + "/boxes.html");
})

var directoryList = []
var directoryInnerList = []

const testFolder =  './allure-results/'
fs.readdirSync(testFolder).forEach(file => {
    if (file != '.DS_Store') {
        directoryList.push(file);
            app.get('/'+file, function(req, res){ 
                console.log(req.url);
             res.sendFile( __dirname + '/allure-results/'+file+'/index.html');    
            });
    }
});

console.log(directoryList);


app.get('/folderList', function(req, res){
    console.log(req.url);
    res.send(directoryList);
});



app.listen(80, function(){
    console.log('Server running at http://127.0.0.1:80/');
});

