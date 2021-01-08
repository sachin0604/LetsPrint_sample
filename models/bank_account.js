//store the information of bank Account
module.exports = (sequlize, DataTypes) => {
    var BankAccount = sequlize.define('BankAccount', {
        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },

        //Bank account holder name
        accountHolderName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'account_holder_name'
        },

        //bank account number
        accountNumber: {
            type: DataTypes.TEXT,
            field: 'account_number'
        },

        //account type i.e Saving or Current
        accountType: {
            type: DataTypes.TEXT,
            field: 'account_type'
        },

        //bank ifsc code
        ifscCode: {
            type: DataTypes.TEXT,
            field: 'ifsc_code'
        },

        //bank branch code
        branchCode: {
            type: DataTypes.TEXT,
            field: 'branch_code'
        },
        //store address of bank
        bankAddress: {
            type: DataTypes.TEXT,
            field: 'bank_address'
        },
        //minimum balance to maintain in bank
        minimumBalance: {
            type: DataTypes.DECIMAL,
            field: 'minimum_balance'
        },

        //current balance in bank
        actualBalance: {
            type: DataTypes.DECIMAL,
            field: 'actual_balance'
        },
        //the amount you can withdraw
        drawableBalance: {
            type: DataTypes.DECIMAL,
            field: 'drawable_balance'
        },

        // chequeIssuedAmount: {
        //     type: DataTypes.DECIMAL,
        //     field: 'cheque_issued_amount'
        // },

        // chequeDepositedAmount: {
        //     type: DataTypes.DECIMAL,
        //     field: 'cheque_deposited_amount'
        // },

        status: {
            type: DataTypes.BOOLEAN,
            field: 'status'
        },
        
        //this account is primary or not
        primary: {
            type: DataTypes.BOOLEAN,
            field: 'status'
        },

        //fk of bank entity
        bankId: {
            type: DataTypes.BIGINT,
            field: 'bank_id'
        },

        //fk of User
        userId: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'user_Id'
        },


    }, {
        freezeTableName: true,
        tableName: 'bank_account',
        timestamps: true,
        paranoid: true
    });


    //FK models refrence
    BankAccount.associate = function (models) {

        models.BankAccount.belongsTo(models.Bank, {
            foreignKey: 'bankId',
            as: 'bank'
        });
        models.BankAccount.belongsTo(models.UserDetails, {
            foreignKey: 'userId',
            as: 'userDetails'
        });
    };
    return BankAccount;
}