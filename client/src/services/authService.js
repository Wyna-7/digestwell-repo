const BASE_URL = 'http://localhost:3000/';

async function register (email, password, firstName, lastName) {
  const response = await fetch(BASE_URL + 'register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
  return response;
}

async function login (email, password) {
  const response = await fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', 
  });
  return response;
}

async function auth () {
  const response = await fetch(BASE_URL + 'auth', {
    method: 'GET',
    credentials: 'include', 
  });
  return response;
}

export { register, login, auth };