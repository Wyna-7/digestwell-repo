const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createSession, verifySession } = require('../session_utils');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = createSession(user.id);
    res.cookie('sessionId', token, {
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error occurred while logging in' });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie('sessionId', { path: '/' });
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging out' });
  }
}

async function auth(req, res) {
  try {
    console.log('_______________________------_________________', req);
    const token = req.cookies.sessionId;
    if (!token) return res.status(401).json({ error: 'Token not found' });

    const sessionData = verifySession(token);

    if (!sessionData) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findByPk(sessionData.userId);

    if (!user) return res.status(401).json({ error: 'User not found' });

    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while authenticating' });
  }
}

async function register(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
    res.status(201).json({ userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering' });
  }
}

module.exports = { login, logout, auth, register };
