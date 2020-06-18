var express = require('express');
var router = express.Router();
let client_ID;
try {
    client_ID = JSON.parse(process.env.GOOGLE_CLIENT_ID);
    console.log('vcapServices: ', vcapServices)
} catch(err) {
    let vcapServices = require('./vcap-local.json');
    console.log("Loaded local VCAP", vcapServices);
    client_ID = vcapServices.GOOGLE_CLIENT_ID
}
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(client_ID);



async function verify(token) {
const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
});
const payload = ticket.getPayload();
const userid = payload['sub'];
// If request specified a G Suite domain:
// const domain = payload['hd'];
}
  
  

router.get("/", function(req, res, next) {
    res.send(client_ID);
});

router.post("/", function(req, res, next) {
    console.log(req.body);
    verify(req.body).catch(console.error);
    res.send(req.body);
});

module.exports = router;