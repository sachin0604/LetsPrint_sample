var express = require('express');
var router = express.Router();
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;
var moment = require('moment');


//End point for cancelled check report
router.post('/fetchCancelChequeReport', async function (req, res, next) {
    var request = req.body;
    var bankAccountId = request.bankAccountId;
    var userId=request.userId;
    var cancelledChqList = [];

    //Manual Entry Report
    if (bankAccountId == -1) {
        await
            models.BankChequeEntry.findAll({
                where: {
                    chequeStatus: "Cancelled",
                    printType: "Manual",
                    userId:userId
                    //bankChequeBookId: chqBookList[i].id
                }
            }).then(function (ChqList) {
                if (ChqList != null) {
                    //cancelledChqList.push(ChqList);
                    cancelledChqList=ChqList;
                    //printedChqList=ChqList;
                }
                FUNCTIONS.sendResponse(res, 200, { success: true, cancelledChqList: cancelledChqList });
            }).catch(function (exception) {
                // throw exception;
                //error logger
                FUNCTIONS.ErrorLogger("Error in fetchCancelChequeReport " + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
            })
    } else {
        var chqBookList = await
            models.BankChequeBook.findAll({

                where: {
                    bankAccountId: bankAccountId,
                    userId:userId
                }
            }).then(async function (chqBookList) {
                if (chqBookList == null) {
                    FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Book  not found' });
                } else {

                    for (var i = 0; i < chqBookList.length; i++) {

                        var ChqList = await FUNCTIONS.fetchChequeEntryListByCBIdAndStatus(chqBookList[i].id, "Cancelled");
                        if (ChqList.length != 0) {
                           // cancelledChqList.push(ChqList);
                           cancelledChqList=ChqList;
                        }


                        // await
                        // models.BankChequeEntry.findAll({
                        //     where:{
                        //         chequeStatus: "Cancelled"
                        //         //bankChequeBookId: chqBookList[i].id
                        //     }
                        // }).then(function(ChqList){
                        //     if(ChqList!= null){
                        //         cancelledChqList.push(ChqList);
                        //     }
                        // }).catch(function(exception){
                        //     throw exception;
                        // })
                    }
                }
                FUNCTIONS.sendResponse(res, 200, { success: true, cancelledChqList: cancelledChqList });
            }).catch(function (exception) {
                //error logger
                FUNCTIONS.ErrorLogger("Error in fetchCancelChequeReport " + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
            });
    }


});

//End point for Printed check report
router.post('/fetchPrintedChequeReport', async function (req, res, next) {
    var request = req.body;
    var userId=request.userId;
    var bankAccountId = request.bankAccountId;
    var printedChqList = [];

    //Manual Cheque Print
    if (bankAccountId == -1) {

        await
            models.BankChequeEntry.findAll({
                where: {
                    chequeStatus: "Proceed",
                    printType: "Manual",
                    userId:userId
                    //bankChequeBookId: chqBookList[i].id
                }
            }).then(function (ChqList) {
                if (ChqList != null) {
                    printedChqList.push(ChqList);
                    //printedChqList=ChqList;
                }
                FUNCTIONS.sendResponse(res, 200, { success: true, printedChqList: printedChqList });
            }).catch(function (exception) {
                // throw exception;
                //error logger
                FUNCTIONS.ErrorLogger("Error in fetchPrintedChequeReport " + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
            })
    } else {
        //Cheque Entry By Account Id
        var chqBookList = await
            models.BankChequeBook.findAll({

                where: {
                    bankAccountId: bankAccountId,
                    userId:userId
                }
            }).then(async function (chqBookList) {
                if (chqBookList == null) {
                    FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Book  not found' });
                } else {

                    for (var i = 0; i < chqBookList.length; i++) {
                        var ChqList = await FUNCTIONS.fetchChequeEntryListByCBIdAndStatus(chqBookList[i].id, "Proceed")
                        if (ChqList != null) {
                            printedChqList.push(ChqList);
                        }

                        // await
                        // models.BankChequeEntry.findAll({
                        //     where:{
                        //         chequeStatus: "Proceed"
                        //         //bankChequeBookId: chqBookList[i].id
                        //     }
                        // }).then(function(ChqList){
                        //     if(ChqList!= null){
                        //         printedChqList.push(ChqList);
                        //     }
                        // }).catch(function(exception){
                        //     throw exception;
                        // })
                    }
                }
                FUNCTIONS.sendResponse(res, 200, { success: true, printedChqList: printedChqList });
            }).catch(function (exception) {
                //error logger
                FUNCTIONS.ErrorLogger("Error in fetchPrintedChequeReport " + exception.stack);
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
            });
    }


});

//End point for Cheque Book Summary  report
router.post('/fetchChequeBookSummaryReport', async function (req, res, next) {
    var request = req.body;
    var bankAccountId = request.bankAccountId;
    var userId=request.userId;
    
    var chqBookList = await
        models.BankChequeBook.findAll({

            where: {
                id: bankAccountId,
                userId:userId
            }
        }).then(async function (chqBookList) {
            if (chqBookList == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Record   not found' });
            } else {
                var chequeSummaryReport = [];
                for (var i = 0; i < chqBookList.length; i++) {
                    var chequeBookData = {};
                    chequeBookData.seriesNo = chqBookList[i].chequeBookName;
                    chequeBookData.chequeBookId = chqBookList[i].id;
                    chequeBookData.totalLeaves = chqBookList[i].numberOfLeaves;
                    chequeBookData.unusedLeaves = chqBookList[i].numberOfUnusedLeaves;

                    // await
                    // models.BankChequeEntry.findAll({
                    //     where:{
                    //         chequeStatus: "Proceed",
                    //         bankChequeBookId: chqBookList[i].id
                    //     }
                    // }).then(function(chqList){
                    //     if(chqList!= null){
                    //         chequeBookData.printedLeaves=chqList.length;
                    //         chequeBookData.cancelledLeaves=chqBookList[i].numberOfLeaves-chqBookList[i].numberOfUnusedLeaves-chqList.length;
                    //     }else{
                    //         chequeBookData.printedLeaves=0;
                    //         chequeBookData.cancelledLeaves=chqBookList[i].numberOfLeaves-chqBookList[i].numberOfUnusedLeaves; 
                    //     }
                    // }).catch(function(exception){
                    //     throw exception;
                    // })
                    var printedChequeList = [];
                    printedChequeList = await FUNCTIONS.fetchChequeEntryListByCBIdAndStatus(chqBookList[i].id, "Proceed");

                    chequeBookData.printedLeaves = printedChequeList.length;
                    chequeBookData.cancelledLeaves = chqBookList[i].numberOfLeaves - chqBookList[i].numberOfUnusedLeaves - printedChequeList.length;

                    chequeSummaryReport.push(chequeBookData);
                }
            }
            FUNCTIONS.sendResponse(res, 200, { success: true, chequeSummaryReport: chequeSummaryReport });
        }).catch(function (exception) {
             //error logger
             FUNCTIONS.ErrorLogger("Error in fetchChequeBookSummaryReport " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});

//End point for Cheque Entry  report
router.post('/fetchChequeEntryReport', async function (req, res, next) {
    var request = req.body;
    var cbId = request.cbId;
    var userId=request.userId;

    var chequeBookDetails = await FUNCTIONS.getModelDetailsById(cbId, models.BankChequeBook);
    var chequeBookEntryDetails = await FUNCTIONS.getAllChequeNumberListFromCB(chequeBookDetails.startChequeNumber, chequeBookDetails.endChequeNumber,userId)

    if (chequeBookEntryDetails.length == 0) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Record   not found' });
    } else {
        FUNCTIONS.sendResponse(res, 200, { success: true, chequeBookEntryDetails: chequeBookEntryDetails });
    }

});

module.exports = router;