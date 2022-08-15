//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render('list', {
        listTitle: date.getDate(),
        newListItem: items
    });
});

app.post("/", (req, res) => {
    var item = req.body.newItem;
    if (item) {
        if (req.body.list == 'Work') {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(item);
            res.redirect("/");
        }
    }
})


app.get("/work", function (req, res) {+


    res.render('list', {
        listTitle: "Work List",
        newListItem: workItems
    });
});

app.get("/about", function (req, res) {
    res.render('about');
})

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});