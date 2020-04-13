var http = require("http")
var express = require("express")
var url = require("url")
var fs = require("fs")

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/allure-results'));

var home = __dirname + "/boxes.html";
var tosProjects = ["bddweb","android","ios","karateapi"];
var fileNameRegex = new RegExp(/\d{14}/);
var allureFolder = '/allure-results/';

app.get('/', function(req, res) {
    console.log(req.url);
    res.sendFile(home);
})

tosProjects.forEach(tosProject =>{
    app.use(express.static(__dirname + allureFolder + tosProject));
    app.get('/'+tosProject, function(req, res){
        getTosReportByFolderName(tosProject,req,res);
    });
});

app.listen(80, function(){
    console.log('Server running at http://127.0.0.1:80/');
});

function getTosReportByFolderName(tosFile,req,res){
    var directoryList = []
    console.log(req.url);
    const tosInnerFolder =  '.' + allureFolder + tosFile
    fs.readdirSync(tosInnerFolder).forEach(file => {
        if (fileNameRegex.test(file)) {
            directoryList.push(file);
                app.get('/'+file, function(req, res){ 
                    res.sendFile( __dirname + allureFolder + tosfile +'/' + file + '/index.html');    
                });
        }
    });
    console.log(directoryList);
    res.send(directoryList);
}
