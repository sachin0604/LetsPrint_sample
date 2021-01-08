var express = require('express');


var router = express.Router();

var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var CONSTANTS = require('../../util/constantBackend');
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;
var jwt = require('jsonwebtoken');



//End Point For login user
router.post('/loginUser', async function (req, res, next) {
    //Request Paramenter to insert
    var request = req.body;
    var userName = request.userName;
    var password = request.password;
    
    var userId="";

    //var encryptedPassword = FUNCTIONS.getEncryptedPassword(password);

    //finding that the user name is mobile number or emailid
    var isMobile="";
    if(userName.includes("@")){
        isMobile="No";
    }else{
    isMobile="Yes";
    }
  

    if (FUNCTIONS.isNullOrEmpty(userName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'User Name can not be empty' });
    } else if(FUNCTIONS.isNullOrEmpty(password)){
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Password can not be empty' });
    }else {
        var userDetails;
        return sequelize.transaction(async function (t) {

            //checking the credential username as mobile number or emaild  and password as password
            if(isMobile=="Yes"){
                 userDetails = await
                models.UserDetails.findOne({
                    where: {
                        mobile:userName,
                        password:password
                    }
                }).catch(function(exception){
                        throw exception;
                });
            }else{
                 userDetails = await
                models.UserDetails.findOne({
                    where: {
                        emailId:userName,
                        password:password
                    }
                })
            }
          
            if (userDetails == null ) {
                throw { msg: 'Invalid User Name and Password' }
            }else{
                userId=userDetails.id;
            }
        }).then(function () {
            //generate token
            var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                data: {
                  access: true
                }
              }, CONSTANTS.JWT_SECRET);
              FUNCTIONS.InfoLogger("Token Generated : " + token);
           // FUNCTIONS.sendResponse(res, 200, { success: true, msg: ' ' });
           FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Login Successful', user: { token: token, userInfo: { userId: userId } } });
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in login " + exception.stack);

            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg });
            } else {
                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'Login Failed' });
            }

        });
    }
})

module.exports = router;