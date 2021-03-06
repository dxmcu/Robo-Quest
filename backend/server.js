const express = require('express')
const app = express()
const port = 3000
//Necessary to load html files
const path = require('path')
//Needed for interpreting post requests
const bodyParser = require('body-parser')
//Needed for Cross Origin Resource Sharing(CORS)
const cors = require('cors');
//Needed to connect to the mongo db
const mongoose = require('mongoose');

//Connection string to mongodb
var mongoDB = 'mongodb+srv://Admin:12345@robotdb-8hzqj.mongodb.net/test?retryWrites=true&w=majority';
//Connect to database
mongoose.connect(mongoDB, {useNewUrlParser:true});

//Needed for body parssing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Get reference to schema
const Schema = mongoose.Schema;
//Create new schema for robots
const robotSchema = new Schema({
    name:String,
    job:String,
    team:String,
    health:Number,
    magic:Number,
    attack:Number,
    defense:Number,
    speed:Number,
    intelligence:Number
})

//Create model for the database
const RobotModel = mongoose.model("RobotInfo", robotSchema);

//Use Cross reference Origin system
app.use(cors());

//Helps to avoid CORS errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Connects the server to the angular app
app.use("/", express.static(path.join(__dirname, "angular")));

//Send the file to the index
app.get('/',function(req, res){res.sendFile(path.join(__dirname, "angular", "index.html"));});

//Get the list of robots from the mongo database
app.get('/robots',(req, res, next) =>{
    //Store the robots in a variable for easy access
    const robots = 
    //Retrieve the data from the RobotsModel
    RobotModel.find((err,data) =>{
        //Retrieve data as json data
        res.json({robots:data});
    })
})

//Used to get a robot by id
app.get('/robots/:id', (req, res, next) => {
    //Find a robot in the database by their id
    RobotModel.findById(req.params.id, function (err, data) {
        //Return the data as json
        res.json(data);
    });
})

//Used to get robots based on their job
app.get('/robots/search/:job', (req,res) =>{
    //Look for robots with the job
    RobotModel.find({'job': req.params.job}, function (err, data) {
        //Return the data as json
        res.json(data);
    });
})

//Add new robot data to the database
app.post('/robots', (req, res) =>{
    //Create a robot using the information posted
    RobotModel.create({
        name: req.body.name,
        job: req.body.job,
        team: req.body.team,
        health: req.body.health,
        magic: req.body.magic,
        attack: req.body.attack,
        defense: req.body.defense,
        speed: req.body.speed,
        intelligence: req.body.intelligence
    });

    res.json("Data Uploaded");
})

//Remove a robot from the database
app.delete('/robots/:id', (req,res) =>{
    //Delete the movie from the database
    RobotModel.deleteOne({_id:req.params.id},(error,data) => {
        //Check for error
        if(error){
            //Show the error
            res.json(error);
        }
        res.json(data);
    })
})

//Used to update a robot in the database
app.put('/robots/:id', function (req, res) {
    //Find the robot in the database and update the information
    RobotModel.findByIdAndUpdate(req.params.id, req.body, {new: true},
    function(err, data){
        res.send(data);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))