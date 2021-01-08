//store the bank cheque entry records
module.exports = (sequelize, DataTypes) => {
    var BankChequeEntry = sequelize.define('BankChequeEntry', {
        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },
        //store the cheque numbers
        chequeNumber: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'cheque_number'
        },
        //store the cheque amount
        chequeAmount: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'cheque_amount'
        },
        //store the date of cheque
        chequeDate: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'cheque_date'
        },
        //store the payee name
        payeeName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'payee_name'
        },

        //store the status of cheque i.e Proceed or Cancelled
        chequeStatus: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'cheque_status'
        },
        //store the remark of cheque
        remark: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'remark'
        },
        //store cheque cancel reason
        cancelReason: {
        
            type: DataTypes.TEXT,
            field: 'cancel_reason'
        },
        //store cheque cancel date 
        cancelDate: {
            
            type: DataTypes.DATE,
            field: 'cancel_date'
        },
        //store cheque type i.e ac/payee or barrier
        chequeType: {
           
            type: DataTypes.TEXT,
            field: 'cheque_type'
        },
        //store print type i.e Manual Print or Print From Cheque book
        printType: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'print_type'
        },
        // fk of bank payee
        bankPayeeDetailsId: {
            type: DataTypes.BIGINT,
            field: 'bank_payee_details_id'
        },
        //fk of cheque book id
        bankChequeBookId: {
            type: DataTypes.BIGINT,
            field: 'bank_cheque_book_id'
        },
        //fk of user details
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id'
        }
    }, {
            freezeTableName: true,
            tableName: 'bank_cheque_entry'
        }
    );

    //fk models refrences
    BankChequeEntry.associate = function (models) {
        models.BankChequeEntry.belongsTo(models.BankPayee, { foreignKey: 'bankPayeeDetailsId', as:'bankPayee' });
        models.BankChequeEntry.belongsTo(models.BankChequeBook, { foreignKey: 'bankChequeBookId' , as:'bankChequeBook' });
        models.BankChequeEntry.belongsTo(models.UserDetails, { foreignKey: 'userId' , as:'userDetails' });
    };
    return BankChequeEntry;
}
