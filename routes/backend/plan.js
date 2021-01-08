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


//End Point for save plan
router.post('/savePlan', async function (req, res, next) {
    //Request Paramenter to insert
    var request = req.body;
    var planName = request.planName;
    var noOfPrint = request.noOfPrint;
    var noOfAccountAllowed = request.noOfAccountAllowed;
    var planCost = request.planCost;
    var duration = request.duration;

    const Op = sequelize.Op;

    if (FUNCTIONS.isNullOrEmpty(planName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Name can not be empty' });
    } else {
        return sequelize.transaction(async function (t) {

            //check plan name already  exist or not if plan details is not null then that mean that plan name is exist
            var plan = await
                models.Plan.findOne({
                    where: {
                        planName: { [Op.iLike]: planName }
                    }
                }).then(function (plan) {

                    return plan;
                    //var planData = extend(plan.dataValues);


                }).catch(function (exception) {
                    throw { msg: 'Something went wrong' }
                });
            if (plan == null) {
                var plan = await
                    models.Plan.create({
                        planName: planName,
                        noOfPrint: noOfPrint,
                        noOfAccount: noOfAccountAllowed,
                        planCost: planCost,
                        duration: duration
                    }, { transaction: t });
            } else {
                throw { msg: 'plan Name Already exist' }
            }
        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, { success: true, msg: 'Inserted Successfully' });
        }).catch((exception) => {
            //error logger
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: exception.msg });
                FUNCTIONS.ErrorLogger("Error in saveBank " + exception.msg);
            } else {
                FUNCTIONS.sendResponse(res, 404, { success: false, msg: 'Inserted Failed' });
                FUNCTIONS.ErrorLogger("Error in saveBank " + exception.stack);
            }

        });
    }
});


//End Point For update Plan
router.post('/updatePlan', async function (req, res, next) {

    var request = req.body;
    //Request parameter for update the plan
    var planId = request.planId;
    var planName = request.planName;
    var noOfPrint = request.noOfPrint;
    var noOfAccountAllowed = request.noOfAccountAllowed;
    var planCost = request.planCost;
    var duration = request.duration;

    const Op = sequelize.Op;
    if (FUNCTIONS.isNullOrEmpty(planName)) {
        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'plan Name can not be empty' })
    } else {

        //check that given id for update is valid or not
        models.Plan.findOne({
            where: {
                id: planId
            }
        }).then(function (plan) {
            if (plan == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Invalid Plan Id' })
            } else {

                //if id is valid then check that given plan Name in request is already exist or not  by comparing with other entries
                models.Plan.findOne({
                    where: {
                        planName: { [Op.iLike]: planName },
                        id: { [Op.notIn]: [planId] }

                    }

                }).then(function (plan) {
                    if (plan == null) {
                        return sequelize.transaction(async function (t) {
                            models.Plan.update({
                                planName: planName,
                                noOfPrint: noOfPrint,
                                noOfAccount: noOfAccountAllowed,
                                planCost: planCost,
                                duration: duration


                            }, {
                                    where: {
                                        id: planId
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
                        FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Plan Name already exists' });
                    }

                }).catch(function (exception) {
                    throw exception;
                    // FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
                })
            }
        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in updatePlan " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'something went wrong' })
        })
    }

});
//End Point for fetch Plan List
router.get('/fetchPlanList', async function (req, res, next) {
    var request = req.body;

    //fetch all plan list
    var planList = await
        models.Plan.findAll({

        }).then(function (planList) {
            if (planList == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'No Plan List found' })
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, planList: planList });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchPlanList " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' })
        })

})

//End Point for fetching Plan by plani Id
router.get('/fetchPlanById/:planId', async function (req, res, next) {

    var request = req.params;
    var planId = request.planId;
    //fetch plan details by id
    var plan = await
        models.Plan.findOne({

            where: {
                id: planId
            }
        }).then(function (plan) {
            if (plan == null) {
                FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Bank not found' });
            } else {
                FUNCTIONS.sendResponse(res, 200, { success: true, plan: plan });
            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in fetchBankById  " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Something went wrong' });
        });

});

module.exports = router;