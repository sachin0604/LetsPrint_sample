// Hawk is an HTTP authentication scheme using a message authentication code (MAC) algorithm to provide partial HTTP request cryptographic verification.
// more info @ https://www.npmjs.com/package/hawk
var Hawk = require('hawk');

var FUNCTIONS = require('../function/function');
var CONSTANTS = require('../constant');

var isTokenNeeded =  function(url){
    if(url=='/login'){
        return false;
    }else{
        return true;
    }
}

module.exports = {
    /**
     * checking authentication
     * req - get request from user 
     * res - give response to request
     * next - move to next middleware or requesting url
     */
    securityHandler : function(req, res, next) {

        // Authenticate incoming request 

        //console.log(req);

        /**
         * 
         * @param {*} id 
         * @param {*} callback 
         */
        const credentialsFunc = function(id, callback) {

            /**
             * key,algorithm,user : which same giving to frontend and backend for security, if key wrong means its not valid user
             */
            const credentials = {
                key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
                //key: 'we4121vjklsclkfakpoxhqb98rpfdvjkiofdjxrunpaw154512ruvjhnjkch4rxn',
                algorithm: 'sha256',
                user: 'Steve'
            };

            return callback(null, credentials);
        };



        if (!isTokenNeeded(req.path)) {
            FUNCTIONS.InfoLogger("Inside : " + req.path);
            next();
        } else {
            /**
             * here check credential which given by user in request with credentialsFunc
             */
            Hawk.server.authenticate(req, credentialsFunc, {}, (err, credentials, artifacts) => {
                //console.log(artifacts);
                //console.log(credentials);
                //if error has occurred
                if (err) {
                    FUNCTIONS.ErrorLogger("HAWK ERROR : " + err);
                    res.status(401).json({ success: false, msg: "UnAuthorized" });
                } else {
                    // console.log(next);
                    // res.status(200).json({ success: true });

                    //if credential valid then its goes to requested url
                    next();
                }
            });

        }
        

    }
}

