const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
var path = require('path')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));  /*  absolute path  */
// app.use(express.static('public')); /*  relative path  */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.post('/', function (req, res) {
    const firstName = req.body.Firstname;
    const lastName = req.body.Lastname;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    var url = "https://us10.api.mailchimp.com/3.0/lists/1359304bce";

    var options = {
        method: "POST",
        auth: "praveenvishnu1:f011885476b4004a4430c77eebb2b173-us10"
    }
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            // console.log(JSON.parse(data));
            if(response.statusCode == 200){
                res.send("success")
            }
            else{
                res.send("PLEASE CHECK AGAIN")
            }
        })
    });
    request.write(jsonData);
    request.end();
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})


/* API 
f011885476b4004a4430c77eebb2b173-us10
1359304bce
*/