var express = require('express');
var debug = require('debug')('amcoderbot:github');
var router = express.Router();

/* The github webhook endpoint */
router.post('/webhook', function(req, res, next) {
  debug("Headers: " + JSON.stringify(req.headers, null, 2));
  debug("Body: " + JSON.stringify(req.body, null, 2));
  res.json({});
});

module.exports = router;
