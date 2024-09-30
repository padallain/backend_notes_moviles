const express = require('express');
const { register, createLogin} = require('../controllers/auth.controllers');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.send('You have to log in.');
});

router.post('/register', register);

router.post('/login', createLogin);


module.exports = router;
