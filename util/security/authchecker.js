
var jwt = require('jsonwebtoken');

var FUNCTIONS = require('../function/function');
var CONSTANTS = require('../constant');

var isTokenNeeded = function(url){
    if(url=='/login'){
        return false;
    }else{
        return true;
    }
}


//use for checking authentication
module.exports = {
    /**
     * checking authentication
     * req - get request from user 
     * res - give response to request
     * next - move to next middleware or requesting url
     */
    authChecker : function (req, res, next) {
        //console.log(req.headers);
        //provide request path 
        FUNCTIONS.InfoLogger("Requested Path : " + req.path);
        //provide request body content
        FUNCTIONS.InfoLogger("Request Body : " + FUNCTIONS.toJSONString(req.body));
        //provide request param content
        FUNCTIONS.InfoLogger("Request Param : " + FUNCTIONS.toJSONString(req.param));
        //provide request header content
        //console.log("Headers : " + FUNCTIONS.toJSONString(req.headers));

        //if user hit /login url then authentication checking process skip here
        //allow website routes overhere

        if (!isTokenNeeded(req.path)) {
            FUNCTIONS.InfoLogger("Inside : " + req.path);
            next();
        } else {
            //if use hit other than /login url then its check authentication        
            var requestedPath = req.path + ""; //convert into string;
            //url where user hit
            FUNCTIONS.InfoLogger("Requested Path : " + requestedPath);


            /**
             *validate token before entering routes
            *here token come from three  ways :
            *1.if post method :- req.body.token
            *2.if get method :- req.query.token
            *3.if token come from header with specific key :- req.headers['x_access_token'] 
            */
            var token = req.body.token || req.query.token || req.headers['x_access_token'];

            // decode token
            //if token have any value then it go for check token verification process
            //otherwise else and response with 401:'No token provided.'
            if (token) {

                // verifies secret and checks exp
                /**
                 * @param token provided by requested user
                 * @param JMT_JWT_SECRET code (which known only frontend and backend for encode and decode token) 
                 * to jwt with callBack function
                 * callBack Function : two parameter 
                 *                      @param err :- says token right or wrong
                 *                      @param decode :- if token right then its return with decoded pattern
                 */
                jwt.verify(token, CONSTANTS.JWT_SECRET, function(err, decoded) {
                    if (err) {
                        console.log(err);
                        //FUNCTIONS.ErrorLogger("Token Verification failed token : " + token);
                        FUNCTIONS.ErrorLogger("Token Verification failed for: "+req.path);
                        res.status(401).json({ success: false, msg: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        //FUNCTIONS.InfoLogger("Token Verification successful");
                        req.decoded = decoded;
                        //console.log('decoded:' + JSON.stringify(decoded));
                        //FUNCTIONS.InfoLogger("Decoded : " + JSON.stringify(decoded));
                        //FUNCTIONS.InfoLogger("Inside : " + req.path);
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                //FUNCTIONS.InfoLogger("No Token Provided");
                FUNCTIONS.ErrorLogger("No Token Provided for: "+req.path);
                res.status(401).send({
                    success: false,
                    msg: 'No token provided.'
                });

            }
        }
    }
}
