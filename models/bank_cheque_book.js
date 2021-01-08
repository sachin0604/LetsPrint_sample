module.exports = (sequelize, DataTypes) => {
    var BankChequeBook = sequelize.define('BankChequeBook', {

        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },
        //store name of the cheque book i.e form by bank name and startng and end cheque number (ex. SBI-111001-111010)
        chequeBookName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'cheque_book_name'
        },
        //store the number of leaves in cheque book
        numberOfLeaves: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'number_of_leaves'
        },
        //store no of unused leaves in cheque book
        numberOfUnusedLeaves: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'number_of_unused_leaves'
        },
        //store start cheque number of cheque book
        startChequeNumber: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'start_cheque_number'
        },
        //store end cheque number of cheque book
        endChequeNumber: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'end_cheque_number'
        },

        //Fk of template design
        bankCBTemplateDesignId: {
            type: DataTypes.BIGINT,
            field: 'bank_cb_tempate_design_id'
        },

        //fk of bank account
        bankAccountId: {
            type: DataTypes.BIGINT,
            field: 'bank_account_id'
        },
        //fk of user details
        userId: {
            allowNull:false,
            type: DataTypes.BIGINT,
            field: 'user_Id'
        },
    }, {
            freezeTableName: true,
            tableName: 'bank_cheque_book'

        }
    );

    //Fk models references
    BankChequeBook.associate = function (models) {
        models.BankChequeBook.belongsTo(models.BankAccount, { foreignKey: 'bankAccountId' ,as:'bankAccount'});
        models.BankChequeBook.belongsTo(models.BankCbTemplateDesign, { foreignKey: 'bankCBTemplateDesignId', as:'bankCbTemplateDesign' });
        models.BankChequeBook.belongsTo(models.UserDetails, { foreignKey: 'userId', as:'userDetails' });
    };

    return BankChequeBook;
}