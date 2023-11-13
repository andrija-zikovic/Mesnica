const User = require('../model/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const auth = async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username!' });
        }

        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

        if (isPasswordMatch) {

          const accessToken = JWT.sign(
              { "username": foundUser.username },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1h' }
          );
          const refreshToken = JWT.sign(
              { "username": foundUser.username },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '1d' }
          );

          foundUser.refreshToken = refreshToken;
          const result = await foundUser.save();

          res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); /* secure: true, */
          res.json({ accessToken });
        } else {
          return res.status(401).json({ error: 'Invalid password!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/* const userCreate = async (req, res) => {
    const { username, password } = req.body;

  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with hashed password
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message or user data
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error occurred while creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; */

module.exports = {auth};