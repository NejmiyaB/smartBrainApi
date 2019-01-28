const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


//connecting server to database
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
  	 password: '',
    database : 'smart-brain'
  }
});

db.select('*'). from('users').then(data =>{
	console.log(data)
});
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res)=>{
	 res.send(database.users);

})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res)})
app.post('/signin', (req , res) =>{signin.handleSignin(req, res, db, bcrypt)});

	
	
//create a transaction when we have more than two things at once
//dependency injection
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})
//when register route is hit handlerRegister will receive req and res.

app.listen(3000, () => {
	console.log('app is running on port 3000');
})