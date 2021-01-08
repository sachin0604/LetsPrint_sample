var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
//   renderPage(req,res,('index');
// });
/* GET manage Bank page. */
router.get('/bank', function (req, res, next) {
  renderPage(req, res, 'bankManagement/manageBank', {
    title: 'Manage Bank'
  });
});
router.get('/payee', function (req, res, next) {
  renderPage(req, res, 'bankManagement/managePayee', {
    title: 'Manage Payee'
  });
});

router.get('/addAccount', function (req, res, next) {
  renderPage(req, res, 'bankManagement/addBankAccount', {
    title: 'Add Account'
  });
});

router.get('/updateAccount', function (req, res, next) {
  renderPage(req, res, 'bankManagement/updateBankAccount', {
    title: 'Update Account'
  });
});

router.get('/manageAccount', function (req, res, next) {
  renderPage(req, res, 'bankManagement/manageBankAccount', {
    title: 'Manage Account'
  });
});

router.get('/manageCB', function (req, res, next) {
  renderPage(req, res, 'bankManagement/manageChequeBook', {
    title: 'Manage Cheque Book'
  });
});

router.get('/manageChqTemplate', function (req, res, next) {
  renderPage(req, res, 'bankManagement/manageChequeTemplate', {
    title: 'Manage Cheque Template'
  });
});

router.get('/addChqTemplate', function (req, res, next) {
  renderPage(req, res, 'bankManagement/addChequeTemplate', {
    title: 'Add Cheque Template'
  });
});
router.get('/updateChqTemplate', function (req, res, next) {
  renderPage(req, res, 'bankManagement/updateChequeTemplate', {
    title: 'Update Cheque Template'
  });
});

router.get('/addChequeBook', function (req, res, next) {
  renderPage(req, res, 'bankManagement/addChequeBook', {
    title: 'Add Cheque Book'
  });
});
router.get('/managePrint', async function (req, res, next) {


  //if max allowed print limit is reach then render on index page otherwise on manage print page

  var sess = req.session;
  var userId = sess.user.userInfo.userId;
  // console.log("UserId is:"+userId)
  var url = BACKEND.BASE_URL + BANK_BACKEND.CHECK_PRINT_IS_ALLOWED_OR_NOT + "/" + userId;
  var reqOptions = setReqOptions(sess, "get", true, {
    'Authorization': generateAuthHeader(url, "get")
  }, "", url);

  var body = "";
  await
  hitApi(reqOptions)
    .then(function (response) {
      body = response.body;
      var statusCode = response.serverResponse.statusCode;
    }).catch(function (err) {
      APIErrorHandler(err);
    })
  if (body.success == true) {
    renderPage(req, res, 'bankManagement/managePrint', {
      title: 'Manage Print'

    });
  } else {
    renderPage(req, res, 'bankManagement/Index', {
      title: 'Index'
    });
  }
  // renderPage(req,res,'bankManagement/managePrint',{

  // });
});
router.get('/manualPrint', function (req, res, next) {
  renderPage(req, res, 'bankManagement/manualPrint', {
    title: 'Manual Print'
  });
});
router.get('/testPrint', function (req, res, next) {
  renderPage(req, res, 'bankManagement/testPrint', {
    title: 'Test Print'
  });
});
router.get('/chqSummaryReport', function (req, res, next) {
  renderPage(req, res, 'bankManagement/chequeSummaryReport', {
    title: 'Cheque Summary Report'
  });
});
router.get('/chqPrintedReport', function (req, res, next) {
  renderPage(req, res, 'bankManagement/printedChequeReport', {
    title: 'Printed Cheque Report'
  });
});
router.get('/chqCancelledReport', function (req, res, next) {
  renderPage(req, res, 'bankManagement/cancelledChequeReport', {
    title: 'Cancelled Cheque Report'
  });
});
router.get('/chqBookDetailReport', function (req, res, next) {
  renderPage(req, res, 'bankManagement/chequeBookDetailsReport', {
    title: 'Cheque Book Details Report'
  });
});

router.get('/cancelCheque', function (req, res, next) {
  renderPage(req, res, 'bankManagement/cancelCheque', {
    title: 'Cancel Cheque'
  });
});

router.get('/addNewCustomer', function (req, res, next) {
  res.render('bankManagement/addNewCustomer');
  // renderPage(req,res,'bankManagement/addNewCustomer',{
  // });
});

router.get('/index', function (req, res, next) {
  renderPage(req, res, 'bankManagement/index', {
    title: 'Index'
  });
});

router.get('/', function (req, res, next) {
  // renderPage(req, res, 'bankManagement/login', {
  //   title: 'Login'
  // });
  res.render('bankManagement/login');
  // renderPage(req,res,'bankManagement/login',{

  // });
});

/* GET update Account page. */
router.get('/openUpdateAccountPage/:bankAccountId', function (req, res, next) {
  // renderPage(req,res,('bankManagement/updateBankAccount')
  var bankAccountId = req.params.bankAccountId;
  bankAccountId = parseFloat(bankAccountId);
  renderPage(req, res, 'bankManagement/updateBankAccount', {
    pageName: 'Update Account',
    bankAccountId: bankAccountId
  });
});

/* GET update Template page. */
router.get('/openUpdateTemplatePage/:templateId', function (req, res, next) {
  // renderPage(req,res,('bankManagement/updateBankAccount')
  var templateId = req.params.templateId;
  templateId = parseFloat(templateId);
  renderPage(req, res, 'bankManagement/updateChequeTemplate', {
    pageName: 'Update Cheque Template',
    templateId: templateId
  });
});
// GET Cheque book detail report
router.get('/openChequeDetailReportPage/:cbid', function (req, res, next) {
  // renderPage(req,res,('bankManagement/updateBankAccount')
  var cbid = req.params.cbid;
  cbid = parseFloat(cbid);
  renderPage(req, res, 'bankManagement/chequeBookDetailsReport', {
    pageName: 'Cheque Detail Report',
    cbid: cbid
  });
});

/* GET home page. */
router.get('/logout', function (req, res, next) {
  var request = req.body;
  var sess = req.session;
  sess.user = undefined;
  sess.destroy();

  res.render('bankManagement/login');
  // renderPage(req, res, 'bankManagement/login', {
  //   pageName: '',
  // });

});





// router.get('/', function (req, res, next) {
//   renderPage(req,res,('index')
// });
module.exports = router;