var express = require('express');


var router = express.Router();

var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');


//End Point For save Bank Payee
router.post('/saveBankPayee', async function (req, res, next) {
    //Request Paramenter to insert
    var request = req.body;
    var payeeName = request.payeeName;
    var payeeAddress = request.payeeAddress;
    var userId = request.userId;

    const Op = sequelize.Op;

    if (FUNCTIONS.isNullOrEmpty(payeeName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Name can not be empty' });
    } else {
        //finding payee details by name and user id if result is not null then send response as name already exist
        //otherwise create the records
        var bankPayee = await
            models.BankPayee.findOne({
                where: {
                    // bankName:{[op.ilike]:bankName}
                    payeeName: { [Op.iLike]: payeeName },
                    userId: userId

                }

            }).then(function (bankPayee) {
                if (bankPayee == null) {

                    return sequelize.transaction(async function (t) {
                        var bankPayee = await
                            models.BankPayee.create({
                                payeeName: payeeName,
                                payeeAddress: payeeAddress,
                                userId: userId
                            }).then(async function (bankPayee) {

                                FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Inserted Successfully' });

                            }).catch(function (exception) {
                                //error logger
                                FUNCTIONS.ErrorLogger("Error in saveBankPayee " + exception.stack);
                                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'Inserted Failed' });
                            })
                    });
                } else {
                    FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Payee Name already exists' });
                }

            }).catch(function (exception) {
                //error logger
                FUNCTIONS.ErrorLogger("Error in saveBankPayee" + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
            })

    }



})


//End Point For update Bank Payee
router.post('/updateBankPayee', async function (req, res, next) {

    var request = req.body;
    //Request parameters for update
    var payeeId = request.payeeId;
    var payeeName = request.payeeName;
    var payeeAddress = request.payeeAddress;
    var userId = request.userId;

    const Op = sequelize.Op;
    if (FUNCTIONS.isNullOrEmpty(payeeName) || FUNCTIONS.isNullOrEmpty(payeeId)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Payee Name Or Id can not be empty' })
    } else {

        //find payee details by id if result is null then send response AS invalid id
        var bankPayee = await
            models.BankPayee.findOne({
                where: {
                    id: payeeId
                }
            }).then(async function (bankPayee) {
                if (bankPayee == null) {
                    FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Invalid Payee Id' })
                } else {
                    //if result is not null then check that name already exist or not

                    var bankPayee = await
                        models.BankPayee.findOne({
                            where: {
                                payeeName: { [Op.iLike]: payeeName },
                                id: { [Op.notIn]: [payeeId] },
                                userId: userId

                            }

                        }).then(function (bankPayee) {
                            if (bankPayee == null) {
                                //if payee name is not alrady exist then update the details
                                return sequelize.transaction(async function (t) {

                                    models.BankPayee.update({
                                        payeeName: payeeName,
                                        payeeAddress: payeeAddress
                                    }, {
                                        where: {
                                            id: payeeId,
                                            userId: userId
                                        }
                                    }).then(function () {
                                        FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Update Successfully' });
                                    }).catch(function (exception) {
                                        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Somehing went Wrong' })
                                    })
                                });


                            } else {
                                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Payee Name already exists' });
                            }

                        }).catch(function (exception) {
                            //error logger
                            FUNCTIONS.ErrorLogger("Error in updateBankPayee " + exception.stack);
                            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
                        })
                }
            }).catch(function (exception) {
                //error logger
                FUNCTIONS.ErrorLogger("Error in updateBankPayee " + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'something went wrong' })
            })
    }

});

//fetch payee list for logged in user
router.get('/fetchBankPayeeList/:userId', function (req, res, next) {
    var request = req.params;
    //Requet parameters
    var userId = request.userId;

    //fetch payee details by userI
    models.BankPayee.findAll({
        where: {
            userId: userId
        }
        // order: [
        //     ['payeeName', 'ASC']
        // ]
    }).then(function (bankPayee) {
        if (bankPayee == null) {
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No Payee found' })
        } else {
            FUNCTIONS.sendResponse(res, 200, { success: true, bankPayee: bankPayee });
        }
    }).catch(function (exception) {
        //error logger
        FUNCTIONS.ErrorLogger("Error in fetchBankPayeeList " + exception.stack);
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
    })

});

//fetch payee details by payee id
router.get('/fetchBankPayeeById/:payeeId', async function (req, res, next) {

    var request = req.params;
    //request parameters
    var payeeId = request.payeeId;
    //fetch bank Payee details by id
    var bankPayee = await
        models.BankPayee.findOne({

            where: {
                id: payeeId
            }
        }).then(function (bankPayee) {
            if (bankPayee == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Payee not found' });
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, BankPayee: bankPayee });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error  fetchBankPayeeById " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Something went wrong' });
        });

});
module.exports = router;

