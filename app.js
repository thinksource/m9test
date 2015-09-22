/**
 * Created by Sandeep on 01/06/14.
 */

// Load Our Modules

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

//connect to our database
//Ideally you will obtain DB details from a config file


//app.use(bodyParser.json());
//var router=express.Router();


var errormessage={"error":"Could not decode request: JSON parsing failed"};
var onlypostaccept={"error":"Only post method accept for this service"};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use (function (error, req, res, next){
    //Catch json error
    if (error instanceof SyntaxError) {
        console.error(error.stack);
        res.status(400).send(onlypostaccept);
      } else {
        next();
      }
});
var router=express.Router();
router.route('/')
    .get(function(req,res){
      res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify({ "error": "only accept post request" }));
      res.send(errormessage);
    })

    .post(function(req,res){
      res.setHeader('Content-Type', 'application/json');
      var headers = req.headers;
      if(headers['content-type']=="application/json"){
          //console.log(headers);
          //  console.dir(req.body.payload);
        var payload=req.body.payload;
        //console.log(payload);
        var re=[];
        for(var i=0;i<payload.length;i++){
          if(payload[i].hasOwnProperty("image")){
            if(payload[i].drm!=false && payload[i].episodeCount>0){
              var t=payload[i].image;
              re.push({"image": t.showImage,"slug":payload[i].slug,'title': payload[i].title});
            }
          }
        }
        // console.log({"response":re});
        res.send({"response":re});
      }
    });
app.use('/', router);

module.exports = app;
