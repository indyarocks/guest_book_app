var http = require("http");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 3000));

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.render("index");
});

app.get('/new-entry', function(req, res){
	res.render("new-entry")
});

app.post('/new-entry', function(req, res){
	if(!req.body.title || !req.body.content){
		res.status(400).send("Title and content must be present!")
		return;
	}
	entries.push({
		"title": req.body.title,
		"content": req.body.content,
		"published_at": new Date()
	});
	res.redirect("/");
});

app.use(function(req, res){
	res.status(404)
	res.render("404");
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Started server on port: 3000");
})