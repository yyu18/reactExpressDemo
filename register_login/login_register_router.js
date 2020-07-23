var express = require('express');
var admin = require("firebase-admin");
var passwordHash = require('password-hash');
//firebase admin initialize
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://pushnotification-124c9.firebaseio.com"
  });

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log("snapshot is:"+snapshot.val());
});
//router created
var router = express.Router();

router.post('/register',register);

router.post('/login',login);

module.exports = router;

function register(req,res,next) {
    console.log(req.body);
}

function login(req,res,next) {
  console.log(req.body);
  var hashedPassword = passwordHash.generate(req.body.password);
  res.json({
    success:'connected'
  })
}