const User = require('../model/User');
const bcrypt = require('bcrypt');

const auth = async (req, res) =>{
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
        return res.status(401).json({ error: 'Invalid username!' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
        return res.status(200).json({ message: 'Authentication successful' });
        } else {
        return res.status(401).json({ error: 'Invalid password!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {auth};