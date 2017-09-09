var express = require('express');
var router = express.Router();
const Game = require('../src/game')

router.get('/', function (req, res) {
  res.render('homepage');
});

gamea = 123;
router.post('/', function (req, res) {
  game = new Game.Game
  //currently global - want to use sessions
  res.redirect('game');
});

router.get('/game', function (req, res) {
  res.render('test');
});

// router.post('/', function (req, res) {
//   User.findOne({username: req.body.username, password: req.body.password}, function (err, userexist){
//    if (err) {
//      console.log(err);
//    };
//    if (!userexist) {
//      res.render('login-failure')
//    } else {
//      res.render('firstpage-success', {data: userexist})
//      theUser = userexist
//    };
// });
// });



module.exports = router;
