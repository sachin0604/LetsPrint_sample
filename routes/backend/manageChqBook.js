var express = require('express');
var router = express.Router();
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;
var moment = require('moment');
var currentDate = moment().format();
//End Point for save cheque book

router.post('/saveChequeBook', async function (req, res, next) {
    var request = req.body;
    //Request parameters
    var userId=request.userId;
    var numberOfLeaves = request.numberOfLeaves;
    var startChequeNumber = request.startChequeNumber;
    var endChequeNumber = request.endChequeNumber;

    //fetch used cheque number list by passing parameters as starChqNo ,endChqNo and userId (If cheque number is print due to Manual print and came between the given range)
    var usedChequeNoList = await FUNCTIONS.getUsedChequeNumberListFromCB(startChequeNumber, endChequeNumber,userId);
    var numberOfUnusedLeaves = numberOfLeaves - usedChequeNoList.length;

    var bankCBTemplateDesignId = request.bankCBTemplateDesignId;
    var bankAccountId = request.bankAccountId;
    
    var bankAccountDetails = await FUNCTIONS.getModelDetailsById(bankAccountId, models.BankAccount);

    var bankDetails = await FUNCTIONS.getModelDetailsById(bankAccountDetails.bankId, models.Bank);
    if (FUNCTIONS.isNullOrEmpty(numberOfLeaves) ||
        FUNCTIONS.isNullOrEmpty(startChequeNumber) || FUNCTIONS.isNullOrEmpty(bankAccountId) || FUNCTIONS.isNullOrEmpty(bankCBTemplateDesignId)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Fields cannot be empty'
        });
    } else {
        return sequelize.transaction(async function (t) {

            //check that range of cheque number already addded or not 
            var manageChqBook = await
                models.BankChequeBook.findOne({
                    where: {
                        bankAccountId: bankAccountId,
                        [Op.and]: [{
                            startChequeNumber: {
                                [Op.gte]: startChequeNumber
                            },
                            endChequeNumber: {
                                [Op.lte]: endChequeNumber
                            }
                        }],
                        userId:userId
                    }
                }).then(function (manageChqBook) {
                    return manageChqBook;
                }).catch(function (exception) {
                    throw exception;
                });
            if (manageChqBook == null) {
                await
                    models.BankChequeBook.create({
                        bankAccountId: bankAccountId,
                        chequeBookName: bankDetails.shortName + ":" + startChequeNumber + "-" + endChequeNumber,
                        numberOfLeaves: numberOfLeaves,
                        numberOfUnusedLeaves: numberOfUnusedLeaves,
                        startChequeNumber: startChequeNumber,
                        endChequeNumber: endChequeNumber,
                        bankCBTemplateDesignId: bankCBTemplateDesignId,
                        userId:userId
                    }, {
                            transaction: t
                        }).catch((exception) => {
                            throw exception;
                        });
            } else {
                throw { msg: 'Checkbook already exist' }
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Inserted Successfully' });
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in saveChequeBook " + exception.stack);
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg });
            } else {
                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'insertion failed' })
            }
        })
    }
});


//End Point for fetch Checkbook List
router.get('/fetchChqBookList/:userId', async function (req, res, next) {
    var request=req.params;
    userId=request.userId;
    //fetch chq book list  for logged in user
    var chqBookList = await
        models.BankChequeBook.findAll({
            userId:userId,
            include: [
                {
                    model: models.BankAccount,
                    as: 'bankAccount',
                    attributes: ['accountHolderName', 'accountNumber'],
                    include: [
                        {
                            model: models.Bank,
                            as: 'bank',
                            attributes: ['shortName']
                        }
                    ]


                }

            ]
        }).then(function (chqBookList) {
            if (chqBookList == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No Cheque Book found' })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, chqBookList: chqBookList });

            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchChqBookList " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
        })


});

//End Point for fetch cheque Book By Id
router.get('/fetchChqBookById/:chqBookId', async function (req, res, next) {
    var request = req.params;
    var chqBookId = request.chqBookId;

    //fetch cheque book details by chequeBook id
    var chqBook = await
        models.BankChequeBook.findOne({

            where: {
                id: chqBookId
            }
        }).then(function (chqBook) {
            if (chqBook == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Bank Account not found' });
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, chqBook: chqBook });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchChqBookById " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});

//End Point for fetch Bank cheque Book list By Account Id
router.post('/fetchBankCBListByAccountId', async function (req, res, next) {
    var request = req.body;
    var userId=request.userId;
    var accountId = request.accountId;

    //fetch cheque book list by account id for logged in user
    var chqBookList = await
        models.BankChequeBook.findAll({

            where: {
                bankAccountId: accountId,
                userId:userId
            }
        }).then(function (chqBookList) {
            if (chqBookList == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Book List not found' });
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, chqBookList: chqBookList });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchBankCBListByAccountId " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});


//fetch cheque number list by CBID
router.post('/fetchUnusedChequeNoList', async function (req, res, next) {
    var request = req.body;
    var cbId = request.cbId;
    var userId=request.userId;

    //fetch cheque book details by cbId
    var chqBook = await
        models.BankChequeBook.findOne({

            where: {
                id: cbId
            }
        }).then(async function (chqBook) {
            if (chqBook == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Book  not found' });
            } else {
                var unusedChqList = [];
                unusedChqList = await FUNCTIONS.getUnusedChqNumberList(chqBook.startChequeNumber, chqBook.endChequeNumber,userId);
                FUNCTIONS.sendResponse(res, 200, { success: true, unusedChqList: unusedChqList });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchUnusedChequeNoList " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});


//End point for Save cancel Cheque Details
router.post('/saveCancelCheque', async function (req, res, next) {
    var request = req.body;
    var chequeNo = request.chequeNo;
    var cancelReason = request.cancelReason;
    var userId=request.userId;

    var chequeDetails = await FUNCTIONS.getChequeDetailsByChequeNo(chequeNo,userId);
    if (chequeDetails != null) {
        //update the bank cheque entry status as a "Cancelled"
        return sequelize.transaction(async function (t) {
            models.BankChequeEntry.update({
                chequeStatus: "Cancelled",
                cancelReason: cancelReason,
                cancelDate: currentDate


            }, {
                    where: {
                        chequeNumber: chequeNo
                    }
                }, { transaction: t })

        }).then(function () {

            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'SuccessFully Cancelled' })

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in saveCancelCheque " + exception.stack);
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg })

            } else {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something Went Wrong' })
            }

        })

    } else {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Cheque Details not found for given Cheque Number' })
    }

})

module.exports = router;