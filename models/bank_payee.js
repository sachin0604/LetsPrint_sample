
//store the information of bank Payee
module.exports = (sequlize, DataTypes) => {
    var BankPayee = sequlize.define('BankPayee', {
        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },

        //store the payee name
        payeeName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'payee_name'
        },

        //store the payee Address
        payeeAddress: {
            type: DataTypes.TEXT,
            field: 'payee_address'
        },

        //FK of user details
        userId: {
            allowNull:false,
            type: DataTypes.BIGINT,
            field: 'user_Id'
        },


    }, {
            freezeTableName: true,
            tableName: 'bank_payee',
            // timestamps: true,
            // paranoid: true
        });


        //FK models references
        BankPayee.associate = function (models) {
        models.BankPayee.belongsTo(models.UserDetails, { foreignKey: 'userId', as:'userDetails' });
    };

    return BankPayee;
}