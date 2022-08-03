const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("<h1>hello</h1>")
})

app.get("/contact", function (req, res) {
    res.send("<h1>contact meat angela@gmail.com</h1>")
})
app.get("/about", function (req, res) {
    res.send("<h1>i'm in love with laxmi</h1>")
})
app.get("/hobies", function (req, res) {
    res.send("<h1>streming</h1>")
})

app.listen(3000, function () {
    console.log("server started on port 3000");
});
