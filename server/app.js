// Establish all dependencies
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const e = require('express');
require('dotenv').config();

//Start the server
const app = express();

//Logging each request with morgan's "dev" format
// using morgan to log all incoming request 
app.use(morgan("dev"));

//Create an empty array to push the movie data into
let movieArr = [];

// Getting response from GET request at "/"
// Iterate through the movieArray to see if data maches with Omdb
// If data maches, return it using an if statement
// Else If the data doesn't match, access API directly
app.get('/', function(req, res){
    //console.log(req.url);
    //console.log(req.query.i)
    if( req.url[2] =='i'){
        for(let i=0; i < movieArr.length; i++){
            if(req.query.i == movieArr[i]['imdbID']){
                res.send(movieArr[i]);
                //console.log(req.query.i == movieArr[i]['imdbID'])
                return 
            }
        }
        axios.get('http://www.omdbapi.com'+ req.url + '&apikey=' + process.env.API_KEY)
        .then(function(response){
            //dstruct res data, by grabbing these indvi key val pairs, estab a var with our destrut iteams 
            //estab a new obj with our destr var 
            //console.log(response.data['Title'], response.data['Year'], response.data['imdbID'])
            let {Title, Year, imdbID} = response.data;
            //     //  let title = res.data["Title"];
            //     //  let year = res.data["Year"];
            //     //  let id = res.data["imdbID"];
            
            //Push API information into movieArray
            movieArr.push({Title, Year, imdbID});
            //"title":Title, "Year":Year, "imdbID":imdbID
            
            res.send({Title, Year, imdbID});
            //console.log(movieArr);
        })
        .catch((err) => {
            console.log(err)
        })
    }
//req.url give you back the  url sting
//req.query gives you back the object 
        
 else if(req.url[2] =='t'){
            //console.log(req.url[2] =='t');
            for(let i=0; i < movieArr.length; i++){
                if(req.query.t == movieArr[i]['Title'].toLowerCase()){
                   res.send(movieArr[i]);
                    console.log(movieArr[i]['Title'], req.query.t)
               return
              
            
            }
        }
        axios.get('http://www.omdbapi.com/'+ req.url + '&apikey=' + process.env.API_KEY)
        .then(function(response){
           
            let {Title, Year, imdbID} = response.data;
       
            movieArr.push({Title, Year, imdbID});
           

            res.send({Title, Year, imdbID});
            
      })
        .catch((err) => {
            console.log(err)
})
    }
})       
///console.log(req.query.i);

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter


    

module.exports = app;
// the data well be using is OMDB ( axios library)
// Have a server that can communicate with another  server