const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticate (req, res, next) {
  const token = req.cookies.sessionId;

  if (!token) return res.status(401).send(JSON.stringify('Unauthorized'));
  
  jwt.verify(token, JWT_SECRET, (error, sessionData) => {
    if (error) return res.status(401).send(JSON.stringify('Unauthorized'));
    if (sessionData.expiresAt < Date.now()) return res.status(401).send('Session expired');
    next();
  });
}

module.exports = authenticate;
