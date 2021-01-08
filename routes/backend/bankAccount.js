var express = require('express');
var router = express.Router();

var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');

const Op = sequelize.Op;

//End Point For Save Bank Account
router.post('/saveBankAccount', async function (req, res, next) {
    var request = req.body;
    //Request parameters
    var accountHolderName = request.accountHolderName;
    var accountNumber = request.accountNumber;
    var accountType = request.accountType;
    var ifscCode = request.ifscCode;
    var branchCode = request.branchCode;
    var bankAddress = request.bankAddress;
    var minimumBalance = request.minimumBalance;
    var bankId = request.bankId;
    var userId=request.userId;
    userId=Number(userId);
    //Boolean isPrimary=request.isPrimary;


    if (FUNCTIONS.isNullOrEmpty(accountNumber) || FUNCTIONS.isNullOrEmpty(accountHolderName) || FUNCTIONS.isNullOrEmpty(accountType) || FUNCTIONS.isNullOrEmpty(ifscCode) || FUNCTIONS.isNullOrEmpty(branchCode) || FUNCTIONS.isNullOrEmpty(minimumBalance) || FUNCTIONS.isNullOrEmpty(bankId) || FUNCTIONS.isNullOrEmpty(bankAddress)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Please Enter the All feild Data' })
    } else {
        
         return sequelize.transaction(async function (t) {

            //create entry when account number is not exist
            var bankAccount = await
                models.BankAccount.findOne({
                    where: {
                        accountNumber: {
                            [Op.iLike]: accountNumber
                           
                        },
                        userId:userId
                    }, transaction: t
                }).then(function (bankAccount) {
                    return bankAccount;
                }).catch(function (exception) {
                    throw exception;
                });

            if (bankAccount == null) {
                var bankAccount = await
                    models.BankAccount.create({
                        accountHolderName: accountHolderName,
                        accountNumber: accountNumber,
                        accountType: accountType,
                        ifscCode: ifscCode,
                        branchCode: branchCode,
                        bankAddress: bankAddress,
                        minimumBalance: minimumBalance,
                        bankId: bankId,
                        userId:userId

                    }, { transaction: t });

            } else {
                throw { msg: 'Account Number Already exist' };
            }


        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Inserted Successfully' });
        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in saveBankAccount " + exception.stack);

            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg });
            } else {
                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'Inserted Failed' });
            }

        })

    }
});

//End Point for Update Bank Account
router.post('/updateBankAccount', async function (req, res, next) {
    var request = req.body;
    
    //Request parameters
    var bankAccountId = request.bankAccountId;
    var accountHolderName = request.accountHolderName;
    var accountNumber = request.accountNumber;
    var accountType = request.accountType;
    var ifscCode = request.ifscCode;
    var branchCode = request.branchCode;
    var bankAddress = request.bankAddress;
    var minimumBalance = request.minimumBalance;
    var bankId = request.bankId;
    var userId=request.userId;

    //update the bank details when bankAccount id is valid and account number is not already used
    if (FUNCTIONS.isNullOrEmpty(bankAccountId) || FUNCTIONS.isNullOrEmpty(accountNumber) || FUNCTIONS.isNullOrEmpty(accountHolderName) || FUNCTIONS.isNullOrEmpty(accountType) || FUNCTIONS.isNullOrEmpty(ifscCode) || FUNCTIONS.isNullOrEmpty(branchCode) || FUNCTIONS.isNullOrEmpty(minimumBalance) || FUNCTIONS.isNullOrEmpty(bankId) || FUNCTIONS.isNullOrEmpty(bankAddress)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Please Enter the All feild Data' })
    } else {
        return sequelize.transaction(async function (t) {
            var bankAccount = await
                models.BankAccount.findOne({
                    where: {
                        id: bankAccountId,
                        userId:userId
                    }

                }).then(function (bankAccount) {
                    return bankAccount;
                }).catch(function (exception) {
                    throw { msg: exception }
                })

            if (bankAccount == null) {
                throw { msg: 'Invalid BankAccount Id' }
            } else {

                //To check account number is already exist or not by comparing account number with other entries
                var bankAccount = await
                    models.BankAccount.findOne({
                        where: {
                            accountNumber: { [Op.iLike]: accountNumber },
                            id: { [Op.notIn]: [bankAccountId] },
                            userId:userId

                        }

                    }).then(function (bankAccount) {
                        return bankAccount;

                    }).catch(function (exception) {
                        throw { msg: 'Something went Wrong' }
                    })

                if (bankAccount == null) {
                    var bankAccount = await
                        models.BankAccount.update({

                            accountHolderName: accountHolderName,
                            accountNumber: accountNumber,
                            accountType: accountType,
                            ifscCode: ifscCode,
                            branchCode: branchCode,
                            bankAddress: bankAddress,
                            minimumBalance: minimumBalance,
                            bankId: bankId

                        }, {
                                where: {
                                    id: bankAccountId,
                                    userId:userId
                                }
                            },
                            { transaction: t });

                } else {
                    throw { msg: 'Account Number already exist' }
                }
            }

        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'successfully updated' })
        }).catch(function (exception) {
           
            //error logger
            FUNCTIONS.ErrorLogger("Error in updateBankAccount  " + exception.stack);

            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
            }
        });



    }

});

//End Point for fetch Bank Account List  by userId 
router.get('/fetchBankAccountList/:userId', async function (req, res, next) {
    var request=req.params;
    var userId=request.userId;

    //fetching bank Account list by userId
    var bankAccount = await
        models.BankAccount.findAll({
            where:{
                userId:userId
            },
            include:[
                {
                    model:models.Bank,
                    as:'bank',
                    attributes:['shortName']
                }
            ]

        }).then(function (bankAccount) {
            if (bankAccount == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No BankAccount found' })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, bankAccount: bankAccount });

            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchBankAccountList " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
        })


});

//End Point for fetch Bank Account By Id
router.get('/fetchBankAccountById/:bankAccountId', async function (req, res, next) {
    var request = req.params;
    var bankAccountId = request.bankAccountId;

    //fetching account list by account id
    var bankAccount=await
    models.BankAccount.findOne({

       where: {
           id: bankAccountId
       }
   }).then(function (bankAccount) {
       if (bankAccount == null) {
           FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Bank Account not found' });
       } else {
           FUNCTIONS.sendResponse(res, 200, { success: true, bankAccount: bankAccount });
       }

   }).catch(function (exception) {
       //error logger
       FUNCTIONS.ErrorLogger("Error in fetchBankAccountById " + exception.stack);
       FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
   });

});

module.exports = router;