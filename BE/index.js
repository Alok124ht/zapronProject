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

mongoose.connect("mongodb+srv://Anish_Tiwari1531:SINGH1531@cluster0.40jpapr.mongodb.net/Group6Database", {
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: hashedPassword
  });

  try {
    await user.save();
    res.send('Registration successful');
  } catch (err) {
    res.status(400).send(err);
  }
});

//Create the login endpoint: In the server.js file, create the login endpoint using the following code: