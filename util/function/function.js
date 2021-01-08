//var request = require('request');
var extend = require('xtend');
var models = require('../../models');

var LOGSETUP = require('../logsetup');
//var moment = require('moment');
//Boolean varaible declaration
var isInfoLoggingEnabled = true, isErrLoggingEnabled = true, isSCLoggingEnabled = true;



var toJSONString = function (object) {
    return JSON.stringify(object);
};

var equalsIgnoreCase = function (value1, value2) {
    if ((value1 != undefined && value1 !== null) && (value2 != undefined && value2 !== null)) {
        value1 = value1.toUpperCase();
        value2 = value2.toUpperCase();
        return value1 == value2;
    }
};

var isArray = function (object) {
    if (Object.prototype.toString.call(object) === '[object Array]') {
        return true;
    } else {
        return false;
    }
};

var isString = function (object) {
    if (typeof object === 'string') {
        return true;
    } else {
        return false;
    }
};

var isBoolean = function (object) {
    if (typeof object === 'boolean') {
        return true;
    } else {
        return false;
    }
};

var isNumber = function (object) {
    if (typeof object === 'number') {
        return true;
    } else {
        return false;
    }
};

var isEmptyArray = function (object) {
    if (object == undefined)
        return true;
    if (isArray(object)) {
        if (object.length == 0) {
            return true;
        } else {
            return false;
        }
    }
};

var isNullOrEmpty = function (stringValue) {
    if (isString(stringValue)) {
        if (stringValue == null || stringValue == '' || stringValue == undefined) {
            return true;
        }
    } else {
        if (stringValue == null || stringValue == undefined) {
            return true;
        }
    }

    return false;
};

var sendResponse = function (res, statusCode, json) {
    res.status(statusCode).json(json);
};



var getMaxValue = function (value1, value2) {
    if (value1 > value2) {
        return value1;
    } else {
        return value2;
    }
};


//value1 = id, value2 = model name
var getModelDetailsById = function (id, modelName) {
    return modelName.findOne({
        where: {
            id: id
        }
    }).then((resultData) => {
        return resultData == null ? null : resultData;
    }).catch((exception) => {
        throw exception;
    });
}

//get cheque details by cheque no and userId
var getChequeDetailsByChequeNo=function(chequeNo,userId) {
    return models.BankChequeEntry.findOne({
        where: {
            chequeNumber: chequeNo,
            userId:userId
        }

    }).then(function (bankChequeEntry) {
        return bankChequeEntry == null ? null : bankChequeEntry;

    }).catch(function (exception) {
        throw exception;
    });

}

   //fetching all cheque book by userId
   var fetchAllChequeBookList=function(userId){
    return  models.BankChequeBook.findAll({
        where:{
            userId:userId
        }

      }).then(function(bankChequeBookList){
          return bankChequeBookList;
      }).catch(function(exception){
          throw exception;
      })
  }
 
  //get cheque book details by cheque no and userId
var getChequeBookDetailsByChequeNo=async function(chequeNo,userId){
    var chequeNo = Number(chequeNo);
    var bankChequeBook=null;
    var bankChequeBookList=await fetchAllChequeBookList(userId);
    for(var i=0;i<bankChequeBookList.length;i++){
        var startChqNumber = Number(bankChequeBookList[i].startChequeNumber);
        var endChqNumber = Number(bankChequeBookList[i].endChequeNumber)
        if(chequeNo>=startChqNumber && chequeNo<=endChqNumber){
            return bankChequeBookList[i];
        }

    }

    return bankChequeBook;

}

//function to get all(i.e Printed or Cancelled) cheque list from a cheque book
var getAllChequeNumberListFromCB=async function(startChqNumber, endChqNumber,userId){
    var chequeEntryList=[];

    for( var i=Number(startChqNumber);i<=Number(endChqNumber);i++){
        var chqNo=i+"";//convert chq no into String

        //manage cheque length if it less than 6 then padding the zero initially and make length as 6
        while(chqNo.length!=6){
            chqNo="0"+chqNo;
        }
        await
         models.BankChequeEntry.findOne({
            where:{
                chequeNumber:chqNo,
                userId:userId
            }

        }).then(function(bankChequeEntry){
           // return bankChequeEntry;
           if(bankChequeEntry!=null){
            chequeEntryList.push(bankChequeEntry);
        }
        }).catch(function(exception){
            throw exception;
        })

    }

    return chequeEntryList;
}
//function to get used cheque numbers from a chequeBook
var getUsedChequeNumberListFromCB=async function(startChqNumber, endChqNumber,userId){
    var usedChequeNoList=[];

    //check Cheque number that is used or unused
    for( var i=Number(startChqNumber);i<=Number(endChqNumber);i++){
        var chqNo=i+"";

        //manage the length of  cheque number
        while(chqNo.length !=6){
            chqNo="0"+chqNo;
        }
        await
         models.BankChequeEntry.findOne({
            where:{
                chequeNumber:chqNo,
                userId:userId
            }

        }).then(function(bankChequeEntry){
           // return bankChequeEntry;
           if(bankChequeEntry!=null){
            usedChequeNoList.push(chqNo);
        }
        }).catch(function(exception){
            throw exception;
        })

    }

    return usedChequeNoList;
}
//function for unused cheque number list
var getUnusedChqNumberList = async function(startChqNumber, endChqNumber,userId){
    var unusedChequeNoList=[];

    for( var i=Number(startChqNumber);i<=Number(endChqNumber);i++){
        var chqNo=i+"";
        while(chqNo.length!=6){
            chqNo="0"+chqNo;
        }
        await
         models.BankChequeEntry.findOne({
            where:{
                chequeNumber:chqNo,
                userId:userId
            }

        }).then(function(bankChequeEntry){
           // return bankChequeEntry;
           if(bankChequeEntry==null){
            unusedChequeNoList.push(chqNo);
        }
        }).catch(function(exception){
            throw exception;
        })

    }

    return unusedChequeNoList;
}

//function to get cheque book details by cbId
var fetchChequeBookDetailsByCBId=async function(cbId){

    return models.BankChequeBook.findOne({
        where:{
            id:cbId
        }
    }).then(function(bankChequeBook){
        return bankChequeBook;
    }).catch(function(exception){
        throw exception;
    })
}
//function to get  cheque Entry List by cheque Book id
var fetchChequeEntryListByCBIdAndStatus=async function(cbId,status){

    var bankChequeBook=await fetchChequeBookDetailsByCBId(cbId);

    var chequeEntryList=[];

    for( var i=Number(bankChequeBook.startChequeNumber);i<=Number(bankChequeBook.endChequeNumber);i++){
        var chqNo=i+"";
        //manage the cheque length
        while(chqNo.length!=6){
            chqNo="0"+chqNo;
        }
        await
         models.BankChequeEntry.findOne({
            where:{
                chequeNumber:chqNo,
                chequeStatus:status, //Canncelled or proceed status
                userId:bankChequeBook.userId
            }

        }).then(function(bankChequeEntry){
           // return bankChequeEntry;
           if(bankChequeEntry!=null){
            chequeEntryList.push(bankChequeEntry);
        }
        }).catch(function(exception){
            throw exception;
        })

        

}
return chequeEntryList;

}

//encrypt the password
var getEncryptedPassword = function (password) {

    const cipher = crypto.createCipher(CONSTANTS.CIPHER_ALGO_NAME, CONSTANTS.CIPHER_PASSWORD);
    var encrypted = cipher.update(password, CONSTANTS.CIPHER_INPUT_ENCODING, CONSTANTS.CIPHER_OUTPUT_ENCODING);
    encrypted += cipher.final(CONSTANTS.CIPHER_OUTPUT_ENCODING);
    return encrypted;

};

//Error and info logger
var InfoLogger = function (message) {
    if (isInfoLoggingEnabled) {
        LOGSETUP.winstonLogger.info(message);
    }
};

var ErrorLogger = function (message) {
    if (isErrLoggingEnabled) {
        LOGSETUP.winstonLogger.error(message);
    }
};

//get user current plan by id
var getUserCurrentPlan=async function(userId){

    var userCurrentPlan=await
    models.UserPlan.findOne({
        where:{
            userId:userId,
            isThisLatestPlan:true
        }
    })

    return userCurrentPlan;
}

exports.InfoLogger=InfoLogger;
exports.ErrorLogger=ErrorLogger;

exports.fetchChequeEntryListByCBIdAndStatus = fetchChequeEntryListByCBIdAndStatus;
exports.getChequeDetailsByChequeNo = getChequeDetailsByChequeNo;
exports.getModelDetailsById = getModelDetailsById;
exports.getUnusedChqNumberList=getUnusedChqNumberList;
exports.fetchAllChequeBookList=fetchAllChequeBookList;
exports.getChequeBookDetailsByChequeNo=getChequeBookDetailsByChequeNo;
exports.getUsedChequeNumberListFromCB=getUsedChequeNumberListFromCB;
exports.getAllChequeNumberListFromCB=getAllChequeNumberListFromCB;
exports.getUserCurrentPlan=getUserCurrentPlan;
//getting encrypted password
exports.getEncryptedPassword = getEncryptedPassword;

//Globally Declare Function to convert json data into String
exports.toJSONString = toJSONString;

exports.equalsIgnoreCase = equalsIgnoreCase;

exports.isArray = isArray;

exports.isString = isString;

exports.isBoolean = isBoolean;

exports.isNumber = isNumber;

exports.isEmptyArray = isEmptyArray;

exports.isNullOrEmpty = isNullOrEmpty;

exports.sendResponse = sendResponse;

exports.getMaxValue=getMaxValue;
