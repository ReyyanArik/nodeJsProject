var http = require("http")
var express = require("express")
var url = require("url")
var fs = require("fs")

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/allure-results'));
app.use(express.static(__dirname + '/allure-results/bddweb'));
app.use(express.static(__dirname + '/allure-results/bddandroid'));
app.use(express.static(__dirname + '/allure-results/bddios'));
app.use(express.static(__dirname + '/allure-results/karate'));

var home = __dirname + "/boxes.html";
var tosProjects = ["bddweb","bddandroid","bddios","karate"];
var fileNameRegex = new RegExp(/\d{14}/);

app.get('/', function(req, res) {
    console.log(req.url);
    res.sendFile(home);
})

tosProjects.forEach(tosProject =>{
    app.get('/'+tosProject, function(req, res){
        getTosReportByFolderName('bddweb',req,res);
    });
});


app.listen(80, function(){
    console.log('Server running at http://127.0.0.1:80/');
});


function getTosReportByFolderName(tosFile,req,res){
    var directoryList = []
    console.log(req.url);
    const tosInnerFolder =  './allure-results/'+ tosFile
    fs.readdirSync(tosInnerFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            directoryList.push(file);
                app.get('/'+file, function(req, res){ 
                 res.sendFile( __dirname + '/allure-results/bddweb/'+file+'/index.html');    
                });
        }
    });
    console.log(directoryList);
    res.send(directoryList);
}
