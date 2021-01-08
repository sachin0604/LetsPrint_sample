var express = require('express');
var router = express.Router();
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;
var moment = require('moment');


//end point for print manual cheque
router.post('/printManualChqSave', async function (req, res, next) {
    var request = req.body;

    //Request parameters
    var chqNumber = request.chqNumber;
    var payeeName = request.payeeName;
    var amount = request.amount;
    var chqDate = request.chqDate;
    var remark = request.remark;
    var chqType = request.chqType;
    var userId = request.userId;
    //fetching cheque number details(BankChequeEntry) by cheque number and userId
    var chqNumberDetails = await FUNCTIONS.getChequeDetailsByChequeNo(chqNumber, userId);
    //fetching user current plan
    var userCurrentPlan = await FUNCTIONS.getUserCurrentPlan(userId);
    var currentlyPrintCount = 0;
    if (userCurrentPlan != null) {
        currentlyPrintCount = userCurrentPlan.noOfPrintDoneCurrently;
    }

    if (chqNumberDetails != null) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'This cheque Number is aleady printed'
        });
    } else {

        //if max allowed limit reach
        if(Number(userCurrentPlan.noOfPrintDoneCurrently)>=Number(userCurrentPlan.noOfPrintAllowed)){
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'You Reach at your maximum limit now you can not Print. Please contact to the Admin for more Query.'
            });
        }else{
        
        return sequelize.transaction(async function (t) {
            await
            models.BankChequeEntry.create({
                chequeNumber: chqNumber,
                payeeName: payeeName,
                chequeAmount: amount,
                chequeDate: chqDate,
                remark: remark,
                chequeType: chqType,
                chequeStatus: "Proceed",
                printType: "Manual",
                userId: userId

            }, {
                transaction: t
            });


            //update user plan i.e update the noOfPrintDoneCurrently
            await
            models.UserPlan.update({
                noOfPrintDoneCurrently: Number(currentlyPrintCount) + 1

            }, {
                where: {
                    userId: userId,
                    isThisLatestPlan: true
                }
            })
            // to update unused cheque Leaves count 
            //first fetch bankChequeBook by cheque number 
            var bankChequeBook = await FUNCTIONS.getChequeBookDetailsByChequeNo(chqNumber);
            if (bankChequeBook != null) {
                models.BankChequeBook.update({
                    numberOfUnusedLeaves: (bankChequeBook.numberOfUnusedLeaves - 1)

                }, {
                    where: {
                        id: bankChequeBook.id,
                        userId: userId
                    }
                }, {
                    transaction: t
                })
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Print successfully!!!'
            })
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in printManualChqSave " + exception.stack);
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: exception.msg
                });
            } else {
                FUNCTIONS.sendResponse(res, 404, {
                    success: false,
                    msg: 'insertion failed'
                })
            }
        })


    
    
    
    }
}
});

//End point for finding Cheque Details by cheque No
router.post('/fetchChequeDetailsByChequeNo', async function (req, res, next) {
    var request = req.body;
    var chequeNo = request.chequeNo;
    var userId = request.userId;

    //fetch cheque Entry details by cheque number
    var bankChequeEntry = await
    models.BankChequeEntry.findOne({
        where: {
            chequeNumber: chequeNo,
            userId: userId
        }

    }).then(function (bankChequeEntry) {
        if (bankChequeEntry == null) {
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'Data not found'
            })
        } else {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                bankChequeEntry: bankChequeEntry
            })
        }

    }).catch(function (exception) {
        //error logger
        FUNCTIONS.ErrorLogger("Error in fetchChequeDetailsByChequeNo " + exception.stack);
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: exception
        })
    });

})

//End point for check the given cheque no is printed or not
router.post('/checkChequeNoAlreadyPrintedOrNot', async function (req, res, next) {
    var request = req.body;
    var chequeNo = request.chequeNo;
    var userId = request.userId;

    //fetch cheque entry details by cheque number
    var bankChequeEntry = await
    models.BankChequeEntry.findOne({
        where: {
            chequeNumber: chequeNo,
            userId: userId
        }

    }).then(function (bankChequeEntry) {
        //if cheque entry found that printed otherwise Not-Printed
        if (bankChequeEntry == null) {
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'Not-Printed'
            })
        } else {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Printed'
            })
        }

    }).catch(function (exception) {
        //error logger
        FUNCTIONS.ErrorLogger("Error in checkChequeNoAlreadyPrintedOrNot " + exception.stack);
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: exception
        })
    });

})




//end point for Save bulk print cheque
router.post('/saveBulkPrintChq', async function (req, res, next) {
    var request = req.body;

    //Request parameters
    var bulkPrintData = request.bulkPrintData;
    var userId = request.userId;

    //fetch User Current plan
    var userCurrentPlan = await FUNCTIONS.getUserCurrentPlan(userId);
    var currentlyPrintCount = 0;
    if (userCurrentPlan != null) {
        currentlyPrintCount = userCurrentPlan.noOfPrintDoneCurrently;
    }

    //check max Print allowed limit 
    if(Number(userCurrentPlan.noOfPrintDoneCurrently)>=Number(userCurrentPlan.noOfPrintAllowed)){
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'You Reach at your maximum limit now you can not Print. Please contact to the Admin for more Query.'
        });

        //check that given bulk print count is allowed or not
        //(for ex. max limit is 100 and current print-90 and bulk print of 15 cheque is given 
        //then This will cross the max limit so send the response as you can print only 10 cheque)
    }else if(Number(userCurrentPlan.noOfPrintDoneCurrently)+bulkPrintData.length>Number(userCurrentPlan.noOfPrintAllowed)){
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'You Can only Print'+Number(userCurrentPlan.noOfPrintAllowed)-Number(userCurrentPlan.noOfPrintDoneCurrently)+' if any Query Please contact to the Admin.'
        });
    }else{

        return sequelize.transaction(async function (t) {
            for (var i = 0; i < bulkPrintData.length; i++) {
                await
                models.BankChequeEntry.create({
                    chequeNumber: bulkPrintData[i].chequeNo,
                    payeeName: bulkPrintData[i].payeeName,
                    chequeAmount: bulkPrintData[i].chequeAmt,
                    chequeDate: bulkPrintData[i].chequeDate,
                    remark: bulkPrintData[i].remark,
                    chequeType: bulkPrintData[i].acPayee,
                    bankChequeBookId: bulkPrintData[i].bankChequeBookId,
                    chequeStatus: "Proceed",
                    printType: "ChequeBook",
                    userId: userId
    
                }, {
                    transaction: t
                });
            }
    
    
            //update user plan i.e no of print done currently
            await
            models.UserPlan.update({
                noOfPrintDoneCurrently: Number(currentlyPrintCount) + bulkPrintData.length
    
            }, {
                where: {
                    userId: userId,
                    isThisLatestPlan: true
                }
            })
    
            var bankChequeBookDetails = await FUNCTIONS.getModelDetailsById(bulkPrintData[0].cbId, models.BankChequeBook);
            var unusedChequeCount = bankChequeBookDetails.numberOfUnusedLeaves;
            var unusedCount = Number(unusedChequeCount) - bulkPrintData.length;
            await
            models.BankChequeBook.update({
                numberOfUnusedLeaves: unusedCount
    
            }, {
                where: {
                    id: bulkPrintData[0].cbId
                }
            }, {
                transaction: t
            })
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Print successfully!!!'
            })
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in save bulk cheque " + exception.stack);
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: exception.msg
                });
            } else {
                FUNCTIONS.sendResponse(res, 404, {
                    success: false,
                    msg: 'insertion failed'
                })
            }
        })
    
    }

});

//end point to check print is allowed or not
router.get('/checkPrintIsAllowedOrNot/:userId',async function(req,res,next){

    var request=req.params;
    var userId=request.userId;

    var userCurrentPlan = await FUNCTIONS.getUserCurrentPlan(userId);

    if(Number(userCurrentPlan.noOfPrintDoneCurrently)>=Number(userCurrentPlan.noOfPrintAllowed)){
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'You Reach at your maximum limit now you can not Print. Please contact to the Admin for more Query.'
        });
    }else{
        FUNCTIONS.sendResponse(res,200,{success:true,msg:'PrintAllowed'});
    }

});

module.exports = router;