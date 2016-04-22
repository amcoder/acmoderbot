var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: "amcoderbot",
    message: "https://github.com/amcoder/acmoderbot"
  });
});

module.exports = router;
