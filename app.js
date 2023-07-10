const express =  require("express");
const bodyParser = require("body-parser"); 
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/" , function(req ,res){
    
    const querry = req.body.cityName;
    // const apiKey = "92f28f7e4beb068474d5514c24e3d4e3";
    // const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid=92f28f7e4beb068474d5514c24e3d4e3&units=metric";
    
    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){   //how we hold a data from the api and pass that data specific data
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            const weatherDescription = weatherData.weather[0].description;
        
            res.write("<p>The current weather is "+ weatherDescription +"</p>");
            res.write(`<h1>The current teampreature of ${querry} is ${temp}</h1> `);
            res.write("<img src="+imgageURL+">");
            res.send();
        });
    });

})


app.listen(3000,function(){
    console.log("The server 3000 is ready ....");
})