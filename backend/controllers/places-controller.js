const uuid = require('uuid/v4');
const {validationResult}= require('express-validator');
const HttpError = require ('../models/http-error');
const Place = require ('../models/place');



let DUMMY_PLACES = [
{  id: 'p1',
  title: 'Empire State ',
  description: 'One of the famous sky crappers',
  location: {
    lat: 40.7484474,
    lng: -73.9871516
  },
  address: '20 W 34th St, New York, NY 10001',
  creator: 'u1'
}
];

//FOR PLACES
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p=>{
    return p.id === placeId;
  });

  if( !place ){
    throw new HttpError ('Could not find the place for the provide ID',404);
  }
  res.json({place}); // => {place } => {place: place}
};


// functiion getById() {...}
// const getPlaceById = functiion( ){...}

//FOR USERS
const getPlacesByUserId = (req, res, next)=> {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p=> {
    return p.creator === userId;
  });

  if(!places || places.length === 0  ){
    return next(new HttpError ('Could not find the place for the provide user ID',404));
  }

  res.json({places});
};

//post


const createPlace = async (req, res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {

    console.log(errors);
    throw new HttpError('Invalid input passed please check your data ', 422);
  }
  const {title,description, address, coordinates, creator } = req.body;
  //const tite = req.body.title;

  const createdPlace = new Place ({
    title,
    description,
    address,
    location: coordinates,
    image: 'https://images.unsplash.com/photo-1631804422635-eff93216d80c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
    creator
  });

try{
  await createdPlace.save();
}
catch (err){
  const error = new HttpError
    ('Creating place failed, please try again', 500);
  return next(error);
}
  DUMMY_PLACES.push(createdPlace); //unshift (createdPlace )
//inResponse giving this status code that data is recieved
  res.status(201).json({place: createdPlace});
};


//PATCH functiion

const updatePlace =(req, res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {

    console.log(errors);
    throw new HttpError('Invalid input passed please check your data ', 422);
  }

    const {title,description} = req.body;
    const placeId = req.params.pid; //use pid

    const updatePlace = {...DUMMY_PLACES.find (p=>p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p=> p.Id === placeId);
    updatePlace.title = title;
    updatePlace.description = description;

//NOW WE UPDATING THE PLACES
    DUMMY_PLACES[placeIndex] = updatePlace;
    // and showing ht e response code 200
    res.status(200).json({message: updatePlace});
};

//DELETE FUNCTION
const deletePlace =(req, res,next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.Id !== placeId );
  res.status(200).json({message:'PLACE DELETED' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
