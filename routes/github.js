var express = require('express');
var debug = require('debug')('amcoderbot:github');
var router = express.Router();

var masterPush = function(req, res, next) {
  if(req.get("x-github-event") !== "push") {
    next();
    return;
  }

  debug("Master pushed");
  res.json({});
}

/* The github webhook endpoint */
router.post('/webhook', function(req, res, next) {
  debug("Headers: " + JSON.stringify(req.headers, null, 2));
  debug("Body: " + JSON.stringify(req.body, null, 2));
  next();
},
masterPush);

module.exports = router;
