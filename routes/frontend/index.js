var express = require('express');
var router = express.Router();

//save bank details frontend api 
router.post('/bank/add', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //Request parameters for save
    var name = request.name;//bank name
    var shortName = request.shortName;//bank short name
    var userId = sess.user.userInfo.userId;//get userid from session

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.ADD_BANK;
    var body = {
        bankName: name,
        shortName: shortName,
        userId: userId
    }
    //set the reqOptions and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//update bank details frontend api
router.post('/bank/update', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //Request parameters for update
    var name = request.name;//bank name
    var shortName = request.shortName;//bank short name
    var bankId = request.bankId;//bank id
    var userId = sess.user.userInfo.userId;//get userid from session
    //details = request.details;
    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.UPDATE_BANK;
    var body = {
        bankName: name,
        shortName: shortName,
        bankId: bankId,
        userId: userId

    }
    //set reqoption and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
});

// fetch Bank List for logged in user
router.get('/fetchBankList', function (req, res, next) {
    var request = req.body;
    var sess = req.session == undefined ? {} : req.session;
    var userId = sess.user.userInfo.userId;
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_BANK_LIST + "/" + userId;
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, {}, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
});

//Add payee details
router.post('/payee/add', function (req, res, next) {
    var request = req.body;
    var sess = req.session;

    //Request parameters for save
    var payeeName = request.payeeName;
    var payeeAddress = request.payeeAddress;
    var userId = sess.user.userInfo.userId;
    
    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.ADD_PAYEE;
    var body = {
        payeeName: payeeName,
        payeeAddress: payeeAddress,
        userId: userId
    }
    //set reqOptiion and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes 
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
});
//update payee details
router.post('/payee/update', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //Request parameters for update
    var payeeName = request.payeeName;
    var payeeAddress = request.payeeAddress;
    var payeeId = request.payeeId;
    var userId = sess.user.userInfo.userId;
    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.UPDATE_PAYEE;
    var body = {
        payeeName: payeeName,
        payeeAddress: payeeAddress,
        payeeId: payeeId,
        userId: userId

    }
    //set reqOption and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//fetch Payee List
router.get('/fetchPayeeList', function (req, res, next) {
    var request = req.body;
    var sess = req.session == undefined ? {} : req.session;
    var userId = sess.user.userInfo.userId;//get userid from session
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_PAYEE_LIST + "/" + userId;

    //set the reqOption and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, {}, url);


    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });

        //all functions written in util/frontEndFunction.js
});

//Save Account  for logged in user
router.post('/saveAccount', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //Request parameters for save account
    var bankId = request.bankId;
    var accountType = request.accountType;
    var accountHolderName = request.accountHolderName;
    var accountNumber = request.accountNumber;
    var ifscCode = request.ifscCode;
    var branchCode = request.branchCode;
    var address = request.address;
    var minimumBalance = request.minimumBalance;
    var userId = sess.user.userInfo.userId;//get userid from session

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_ACCOUNT;
    var body = {
        bankId: bankId,
        accountType: accountType,
        accountHolderName: accountHolderName,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        branchCode: branchCode,
        bankAddress: address,
        minimumBalance: minimumBalance,
        userId: userId
    }
    //set rqoption and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            //Sachin
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//update bank account
router.post('/updateBankAccount', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //request parameters for update account
    var bankAccountId = request.bankAccountId;
    var bankId = request.bankId;
    var accountType = request.accountType;
    var accountHolderName = request.accountHolderName;
    var accountNumber = request.accountNumber;
    var ifscCode = request.ifscCode;
    var branchCode = request.branchCode;
    var address = request.address;
    var minimumBalance = request.minimumBalance;
    var userId = sess.user.userInfo.userId;

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.UPDATE_ACCOUNT;
    var body = {
        bankAccountId: bankAccountId,
        bankId: bankId,
        accountType: accountType,
        accountHolderName: accountHolderName,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        branchCode: branchCode,
        bankAddress: address,
        minimumBalance: minimumBalance,
        userId: userId
    }
    //set the reqOption and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});


//fetch Bank Account By Id
router.get('/fetchBankAccountById/:bankAccountId', function (req, res, next) {

    var sess = req.session;
    var bankAccountId = req.params.bankAccountId;
    
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_ACCOUNT_BY_ID + "/" + bankAccountId;
    //set the req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch Account List for logged in user
router.get('/fetchBankAccountList', function (req, res, next) {
    var sess = req.session;
    var userId = sess.user.userInfo.userId;//get userid from session
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_ACCOUNT_LIST + "/" + userId;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })
});



//Save Cheque Template 
router.post('/saveChequeTemplate', function (req, res, next) {
    var request = req.body;
    var sess = req.session;

    //request parameter for save template
    var bankId = request.bankId;
    var templateName = request.templateName;
    var templateImgBase64 = request.templateImgBase64;
    var dateFormate = request.dateFormate;
    var chqDateTop = request.chqDateTop;
    var chqDateLeft = request.chqDateLeft;
    var chqDateHeight = request.chqDateHeight;
    var chqDateWidth = request.chqDateWidth;
    var payeeNameTop = request.payeeNameTop;
    var payeeNameLeft = request.payeeNameLeft;
    var payeeNameWidth = request.payeeNameWidth;
    var amountTop = request.amountTop;
    var amountLeft = request.amountLeft;
    var amountWidth = request.amountWidth;
    var amountInWordTop = request.amountInWordTop;
    var amountInWordLeft = request.amountInWordLeft;
    var amountInWordWidth = request.amountInWordWidth;
    var accPayeeTop = request.accPayeeTop;
    var accPayeeLeft = request.accPayeeLeft;
    var accPayeeWidth = request.accPayeeWidth;
    var userId = sess.user.userInfo.userId;//get userid from session

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_CB_TEMPLATE;
    var body = {
        bankId: bankId,
        templateName: templateName,
        templateImgBase64: templateImgBase64,
        dateFormate: dateFormate,
        chqDateTop: chqDateTop,
        chqDateLeft: chqDateLeft,
        chqDateHeight: chqDateHeight,
        chqDateWidth: chqDateWidth,
        payeeNameTop: payeeNameTop,
        payeeNameLeft: payeeNameLeft,
        payeeNameWidth: payeeNameWidth,
        amountTop: amountTop,
        amountLeft: amountLeft,
        amountWidth: amountWidth,
        amountInWordTop: amountInWordTop,
        amountInWordLeft: amountInWordLeft,
        amountInWordWidth: amountInWordWidth,
        accPayeeTop: accPayeeTop,
        accPayeeLeft: accPayeeLeft,
        accPayeeWidth: accPayeeWidth,
        userId: userId
    }
    // set reqOption and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//update cheque Tenmplate for logged in user
router.post('/updateChequeTemplate', function (req, res, next) {
    var request = req.body;
    var sess = req.session;
    //request parameter for update template
    var chequeTemplateId = request.chequeTemplateId;
    var bankId = request.bankId;
    var templateName = request.templateName;
    var templateImgBase64 = request.templateImgBase64;
    var dateFormate = request.dateFormate;
    var chqDateTop = request.chqDateTop;
    var chqDateLeft = request.chqDateLeft;
    var chqDateHeight = request.chqDateHeight;
    var chqDateWidth = request.chqDateWidth;
    var payeeNameTop = request.payeeNameTop;
    var payeeNameLeft = request.payeeNameLeft;
    var payeeNameWidth = request.payeeNameWidth;
    var amountTop = request.amountTop;
    var amountLeft = request.amountLeft;
    var amountWidth = request.amountWidth;
    var amountInWordTop = request.amountInWordTop;
    var amountInWordLeft = request.amountInWordLeft;
    var amountInWordWidth = request.amountInWordWidth;
    var accPayeeTop = request.accPayeeTop;
    var accPayeeLeft = request.accPayeeLeft;
    var accPayeeWidth = request.accPayeeWidth;
    var userId = sess.user.userInfo.userId;
    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.UPDATE_CB_TEMPLATE;
    var body = {
        chequeTemplateId: chequeTemplateId,
        bankId: bankId,
        templateName: templateName,
        templateImgBase64: templateImgBase64,
        dateFormate: dateFormate,
        chqDateTop: chqDateTop,
        chqDateLeft: chqDateLeft,
        chqDateHeight: chqDateHeight,
        chqDateWidth: chqDateWidth,
        payeeNameTop: payeeNameTop,
        payeeNameLeft: payeeNameLeft,
        payeeNameWidth: payeeNameWidth,
        amountTop: amountTop,
        amountLeft: amountLeft,
        amountWidth: amountWidth,
        amountInWordTop: amountInWordTop,
        amountInWordLeft: amountInWordLeft,
        amountInWordWidth: amountInWordWidth,
        accPayeeTop: accPayeeTop,
        accPayeeLeft: accPayeeLeft,
        accPayeeWidth: accPayeeWidth,
        userId:userId
    }
    //set req Option and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//fetch Cheque Template By Id
router.get('/fetchChequeTemplateById/:templateId', function (req, res, next) {

    var sess = req.session;
    var templateId = req.params.templateId;
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CHEQUE_TEMPLATE_BY_ID + "/" + templateId;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})
//fetch Cheque Template By Bank Id
router.get('/fetchChqTemplateByBankId/:bankId', function (req, res, next) {
    var sess = req.session;
    var bankId = req.params.bankId;
    var userId=sess.user.userInfo.userId;//get user id from session

    var body={
        bankId:bankId,
        userId:userId
    }

    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CB_TEMPLATE_BY_BANK_ID;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})
//fetch Cheque Template By CB Id
router.get('/fetchChqTemplateByCBId/:chqBookId', function (req, res, next) {
    var sess = req.session;

    var chqBookId = req.params.chqBookId;
    var userId=sess.user.userInfo.userId;//get userId from session

    var body={
        chqBookId:chqBookId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CB_TEMPLATE_BY_CB_ID;
    //set req Option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch Cheque Template List
router.get('/fetchChequeTemplateList', function (req, res, next) {
    var sess = req.session;
    var userId=sess.user.userInfo.userId;//get userId from session
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CB_TEMPLATE_LIST+"/"+userId;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })
});



//check given Cheque Number is already printed or not
router.get('/checkChequeNoAlreadyPrintedOrNot/:chequeNo', function (req, res, next) {

    var sess = req.session;
    var chequeNo = req.params.chequeNo;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        chequeNo:chequeNo,
        userId:userId
    }

    var url = BACKEND.BASE_URL + BANK_BACKEND.CHEQUE_NO_PRINTED_OR_NOT;
    //set req Option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})


//fetch ChequeBook List for logged in user
router.get('/fetchChequeBookList', function (req, res, next) {
    var sess = req.session;
    var userId=sess.user.userInfo.userId;//get user id from session
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CB_LIST+"/"+userId;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })
});

//Save Cheque Book 
router.post('/saveChequeBook', function (req, res, next) {
    var request = req.body;
    var sess = req.session;

    //Request parameter for save cheque book
    var bankAccountId = request.bankAccountId;
    var templateId = request.templateId;
    var noOfLeaves = request.noOfLeaves;
    var startingChqNo = request.startingChqNo;
    var endChequeNo = request.endChequeNo;
    var userId=sess.user.userInfo.userId;

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_CHEQUE_BOOK;
    var body = {
        bankAccountId: bankAccountId,
        bankCBTemplateDesignId: templateId,
        numberOfLeaves: noOfLeaves,
        startChequeNumber: startingChqNo,
        endChequeNumber: endChequeNo,
        userId:userId
    }
    //set reqOption and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

router.post('/saveManualChequeEntry', function (req, res, next) {
    var request = req.body;
    var sess = req.session;

    //Request parameters for save manual cheque entry
    var chqNumber = request.chqNumber;
    var payeeName = request.payeeName;
    var amount = request.amount;
    var chqDate = request.chqDate;
    var remark = request.remark;
    var chqType = request.chqType;
    var userId=sess.user.userInfo.userId;

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_MANUAL_CHEQUE_PRINT_ENTRY;
    var body = {
        chqNumber: chqNumber,
        payeeName: payeeName,
        amount: amount,
        chqDate: chqDate,
        remark: remark,
        chqType: chqType,
        userId:userId
    }
    //set req option and  hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//fetch Cheque Book List By Account Id
router.get('/fetchChqBookListByAccountId/:accountId', function (req, res, next) {
    var sess = req.session;
    var accountId = req.params.accountId;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        accountId:accountId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CB_LIST_BY_ACCOUNT_ID;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})
//fetch Cheque Book List By cheque book id Id
router.get('/fetchUnusedChequeNoList/:cbId', function (req, res, next) {
    var sess = req.session;
    var cbId = req.params.cbId;
    var userId=sess.user.userInfo.userId;//get userid from session
    var body={
        cbId:cbId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_UNUSED_CHEQUE_NO_LIST_BY_CBId;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch Cheque Book List By account Id
router.get('/fetchUnusedChequeNoList/:bankAccountId', function (req, res, next) {
    var sess = req.session;
    var bankAccountId = req.params.bankAccountId;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        bankAccountId:bankAccountId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_UNUSED_CHEQUE_NO_LIST_BY_CBId ;
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch cheque summary report by account id
router.get('/fetchChequeSummaryReportBy/:bankAccountId', function (req, res, next) {

    var sess = req.session;
    var bankAccountId = req.params.bankAccountId;
    var userId=sess.user.userInfo.userId;//get user id from session 
    var body={
        userId:userId,
        bankAccountId:bankAccountId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.CHEQUE_SUMMARY_BY_ACCOUNT_ID;

    //set request option  and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch printed cheque list by account id
router.get('/fetchPrintedChequeListByAccountId/:bankAccountId', function (req, res, next) {
    var sess = req.session;
    var bankAccountId = req.params.bankAccountId;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        bankAccountId:bankAccountId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.PRINTED_CHEQUE_REPORT_BY_ACCOUNT_ID;
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch cancelled cheque reports for logged in user
router.get('/fetchCancelledChequeListByAccountId/:bankAccountId', function (req, res, next) {
    var sess = req.session;
    var bankAccountId = req.params.bankAccountId;
    var userId=sess.user.userInfo.userId;//get userid from session
    var body={
        bankAccountId:bankAccountId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.CANCELLED_CHEQUE_REPORT_BY_ACCOUNT_ID;
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

//fetch cheque book detail reports by cbid for logged in user
router.get('/fetchChequeBookDetailReportByCBID/:cbId', function (req, res, next) {
    var sess = req.session;
    var cbId = req.params.cbId;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        cbId:cbId,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.CHEQUE_BOOK_DETAILS_REPORT_BY_CHEQUEBOOK_ID;
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    
    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})


//save Bulk cheque Print
// router.post('/saveBulkPrintChq', function (req, res, next) {
//     var request = req.body;
//     var sess = req.session;
//     bulkPrintData = request.bulkPrintData;
//     var userId=sess.user.userInfo.userId;

//     // links in constant.js
//     var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_BULK_CHEQUE_PRINT_ENTRY;
//     var body = {
//         bulkPrintData: bulkPrintData,
//         userId:userId
//     }
//     // hit on backend
//     var reqOptions = setReqOptions(sess, "post", true, {
//         'Authorization': generateAuthHeader(url, "post")
//     }, body, url);

//     hitApi(reqOptions)
//         .then(function (response) {
//             var body = response.body;
//             var statusCode = response.serverResponse.statusCode;
//             //Set Session Attributes
//             sendResponse(res, statusCode, body);
//         }).catch(function (err) {
//             APIErrorHandler(err);
//         });
//     // all functions written in util/frontEndfunction.js
// });


//fetch Cheque Details By cheque number
router.get('/fetchChequeDetailsByChequeNo/:chequeNo', function (req, res, next) {
    var sess = req.session;
    var chequeNo = req.params.chequeNo;
    var userId=sess.user.userInfo.userId;//get user id from session
    var body={
        chequeNo:chequeNo,
        userId:userId
    }
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_CHEQUE_DETAILS_BY_CHEQUE_NO;
    
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

})

router.post('/saveCancelCheque', function (req, res, next) {
    var request = req.body;
    var sess = req.session;

    var chequeNo = request.chequeNo;
    var cancelReason = request.cancelReason;
    var userId=sess.user.userInfo.userId;//get user id from session
    

    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_CANCEL_CHEQUE;
    var body = {
        chequeNo: chequeNo,
        cancelReason: cancelReason,
        userId:userId
    }
    
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//save bulk cheque print entry
router.post('/saveBulkPrintCheque', function (req, res, next) {
    var request = req.body;
    var bulkPrintData = JSON.parse(request.dataTest);
    var sess = req.session;
    var userId=sess.user.userInfo.userId;//get user id from session
    


    // links in constant.js
    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_BULK_CHEQUE_PRINT_ENTRY;
    var body = {
        bulkPrintData: bulkPrintData,
        userId:userId
    }
    
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});

//fetch Plan List
router.get('/fetchPlanList', function (req, res, next) {
    var sess = req.session;
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_PLAN_LIST;

    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })
});

//fetch plan by id
router.get('/fetchPlanById/:planId', function (req, res, next) {
    var sess = req.session;
    var planId = req.params.planId;
    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_PLAN_BY_ID + "/" + planId;


    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;

            // res.render('bankManagement/updateBankAccount')
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

});

//fetch plan by id
router.get('/fetchUserPlanByUserId', function (req, res, next) {
    var sess = req.session;
    var userId = sess.user.userInfo.userId;//get user id from session

    var url = BACKEND.BASE_URL + BANK_BACKEND.FETCH_USER_PLAN_BY_USER_ID + "/" + userId;
    
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "get", true, {
        'Authorization': generateAuthHeader(url, "get")
    }, "", url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        })

});


//save User Details
router.post('/saveUserDetails1', function (req, res, next) {
    var sess = req.session;
    var request = req.body;
    
    //Request parameter for save user details
    var name = request.name;
    var mobileNo = request.mobileNo;
    var emailId = request.emailId;
    var password = request.password;
    var address = request.address;
    var planId = request.planId;
    var payStatus = request.payStatus;

    var url = BACKEND.BASE_URL + BANK_BACKEND.SAVE_USER_DETAILS;
    var body = {
        name: name,
        mobileNo: mobileNo,
        emailId: emailId,
        password: password,
        address: address,
        planId: planId,
        payStatus: payStatus
    }
    
    //set req option and hit on backend
    var reqOptions = setReqOptions(sess, "post", true, {
        'Authorization': generateAuthHeader(url, "post")
    }, body, url);

    hitApi(reqOptions)
        .then(function (response) {
            var body = response.body;
            var statusCode = response.serverResponse.statusCode;
            //Set Session Attributes
            sendResponse(res, statusCode, body);
        }).catch(function (err) {
            APIErrorHandler(err);
        });
    // all functions written in util/frontEndfunction.js
});


module.exports = router;