const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function createSession (userId) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  const newSession = {
    userId,
    expiresAt: expiry.valueOf(),
  };
  return jwt.sign(newSession, JWT_SECRET);
}

function verifySession (token) { 
  const sessionData = jwt.verify(token, JWT_SECRET);
  if (sessionData.expiresAt < Date.now()) {
    console.log('Session expired');
    return null;
  }
  return sessionData;
}

module.exports = { createSession, verifySession };