var dbconn  = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var offset = 0;
    var count = 5;
    if(req.query&&req.query.offset)
    {
      offset = parseInt(req.query.offset,10);
    }
    if(req.query&&req.query.count)
    {
      count = parseInt(req.query.count,10);
    }
    collection
      .find()
      .skip(offset)
      .limit(count)
      .toArray(function(err,docs){
         console.log("Found hotels",docs);
      res
         .status(200)
         .json(docs);
      });
   
    /*console.log('GET the json');
    console.log(req.query);

    
    var returnData = hotelData.slice(offset,offset+count);
    res
      .status(200)
      .json(returnData);*/
  }

module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var hotelId = req.params.hotelId
    // var thisHotel = hotelData[hotelId];
    collection
      .findOne({_id:ObjectId(hotelId)},function(err,doc){
        console.log('GET hotel ID', hotelId);
    res
      .status(200)  
      .json(doc);
      });
    
  }
module.exports.hotelsAddOne = function(req,res)
{
    var db = dbconn.get();
    var collection = db.collection('hotels');
		console.log("POST new Hotel");
    var newHotel;
    if(req.body&&req.body.name&&req.body.stars)
    {
      var newHotel = req.body;
      newHotel.stars = parseInt(req.body.stars,10);
      console.log("req.body");
      collection
        .insertOne(newHotel,function(err,response){
        res
          .status(201)
          .json(response.ops);

        });


      
    }
    else
    {
      console.log("Data missing from body");
      res
        .status(400)
        .json({"message":"Required data missing from the body"});

    }
		
}