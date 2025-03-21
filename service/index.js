const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service
// is restarted.
let users = [];
let scores = [];

// The service port. In production the front-end code is statically hosted by
// the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    console.log(`User already exists: ${req.body.username}`);
    res.status(409).send({msg: 'Existing user'});
  } else {
    const user = await createUser(req.body.username, req.body.password);
    console.log(`User created: ${user.username}`);

    setAuthCookie(res, user.token);
    res.send({username: user.username});
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({username: user.username});
      return;
    }
  }
  res.status(401).send({msg: 'Unauthorized'});
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCooki(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
};

// Get current user info
apiRouter.get('/user/me', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (!user) {
    return res.status(401).send({msg: 'Unauthorized'});
  }

  res.send({
    username: user.username,
    progress: user.progress,
    score: user.score,
    locations: user.locations || [],
    activities: user.activities || [],
    images: user.images || [],
    newpoints: user.newpoints,
  });
});

// GetScores
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

// Default error handler
app.use(function(err, req, res, next) {
  res.status(500).send({type: err.name, message: err.message});
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

// update user updates the current users points and progress after a check in
apiRouter.post('/user/update', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (!user) {
    return res.status(401).send({msg: 'Unauthorized'});
  }

  user.progress = req.body.progress;
  user.score = req.body.score;
  user.locations = req.body.locations || user.locations;
  user.activities = req.body.activities || user.activities;
  user.images = req.body.images || user.images;
  user.newpoints = req.body.newpoints || user.newpoints;

  res.send({
    username: user.username,
    progress: user.progress,
    score: user.score,
    locations: user.locations,
    activities: user.activities,
    images: user.images,
    newpoints: user.newpoints,
  });
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}


async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    progress: 0,
    score: 0,
    locations: [],
    activities: [],
    images: [],
    newpoints: 0,
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});