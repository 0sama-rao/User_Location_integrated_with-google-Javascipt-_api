const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); // => api/places...

app.use((req,res,next)=> {
  const error = new HttpError('Could not find this route', 404 );
  throw error;
});

app.use((error,req, res, next)=> {
  if (res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || ' An unknown error occured' });
});

mongoose.connect('mongodb+srv://ozzyLOC:account786@cluster0.p17ay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(()=> {
  app.listen(5000);
})
  .catch(err => {
  console.log(err);
});
