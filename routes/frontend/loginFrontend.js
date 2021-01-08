var express = require('express');
var router = express.Router();


//login user and validate the credentials
router.post('/loginUser', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    var userName = request.userName;
    var password = request.password;
    //details = request.details;
    // links in constant.js

    var url = BACKEND.BASE_URL + BANK_BACKEND.USER_LOGIN;
    var body = {
        userName: userName,
        password: password
    }
    // hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            var loginUser = new Object();
            var loginUser = body.user;
            // sess == undefined ? {} : sess;
            // sess.user == undefined ? {} : sess.user;
            sess.user = loginUser;

            sess.save();
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/function.js
});


module.exports = router;