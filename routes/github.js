var express = require('express');
var debug = require('debug')('amcoderbot:github');
var router = express.Router();
var http = require('https');
var url = require('url');

var plusOne = function(uri) {
  debug("Commenting on " + uri);

  var token = process.env.GITHUB_TOKEN;

  var options = url.parse(uri);
  options.method = "POST";
  options.headers = {
    "Content-Type": "application/json",
    "Authorization": "token " + token,
    "user-agent": "amcoderbot"
  }

  debug(options);

  var req = http.request(options, (res) => {
    debug("Status: " + res.statusCode);
    debug(res.headers);
  });

  req.on('error', (e) => {
    debug('problem with request: ${e.message}');
  });

  // write data to request body
  req.write(JSON.stringify({ body: ":+1:" }));
  req.end();

  debug("Commented");
}

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

    plusOne(req.body.issue.comments_url);
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
