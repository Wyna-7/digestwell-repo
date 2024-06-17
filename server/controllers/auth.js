const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createSession, verifySession } = require('../session_utils');

async function login (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).send(JSON.stringify('User not found'));
    
    if (!email || !password) return res.status(400).send(JSON.stringify('Missing credentials'));
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).send(JSON.stringify('Invalid password'));
    
    const token = createSession(user.id);
    res.cookie('sessionId', token, {
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(200).send(JSON.stringify('Logged in successfully'));
  }
  catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify('An error occurred while logging in'));
  }
};

async function auth (req, res) {
  try {
    const token = req.cookies.sessionId;
    if (!token) return res.status(401).send(JSON.stringify('Unauthorized'));
    
    const sessionData = verifySession(token);

    if (!sessionData) return res.status(401).send(JSON.stringify('Unauthorized'));

    const user = await User.findByPk(sessionData.userId);
    
    if (!user) return res.status(401).send(JSON.stringify('Unauthorized'));
    
    res.status(200).send(JSON.stringify('Authorized'));
  }
  catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify('An error occurred while authenticating'));
  }
}

async function register (req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
    res.status(201).send('Registered successfully');
  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while registering');
  }
}

module.exports = { login, auth, register };
