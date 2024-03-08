const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const name = req.body.fName;
    const surname = req.body.lName;
    const email = req.body.emailAdd;

    const apiKey = "6b1bd77a07fad946c527cf3624dc7079-us14";

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                    LNAME: surname
                }
            }
        ]
    };

    app.post("/failure", function(req, res){
        res.redirect("/");
    });

    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/8ae2489f98";
    const options = {
        method: "POST",
        auth: "janardan1:"+ apiKey
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            res.sendFile(__dirname+ "/success.html");
        } else {
            res.sendFile(__dirname+ "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

    // res.send(name +" "+ surname +", your signup has been sucessful!");

    console.log(name, surname, email);
    console.log("post request received");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});

// List Id
// 8ae2489f98 