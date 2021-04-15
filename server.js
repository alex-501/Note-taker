 //express js server
 //define constants
 //routes
 const path = require('path');
const express = require('express');

//port on server_>changed from 3001
const PORT = process.env.PORT || 3002;

// assaign express to app variable to begin
const app = express();
//require 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//handles middleware function
//middleware connects the two endpoints, like a door
//excecuted for http or api requests
//specifies middle ware as callback function
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//used to connect then listen to port, 3002 in this case
// formula/syntax is - app.listen ([port[,host[, backlog]]][, callback])
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});