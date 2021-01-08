var express = require('express');
var router = express.Router();
var models = require('../../models');
//var FUNCTIONS = require('../../util/functions/function');
var FUNCTIONS = require('../../util/function/function');
var sequelize = models.sequelize;
var extend = require('xtend');
const Op = sequelize.Op;
var moment = require('moment');

//Save User Details
router.post('/saveUserdetails', async function (req, res, next) {
    var request = req.body;
    //Request parameters to save user
    var name = request.name;
    var mobileNo = request.mobileNo;
    var emailId = request.emailId;
    var address = request.address;
    var password = request.password;
    var planId = request.planId;
    var payStatus = request.payStatus;

    if (FUNCTIONS.isNullOrEmpty(mobileNo)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Mobile number can not be empty'
        });
    } else if (FUNCTIONS.isNullOrEmpty(password)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Password can not be empty'
        });
    } else {

        return sequelize.transaction(async function (t) {

            //to check given email id or mobile number already exist or not
            if (emailId != "") {
                // if email id is given
                var userDetails = await
                models.UserDetails.findOne({
                    where: {
                        [Op.or]: [{
                            mobile: mobileNo

                        }, {
                            emailId: emailId
                        }]
                        // mobile:mobileNo
                    }

                }).then(function (userDetails) {
                    return userDetails;

                }).catch(function (exception) {
                    throw exception;
                })
            } else {
                // if email id is not given
                var userDetails = await
                models.UserDetails.findOne({
                    where: {
                        mobile: mobileNo
                        // mobile:mobileNo
                    }

                }).then(function (userDetails) {
                    return userDetails;

                }).catch(function (exception) {
                    throw exception;
                })
            }


            if (userDetails != null) {
                // if user deatails found at that given mobile number or email id
                throw {
                    msg: 'Mobile Number Or EmailId Already exist'
                }
            } else {
                //if user details not found 
                var userDetails = "";
                //if payment is done thebn pay status comes as true
                //if paystatus is true then assign accessStatus as true
                if (payStatus=="true") {

                    userDetails = await
                    models.UserDetails.create({
                        
                        name: name,
                        mobile: mobileNo,
                        emailId: emailId,
                        password: password,
                        address: address,
                        accessStatus: true,
                        activeStatus: true,
                        planId: planId

                    }, {
                        transaction: t
                    });


                } else {
                    //if payment is not done then pay status comes as false
                    //if paystatus is false then assign accessStatus as false 
                    //if access Status is false that mean user can only login but can't print
                    userDetails = await
                    models.UserDetails.create({
                        name: name,
                        mobile: mobileNo,
                        emailId: emailId,
                        password: password,
                        address: address,
                        accessStatus: false,
                        activeStatus: true,
                        planId: planId

                    }, {
                        transaction: t
                    });
                }

                //fetching plan and userDetails to create User Plan entry
                var plan = await FUNCTIONS.getModelDetailsById(planId, models.Plan);
                // finding end date of plan by adding duration in current date   //duration store in plan entity
                var planEndDate = moment().add(plan.duration, 'days');


                await
                models.UserPlan.create({
                    userId: userDetails.id,
                    planId: planId,
                    noOfPrintAllowed: plan.noOfPrint,
                    noOfAccountAllowed: plan.noOfAccount,
                    noOfPrintDoneCurrently: 0,
                    noOfAccountAddedCurrently: 0,
                    activationDate: moment(),
                    planEndDate: planEndDate,
                    isThisLatestPlan: true

                }, {
                    transaction: t
                });


            }

        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Inserted Successfully'
            });
        }).catch(function (exception) {
            //error logger
            if (exception.msg != undefined) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: exception.msg
                });
                FUNCTIONS.ErrorLogger("Error in Save User " + exception.msg);
            } else {
                FUNCTIONS.sendResponse(res, 404, {
                    success: false,
                    msg: 'Inserted Failed'
                });
                FUNCTIONS.ErrorLogger("Error in Save User " + exception.stack);
            }
        })

    }

});

//update User personal Details
router.post('/updateUserpersonalDetails', async function (req, res, next) {

    var request = req.body;

    var userId = request.userId;
    var name = request.name;
    var mobileNo = request.mobileNo;
    var emailId = request.emailId;
    var address = request.address;
    var password = request.password;

    if (FUNCTIONS.isNullOrEmpty(mobileNo)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Mobile number can not be empty'
        })
    } else if (FUNCTIONS.isNullOrEmpty(password)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Password can not be empty'
        });
    } else if (FUNCTIONS.isNullOrEmpty(userId)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'UserId can not be empty'
        });
    } else {

        models.UserDetails.findOne({
            where: {
                id: userId
            }
        }).then(function (userDetails) {
            if (userDetails == null) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: 'Invalid user Id'
                })
            } else {
                models.UserDetails.findOne({
                    where: {
                        mobile: {
                            [Op.iLike]: mobileNo
                        },
                        id: {
                            [Op.notIn]: [userId]
                        }

                    }
                }).then(function (userDetails) {

                    if (userDetails != null) {
                        FUNCTIONS.sendResponse(res, 200, {
                            success: false,
                            msg: 'Mobile Number already exists'
                        });
                    } else {
                        return sequelize.transaction(async function (t) {
                            models.UserDetails.update({
                                name: name,
                                mobile: mobileNo,
                                emailId: emailId,
                                password: password,
                                address: address,
                            }, {
                                where: {
                                    id: userId
                                }
                            }).then(function () {

                            }).catch(function (exception) {
                                throw exception;
                                //FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Somehing went Wrong' })
                            })
                        }).then(function () {
                            FUNCTIONS.sendResponse(res, 200, {
                                success: true,
                                msg: 'Update Successfully'
                            });
                        }).catch(function (exception) {
                            throw exception;
                            //FUNCTIONS.sendResponse(res, 404, { success: true, msg: 'Something went wrong' });
                        });
                    }

                })
            }

        }).catch(function (exception) {
            FUNCTIONS.ErrorLogger("Error in updateUserDetails " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'something went wrong'
            })
        });
    }


})

//update user plan
// here make alraedy exist plan as old plan and create a new entry in user plan entity
router.post('/updateUserPlan', async function (req, res, next) {
    var request = req.body;

    var userId = request.userId;
    var planId = request.planId;
    var payStatus = request.payStatus;

    if (FUNCTIONS.isNullOrEmpty(userId)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'UserId can not be empty'
        })
    } else {
        //checking userId is valid or not
        models.UserDetails.findOne({
            where: {
                id: userId
            }
        }).then(function (userDetails) {
            if (userDetails == null) {
                FUNCTIONS.sendResponse(res, 200, {
                    success: false,
                    msg: 'Invalid user Id'
                })
            } else {

                //update in user details entity
                return sequelize.transaction(async function (t) {
                    // paystatus-true mean payment done then allow all access to user
                    // paystatus-false mean payment not done and not allow to user all access
                    if (payStatus) {
                        models.UserDetails.update({
                            planId: planId,
                            accessStatus: true
                        }, {
                            where: {
                                id: userId
                            }
                        }).catch(function (exception) {
                            throw exception;

                        })
                    } else {
                        models.UserDetails.update({
                            planId: planId,
                            accessStatus: false
                        }, {
                            where: {
                                id: userId
                            }
                        }).catch(function (exception) {
                            throw exception;
                        })
                    }


                    // make old user plan as  not a latest plan 
                    var oldUserPlan = await
                    models.UserPlan.findOne({
                        where: {
                            userId: userId
                        }
                    }).catch(function (exception) {
                        throw exception;
                    })


                    models.UserPlan.update({
                        isThisLatestPlan: false,
                    }, {
                        where: {
                            userId: userId
                        }
                    }).catch(function (exception) {
                        throw exception;
                        //FUNCTIONS.sendResponse(res, 200, { success: false, msg: 'Somehing went Wrong' })
                    })


                    var plan = await FUNCTIONS.getModelDetailsById(planId, models.Plan);

                    // finding end date of plan by adding duration in current date   //duration store in plan entity
                    var planEndDate = moment().add(plan.duration, 'days').calendar();

                    // creating new user plan entry
                    await
                    models.UserPlan.create({
                        userId: userId,
                        planId: planId,
                        noOfPrintAllowed: plan.noOfPrint,
                        noOfAccountAllowed: plan.noOfAccount,
                        noOfPrintDoneCurrently: oldUserPlan.noOfPrintDoneCurrently,
                        noOfAccountAddedCurrently: oldUserPlan.noOfAccountAddedCurrently,
                        activationDate: oldUserPlan.activationDate,
                        planEndDate: oldUserPlan.planEndDate,
                        isThisLatestPlan: true

                    }, {
                        transaction: t
                    });

                }).then(function () {
                    FUNCTIONS.sendResponse(res, 200, {
                        success: true,
                        msg: 'Update Successfully'
                    });
                }).catch(function (exception) {
                    throw exception;
                    //FUNCTIONS.sendResponse(res, 404, { success: true, msg: 'Something went wrong' });
                });

            }

        }).catch(function (exception) {
            //error logger
            FUNCTIONS.ErrorLogger("Error in updatePlan " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'something went wrong'
            })
        })

    }
});

// enable or disable the user depends on their status
router.post('/updateUserActiveStatus', async function (req, res, next) {
    var request = req.body;
    var userId = request.userId;
    if (FUNCTIONS.isNullOrEmpty(userId)) {
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'UserId can not be empty'
        })
    } else {

        return sequelize.transaction(async function (t) {

            var userDetails = await
            models.UserDetails.findOne({
                where: {
                    id: userId
                }
            }).catch(function (exception) {
                throw exception;
            })
            if (userDetails.activeStatus) {
                // if user is active then change their status as a false
                models.UserDetails.update({
                    activeStatus: false

                }).catch(function (exception) {
                    throw exception;
                })
            } else {
                // if user is not active then change their status as a True (make active)
                models.UserDetails.update({
                    activeStatus: false

                }).catch(function (exception) {
                    throw exception;
                })
            }

        }).then(function () {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                msg: 'Successfully update'
            });
        }).catch(function (exception) {
            FUNCTIONS.ErrorLogger("Error in updateUserActiveStatus  " + exception.stack);
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'Something went wrong'
            });
        })
    }
})
// fetch user details by user id
router.get('/fetchUserDetailsByUserId/:userId', async function (req, res, next) {

    var request = req.params;
    var userId = request.userId;

    models.UserDetails.findOne({

        where: {
            id: userId
        }
    }).then(function (userDetails) {
        if (userDetails == null) {
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'Bank not found'
            });
        } else {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                userDetails: userDetails
            });
        }

    }).catch(function (exception) {
        //error logger
        FUNCTIONS.ErrorLogger("Error in fetchUserDetailsByUserId  " + exception.stack);
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Something went wrong'
        });
    });

});

// fetch active user Plan details by user id
router.get('/fetchUserPlanByUserId/:userId', async function (req, res, next) {

    var request = req.params;
    var userId = request.userId;

    models.UserPlan.findOne({

        where: {
            userId: userId,
            isThisLatestPlan: true
        }
    }).then(function (userPlan) {
        if (userPlan == null) {
            FUNCTIONS.sendResponse(res, 200, {
                success: false,
                msg: 'User Plan not found'
            });
        } else {
            FUNCTIONS.sendResponse(res, 200, {
                success: true,
                userPlan: userPlan
            });
        }

    }).catch(function (exception) {
        //error logger
        FUNCTIONS.ErrorLogger("Error in fetchUserDetailsByUserId  " + exception.stack);
        FUNCTIONS.sendResponse(res, 200, {
            success: false,
            msg: 'Something went wrong'
        });
    });

});



module.exports = router;