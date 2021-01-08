var express = require('express');
var router = express.Router();
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');

//End Point for Save Cheque Template start here
router.post('/saveChequeTemplate', async function (req, res, next) {
    var request = req.body;
    //Request Parameters
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
    var userId=request.userId;

    const Op = sequelize.Op;

    if (FUNCTIONS.isNullOrEmpty(bankId) || FUNCTIONS.isNullOrEmpty(templateName)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Fields cannot be empty'
        });
    } else {
        return sequelize.transaction(async function (t) {
            //Check the name already exist or not
            var chqTemplate = await
            models.BankCbTemplateDesign.findOne({
                where: {
                    templateName: {
                        [Op.iLike]: templateName
                    },
                    userId:userId

                }
            }).then(function (chqTemplate) {
                return chqTemplate;
            }).catch(function (exception) {
                throw {
                    msg: 'something went wrong'
                }
            });
            //if cheTemplate is not null then send response as template name already exist
            //if null then create the entry
            if (chqTemplate == null) {
                var chqTemplate = await
                models.BankCbTemplateDesign.create({
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
                }, {
                    transaction: t
                });
            } else {
                throw {
                    msg: 'Template name is already exist'
                }
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Inserted Successfully'
            });
        }).catch((exception) => {
            //error logger
            FUNCTIONS.ErrorLogger("Error in Save cheque template " + exception.stack);
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

})
//End Point for Save Cheque Template end here


//End point for update cheque Template
router.post('/updateChqTemplate', async function (req, res, next) {
    var request = req.body;
    //Request parameters
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
    var chqTemplateId = request.chequeTemplateId;
    var userId=request.userId;

    const Op = sequelize.Op;
    if (FUNCTIONS.isNullOrEmpty(bankId) || FUNCTIONS.isNullOrEmpty(templateName) || FUNCTIONS.isNullOrEmpty(chqTemplateId)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Fields cannot be empty'
        })
    } else {
        return sequelize.transaction(async function (t) {

            //check given id is valid or not
            //if result is null then id given for update is invalid
            var chqTemplate = await
            models.BankCbTemplateDesign.findOne({
                where: {
                    id: chqTemplateId,
                    userId:userId
                }
            }).then(function (chqTemplate) {
                return chqTemplate;
            }).catch(function (exception) {
                throw {
                    msg: exception
                }
            })
            if (chqTemplate == null) {
                throw {
                    msg: 'invalid Cheque Template Id'
                }
            } else {
                //check template name already exist or not by comparing template name with other entries
                var chqTemplate = await
                models.BankCbTemplateDesign.findOne({
                    where: {
                        templateName: {
                            [Op.iLike]: templateName
                        },
                        id: {
                            [Op.notIn]: [chqTemplateId]
                        },
                        userId:userId
                    }
                }).then(function (chqTemplate) {
                    return chqTemplate;
                }).catch(function (exception) {
                    throw {
                        msg: 'Something went wrong'
                    }
                })
                if (chqTemplate == null) {
                    var chqTemplate = await
                    models.BankCbTemplateDesign.update({

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
                        chqTemplateId: chqTemplateId
                        

                    }, {
                        where: {
                            id: chqTemplateId,
                            userId:userId
                        }
                    }, {
                        transaction: t
                    });
                } else {
                    throw {
                        msg: 'Template Name is already exists'
                    }
                }
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Successfully Updated'
            })
        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in update cheque template " + exception.stack);

            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: exception.msg
                })
            } else {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: 'Something went wrong'
                })
            }
        })
    }
})

//End point for fetch cheque template list
router.get('/fetchChqTemplateList/:userId', async function (req, res, next) {
    var request=req.params;
    var userId=request.userId;
    
    //fetch cheque Template design for logged in user
    //userId=-1 mean default cheque template    (all user can access that template)
    var chqTemplate = await
        models.BankCbTemplateDesign.findAll({
            where:{
               // userId:userId
               userId:{
                [Op.or]: [userId, -1]
            }
            },
            include:[
                {
                    model:models.Bank,
                    as: 'bank',
                    attributes:['shortName']
                }
            ]

        }).then(function (chqTemplate) {
            if (chqTemplate == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No cheque Template found' })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, chqTemplate: chqTemplate });

            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error fetching template list " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
        })


});

//End Point for fetch cheque Template By Id
router.get('/fetchChqTemplateById/:chqTemplateId', async function (req, res, next) {
    var request = req.params;
    var chqTemplateId = request.chqTemplateId;

    //fetch chequeTemplateDesign By id
    var chqTemplate=await
    models.BankCbTemplateDesign.findOne({

       where: {
           id: chqTemplateId
       }
   }).then(function (chqTemplate) {
       if (chqTemplate == null) {
           FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Cheque Template not found' });
       } else {
           FUNCTIONS.sendResponse(res, 200, { success: true, chqTemplate: chqTemplate });
       }

   }).catch(function (exception) {
       //error logger
       FUNCTIONS.ErrorLogger("Error fetching cheque template by template id " + exception.stack);
       FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
   });

});



//End Point for fetch cheque Template By Bank Id
router.post('/fetchChqTemplateByBankId', async function (req, res, next) {
    var request = req.body;
    var bankId = request.bankId;
    var userId=request.userId;
    
    //fetch cheque template by bank id for logged in user
    var chqTemplate=await
    models.BankCbTemplateDesign.findAll({

       where: {
           bankId: bankId,
           userId:userId
       }
   }).then(function (chqTemplate) {
       if (chqTemplate == null) {
           FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Template not found' });
       } else {
           FUNCTIONS.sendResponse(res, 200, { success: true, chqTemplate: chqTemplate });
       }

   }).catch(function (exception) {
       //error logger
       FUNCTIONS.ErrorLogger("Error fetching cheque template by bank id " + exception.stack);
       FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
   });

});


//End Point for fetch cheque Template By Cheque Book Id
router.post('/fetchChqTemplateByCBId', async function (req, res, next) {
    var request = req.body;
    var chqBookId = request.chqBookId;
    var userId=request.userId;
    
    //fetch Bank Cheque Book Details By id
    var bankChqBookDetails = await FUNCTIONS.getModelDetailsById(chqBookId,models.BankChequeBook)

    //fetch BankAccount details by accountid
    var bankAccountDetails = await FUNCTIONS.getModelDetailsById(bankChqBookDetails.bankAccountId,models.BankAccount)

    var bankId=bankAccountDetails.bankId;

    //Now fetching template details by bank id for logged in user
    var chqTemplate=await
    models.BankCbTemplateDesign.findOne({

       where: {
           bankId: bankId,
           userId:userId
       }
   }).then(function (chqTemplate) {
       if (chqTemplate == null) {
           FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Chq Template not found' });
       } else {
           FUNCTIONS.sendResponse(res, 200, { success: true, chqTemplate: chqTemplate });
       }

   }).catch(function (exception) {
       //error logger
       FUNCTIONS.ErrorLogger("Error fetching Cheque Template by CBID " + exception.stack);
       FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
   });

});
module.exports = router;