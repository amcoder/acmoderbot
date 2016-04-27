var express = require('express');
var debug = require('debug')('amcoderbot:github');
var router = express.Router();

var logRequest = function(req, res, next) {
  debug("Headers: " + JSON.stringify(req.headers, null, 2));
  debug("Body: " + JSON.stringify(req.body, null, 2));
  next();
}

var issueComment = function(req, res, next) {
  if(req.get("x-github-event") === "issue_comment" &&
      req.body.issue.user.login === "amcoderbot" &&
      req.body.comment.user.login !== "amcoderbot") {
    debug("Issue comment");
  }
  next();
}

var masterPush = function(req, res, next) {
  if(req.get("x-github-event") === "push") {
    debug("Master pushed");
  }
  next();
}

var defaultResponse = function(req, res, next) {
  res.json({});
}

/* The github webhook endpoint */
router.post('/webhook',
    logRequest,
    masterPush,
    issueComment,
    defaultResponse);

module.exports = router;
