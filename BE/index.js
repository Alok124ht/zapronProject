const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected ✅✅"))
.catch ( err => console.log(err) )

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port" + (process.env.PORT || 3000))
});


const User = require('./models/user');

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send('Username already exists');

  const user = new User({
    username,
    password
  });

  try {
    await user.save();
    res.send('Registration successful');
  } catch (err) {
    res.status(400).send(err);
  }
});


//Create the login endpoint: In the server.js file, create the login endpoint using the following code:
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Username or password is incorrect');

    if (user.password !== password) {
      return res.status(400).send('Username or password is incorrect');
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET= "mysecretkey");
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


//This code checks the user credentials and generates a JWT token if the login is successful. T
//the token is then sent back to the client in the header of the response.

//   Create the protected route: In the server.js file, create a protected route using the following code:
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

app.get('/api/welcome', verifyToken, (req, res) => {
  res.send(`Welcome, ${req.user._id}`);
});
//This code uses a middleware function called verifyToken to protect the welcome route. The middleware function checks for a valid 
//token in the header of the request and verifies it using the jsonwebtoken library. If the token is valid, the user ID is extracted 
//from the token and passed to the next() function. 
//Otherwise, an error message is sent back to the client.