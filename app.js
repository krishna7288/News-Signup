const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express(); 
app.use(express.static("public"));
app.use(bodyparser.urlencoded({urlencoded: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    var fName = req.body.FirstName;
    var lName = req.body.LastName;
    var email = req.body.Email;
    var data = {
        members: [{
            email_address : email,
            status : "subscribed",
            merge_fields: {
                FNAME : fName,
                LNAME : lName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us21.api.mailchimp.com/3.0/lists/1b4c29b01a';
    const options = {
        method : "post",
        auth : "krishna:c85c38d7b7794bd060962a03a41c8e9a-us21"
    };

    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

       response.on("data", function(data){
        console.log(JSON.parse(data));
  
       });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});







// API Key

// c85c38d7b7794bd060962a03a41c8e9a-us21

// list Id

// 1b4c29b01a