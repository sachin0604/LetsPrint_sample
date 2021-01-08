global.BANK_BACKEND = {
    ADD_BANK: "bank/saveBank",
    FETCH_BANK_LIST:"bank/fetchBankList",
    UPDATE_BANK:"bank/updateBank",
    ADD_PAYEE:"payee/saveBankPayee",
    FETCH_PAYEE_LIST:"payee/fetchBankPayeeList",
    UPDATE_PAYEE:"payee/updateBankPayee",

    SAVE_ACCOUNT:"account/saveBankAccount",
    UPDATE_ACCOUNT:"account/updateBankAccount",
    FETCH_ACCOUNT_BY_ID:"account/fetchBankAccountById",
    FETCH_ACCOUNT_LIST:"account/fetchBankAccountList",
    FETCH_CB_LIST:"manageChq/fetchChqBookList",
    FETCH_CB_LIST_BY_ACCOUNT_ID:"manageChq/fetchBankCBListByAccountId",
    FETCH_UNUSED_CHEQUE_NO_LIST_BY_CBId:"manageChq/fetchUnusedChequeNoList",

    FETCH_CB_TEMPLATE_LIST:"chq/fetchChqTemplateList",
    SAVE_CB_TEMPLATE:"chq/saveChequeTemplate",
    FETCH_CHEQUE_TEMPLATE_BY_ID:"chq/fetchChqTemplateById",
    FETCH_CB_TEMPLATE_BY_BANK_ID:"chq/fetchChqTemplateByBankId",
    FETCH_CB_TEMPLATE_BY_CB_ID:"chq/fetchChqTemplateByCBId",
    UPDATE_CB_TEMPLATE:"chq/updateChqTemplate",

    SAVE_CHEQUE_BOOK:"manageChq/saveChequeBook",
    CHEQUE_NO_PRINTED_OR_NOT:"chequePrint/checkChequeNoAlreadyPrintedOrNot",
    
    SAVE_MANUAL_CHEQUE_PRINT_ENTRY:"chequePrint/printManualChqSave",
    SAVE_BULK_CHEQUE_PRINT_ENTRY:"chequePrint/saveBulkPrintChq",
    CHEQUE_SUMMARY_BY_ACCOUNT_ID:"reports/fetchChequeBookSummaryReport",
    PRINTED_CHEQUE_REPORT_BY_ACCOUNT_ID:"reports/fetchPrintedChequeReport",
    CANCELLED_CHEQUE_REPORT_BY_ACCOUNT_ID:"reports/fetchCancelChequeReport",
    CHEQUE_BOOK_DETAILS_REPORT_BY_CHEQUEBOOK_ID:"reports/fetchChequeEntryReport",
    FETCH_CHEQUE_DETAILS_BY_CHEQUE_NO:"chequePrint/fetchChequeDetailsByChequeNo",
    SAVE_CANCEL_CHEQUE:"manageChq/saveCancelCheque"  ,

    FETCH_PLAN_LIST:"plan/fetchPlanList",
    FETCH_PLAN_BY_ID:"plan/fetchPlanById",
    FETCH_USER_PLAN_BY_USER_ID:"userDetails/fetchUserPlanByUserId",

    SAVE_USER_DETAILS:"userDetails/saveUserdetails",

    USER_LOGIN:"login/loginUser",
    CHECK_PRINT_IS_ALLOWED_OR_NOT:"chequePrint/checkPrintIsAllowedOrNot"

    
}
global.BANK_FRONTEND = {
    ADD_BANK: "manageBank/bank/add",
    FETCH_BANK_LIST:"manageBank/fetchBankList",
    UPDATE_BANK:"manageBank/bank/update",

    ADD_PAYEE:"manageBank/payee/add",
    FETCH_PAYEE_LIST:"manageBank/fetchPayeeList",
    UPDATE_PAYEE:"manageBank/payee/update",

    SAVE_ACCOUNT:"manageBank/saveAccount",
    UPDATE_ACCOUNT:"manageBank/updateBankAccount",
    FETCH_ACCOUNT_BY_ID:"manageBank/fetchBankAccountById",
    FETCH_ACCOUNT_LIST:"manageBank/fetchBankAccountList",

    
    FETCH_CB_LIST:"manageBank/fetchChequeBookList",

    FETCH_CB_TEMPLATE_LIST:"manageBank/fetchChequeTemplateList",
    SAVE_CB_TEMPLATE:"manageBank/saveChequeTemplate",
    UPDATE_CB_TEMPLATE:"manageBank/updateChequeTemplate",
    FETCH_CB_TEMPLATE_BY_ID:"manageBank/fetchChequeTemplateById",
    FETCH_CB_TEMPLATE_BY_BANK_ID:"manageBank/fetchChqTemplateByBankId",
    CHEQUE_NO_PRINTED_OR_NOT:"manageBank/checkChequeNoAlreadyPrintedOrNot",
    SAVE_CHEQUE_BOOK:"manageBank/saveChequeBook",
    SAVE_MANUAL_CHEQUE_PRINT_ENTRY:"manageBank/saveManualChequeEntry",
    FETCH_CB_LIST_BY_ACCOUNT_ID:"manageBank/fetchChqBookListByAccountId",
    FETCH_CB_TEMPLATE_BY_CB_ID:"manageBank/fetchChqTemplateByCBId",
    FETCH_UNUSED_CHEQUE_NO_LIST_BY_CBId:"manageBank/fetchUnusedChequeNoList",

    FETCH_CHEQUE_DETAILS_BY_CHEQUE_NO:"manageBank/fetchChequeDetailsByChequeNo",
    SAVE_CANCEL_CHEQUE:"manageBank/saveCancelCheque",


    CHEQUE_SUMMARY_BY_ACCOUNT_ID:"manageBank/fetchChequeSummaryReportBy",
    PRINTED_CHEQUE_REPORT_BY_ACCOUNT_ID:"manageBank/fetchPrintedChequeListByAccountId",
    CANCELLED_CHEQUE_REPORT_BY_ACCOUNT_ID:"manageBank/fetchCancelledChequeListByAccountId",
    CHEQUE_BOOK_DETAILS_REPORT_BY_CHEQUEBOOK_ID:"manageBank/fetchChequeBookDetailReportByCBID",

    SAVE_BULK_CHEQUE_PRINT_ENTRY:"manageBank/saveBulkPrintCheque",

    FETCH_PLAN_LIST:"manageBank/fetchPlanList",
    FETCH_PLAN_BY_ID:"manageBank/fetchPlanById",
    SAVE_USER_DETAILS:"manageBank/saveUserDetails1",
    FETCH_USER_PLAN_BY_USER_ID:"manageBank/fetchUserPlanByUserId",

    USER_LOGIN:"loginFrontend/loginUser",

    GET_UPDATE_PAGE_FOR_ACCOUNT:"openUpdateAccountPage",
    GET_UPDATE_PAGE_FOR_CHEQUE_TEMPLATE:"openUpdateTemplatePage",
    GET_CHEQUE_DETAIL_REPORT_PAGE_BY_CBID:"openChequeDetailReportPage"

    

}