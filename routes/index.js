var express = require('express');
var router = express.Router();
const Game = require('../src/game')

router.get('/', function (req, res) {
  res.render('homepage');
});

router.post('/', function (req, res) {
  game = new Game
  console.log(game)
  //currently global - want to use sessions
  res.redirect('game');
});

router.get('/game', function (req, res) {
  res.render('game1');
});

router.post('/roll', function (req, res) {
  game.bowl(parseInt(req.body.rollValue))
  res.redirect('game');
});

module.exports = router;
