var express = require('express');
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://pushnotification-124c9.firebaseio.com"
  });

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log("snapshot is:"+snapshot.val());
});

var router = express.Router();

router.post('/register',register);

router.post('/login',login);

module.exports = router;

function register(req,res,next) {
    console.log('register');
}

function login(req,res,next) {
    console.log('login');
}