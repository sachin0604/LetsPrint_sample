var express = require('express');
var router = express.Router();

//require models
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
//require functions
var FUNCTIONS = require('../../util/function/function');

//sequelize instance
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;


//End Point For save Bank
router.post('/saveBank', async function (req, res, next) {
    //Request Paramenter to insert
    var request = req.body;
    var bankName = request.bankName;
    var shortName = request.shortName;
    var userId = request.userId;


    if (FUNCTIONS.isNullOrEmpty(bankName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Name can not be empty' });
    } else {
        return sequelize.transaction(async function (t) {

            //fetching bank by name and userId  if got the result then send response as name already exist
            var bank = await
                models.Bank.findOne({
                    where: {
                        // bankName:{[op.ilike]:bankName}
                        bankName: { [Op.iLike]: bankName },
                        userId: userId
                    }
                }).then(function (bank) {
                    return bank;
                }).catch(function (exception) {
                    throw { msg: 'Something went wrong' }
                });

            //if bank result is null then create bank entry
            if (bank == null) {
                var bank = await
                    models.Bank.create({
                        bankName: bankName,
                        shortName: shortName,
                        userId: userId
                    }, { transaction: t });
            } else {
                throw { msg: 'Bank Name Already exist' }
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Inserted Successfully' });
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in saveBank " + exception.stack);

            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg });
            } else {
                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'Inserted Failed' });
            }

        });
    }
})


//End Point For update Bank
router.post('/updateBank', async function (req, res, next) {

    var request = req.body;

    //Request parameters for update
    var bankId = request.bankId;
    var bankName = request.bankName;
    var shortName = request.shortName;


    if (FUNCTIONS.isNullOrEmpty(bankName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'bank Name can not be empty' })
    } else {
        //find Bank details by id
        models.Bank.findOne({
            where: {
                id: bankId
            }
        }).then(function (bank) {
            //if result is null then send response as invalid id
            if (bank == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Invalid Bank Id' })
            } else {
                //if result is not null then check that name is already exist or not 
                //if exist then send response as name already exist 
                //otherwise update the records
                models.Bank.findOne({
                    where: {
                        bankName: { [Op.iLike]: bankName },
                        id: { [Op.notIn]: [bankId] }

                    }

                }).then(function (bank) {
                    if (bank == null) {
                        return sequelize.transaction(async function (t) {
                            models.Bank.update({
                                bankName: bankName,
                                shortName: shortName
                            }, {
                                where: {
                                    id: bankId
                                }
                            }).then(function () {
                                FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Update Successfully' });
                            }).catch(function (exception) {
                                throw exception;
                                //FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Somehing went Wrong' })
                            })
                        }).then(function () {
                            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Update Successfully' });
                        }).catch(function (exception) {
                            throw exception;
                            //FUNCTIONS.sendResponse(res, 404, { success: true, msg: 'Something went wrong' });
                        });


                    } else {
                        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Bank Name already exists' });
                    }

                }).catch(function (exception) {
                    throw exception;
                    // FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
                })
            }
        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in updateBank " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'something went wrong' })
        })
    }

});

//fetch bank list for logged in user
router.get('/fetchBankList/:userId', async function (req, res, next) {

    //Request parameters
    var request = req.params;
    var userId = request.userId;

    //find all bank list for logged in user
    //fetch bank list by given userId and userId=-1
    //-1 Indicate that default assign bank list to user
    var bank = await
        models.Bank.findAll({
            where: {

                userId: {
                    [Op.or]: [userId, -1]
                }
            },
            // order: [
            //     ['bankName', 'ASC']
            // ]
        }).then(function (bank) {
            if (bank == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No Bank found' })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, bank: bank });

            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchBankList " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
        })

});

//fetch bank Details by bank id
router.get('/fetchBankById/:bankId', async function (req, res, next) {

    var request = req.params;
    var bankId = request.bankId;

    var bank = await
        models.Bank.findOne({
            where: {
                id: bankId
            }
        }).then(function (bank) {
            if (bank == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Bank not found' });
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, bank: bank });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchBankById  " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});
module.exports = router;

