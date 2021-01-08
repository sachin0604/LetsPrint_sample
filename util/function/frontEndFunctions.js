// var hawk = require('hawk');
var request = require('request');
var hawk = require('hawk');
global.setReqOptions = function (sess, method, jsonFlag, headers, body, url) {

    var newHeader = JSON.parse(toJSONString(headers));
    //console.log("Session : " + JSON.stringify(sess));

    if (sess != undefined && sess.user !== undefined) {
        newHeader.x_access_token = sess.user.token;
        body.token = sess.user.token;
    }

    //var methodType=method;

    var reqOptions = {
        method: method,
        json: jsonFlag,
        headers: newHeader,
        body: body,
        url: url
    };


    if (method == "get") {
        reqOptions = {
            method: method,
            json: jsonFlag,
            headers: newHeader,
            url: url
        };
    }
    return reqOptions;
};

global.generateAuthHeader = function (Url, method) {
    var credentials = {
        id: 'dh37fgj492je',
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256'
    };
    //Crendentials are initialized in constants.js
    const header = hawk.client.header(Url, method, {
        credentials: credentials
    });
    return header.field;
}


// function for stringify the json object
global.toJSONString = function (object) {
    return JSON.stringify(object);
}

function APIError() {}

//hit backend api
global.hitApi = function (reqOptions) {
    return new Promise(function (resolve, reject) {
        request(reqOptions, function (err, serverResponse, body) {
            if (err) {
                console.error('error posting json auth: ', err);
                reject(err);
            } else {
                var headers = serverResponse.headers;
                var statusCode = serverResponse.statusCode;
                if (statusCode === 200) {
                    resolve({
                        body: body,
                        serverResponse: serverResponse
                    });
                } else {
                    var apiErr = new APIError();
                    apiErr.statusCode = statusCode;
                    reject(apiErr);
                }
            }
        });
    });
}

//error handler
global.APIErrorHandler = function (err, res) {
    if (err instanceof APIError) {
        var statusCode = err.statusCode;
        if (statusCode === 401) {
            //console.log("err");
            res.redirect('sign-in');
        } else if (statusCode === 500) {
            res.render('500');
        } else if (statusCode === 403) {
            //console.log("err");
            res.render('403');
        }
    } else {
        res.render('500');
    }
}

global.sendResponse = function (res, statusCode, json) {
    res.status(statusCode).json(json);
}

global.renderPage = function (req, res, page, json) {
    json.sess = req.session == undefined ? {} : req.session;

    //if title is not define during Page render then it takes as (Let's Print)
    if(json.title == undefined){
        json.title = "Let's Print"
    }

    // res.render(page,json);
    if (req.session.user != undefined) {
        json.sessionSet = true;
        json.userName = json.sess.user.userInfo.userName;
        res.render(page, json);

    } else {
        json.sessionSet = false;
        json.userName = "";
        res.render('bankManagement/login', json);
    }

    // if (req.session.user != undefined) {
    //     json.sessionSet = true;
    //     json.userName=json.sess.user.userInfo ? json.sess.user.userInfo.userName :"";

    // } else {
    //     json.sessionSet = false;
    //     json.userName="";
    //    // res.render('index',json);
    // }
    // res.render(page,json);

}

global.isString = function (object) {
    if (typeof object === 'string') {
        return true;
    } else {
        return false;
    }
}