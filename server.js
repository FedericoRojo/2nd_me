const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')

//Require routes
const items = require('./routes/api/items.js');
const users = require('./routes/api/users.js')
const auth = require('./routes/api/auth.js')

//Require model
const item = require('./models/Item');
const user = require('./models/User')

//Initialice express
const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo using mongoose
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then( () => console.log('Database with mongoDB is conected') )
    .catch( (error) => console.log(error) );

//Redirect request to the route's file
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

//PRODUCTION: static assets
if( process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Ports available
const port = process.env.PORT || 5000;

//Express listen in this specific port
app.listen(port, () => console.log(`Server on port ${port}`));