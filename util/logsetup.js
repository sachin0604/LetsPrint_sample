//Generate daily logger using winston
// more info @ https://www.npmjs.com/package/winston-daily-rotate-file
var winston = require('winston');
require('winston-daily-rotate-file');
var moment_timezone = require('moment-timezone');
var CONSTANTS = require('./constantBackend');

// Make Daily Info Logger 
var infoTransport = new winston.transports.DailyRotateFile({
    name: 'info-file',
    filename: CONSTANTS.LOG_INFO_DIR_PATH, //path for generate info file which is global variable declaration inside constant file
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'info',
    maxsize: 1024 * 1024 * 5, //5mb
    maxFiles: 5,
    maxDays: 1, //0- no files will be deleted
    json: false,// true-make file data in json format
    timestamp: function () {
        return moment_timezone(Date.now()).tz(CONSTANTS.APP_TIME_ZONE).format('YYYY-MM-DD HH:mm:ss');
        //return Date.now();  
    }
});

// Make Daily Error Logger 
var errorTransport = new winston.transports.DailyRotateFile({
    name: 'error-file',
    filename: CONSTANTS.LOG_ERROR_DIR_PATH,
    datePattern: 'yyyy-MM-dd.',
    maxsize: 1024 * 1024 * 5, //5mb
    maxFiles: 5,
    maxDays: 1, //0- no files will be deleted
    prepend: true,
    level: 'error',
    json: false
    // timestamp: function() {
    //     return moment_timezone(Date.now()).tz(APP_TIME_ZONE).format('YYYY-MM-DD HH:mm:ss');
    //     //return Date.now();
    // }
});


module.exports = {
    winstonLogger: new (winston.Logger)({
        transports: [
            infoTransport,
            errorTransport,
        ]
        // exceptionHandlers: [
        //     //new winston.transports.File({ filename: LOG_EXCEPTION_FILE_PATH })
        // ]
    })
}


