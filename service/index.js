const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cookieParser());

app.post('/api/auth', async (req, res) => {
  if (await getUser('userid', req.body.userid)) {
    res.status(409).send({msg: 'Existing user'});
  } else {
    const user = await createUser(req.body.userid, req.body.password);
    setAuthCookie(res, user);

    res.send({userid: user.userid});
  }
});

app.put('/api/auth', async (req, res) => {
  const user = await getUser('userid', req.body.userid);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);

    res.send({userid: user.userid});
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
});

app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user);
  }

  res.send({});
});

app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({userid: user.userid});
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
});

app.get('/api/user/score', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);

  if (user) {
    res.send({score: user.score});
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
});

app.put('/api/user/score', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);

  if (user) {
    user.score = req.body.score;
    res.send({score: user.score});
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
});

const users = [];

async function createUser(userid, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userid: userid,
    password: passwordHash,
    score: 0,
  };

  users.push(user);

  return user;
}

async function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

const port = 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
