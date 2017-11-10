var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var nunjucks = require("nunjucks");
var fs = require("fs");
var path = require("path");
var models = require("./models");

var app = express();


// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure("views", { noCache: true });
// have res.render work with html files
app.set("view engine", "html");
// when res.render works with html files, have it use nunjucks to do so
app.engine("html", nunjucks.render);

app.use(express.static(path.join(__dirname, "/stylesheets")));

// make sure you are exporting your db from your models file
models.db.sync({ force: true })
    .then(function () {
        // make sure to replace the name below with your express app
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);

