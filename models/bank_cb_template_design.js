module.exports = (sequelize, DataTypes) => {
    var BankCbTemplateDesign = sequelize.define('BankCbTemplateDesign', {

        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },
        //store the template name
        templateName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'template_name'
        },
        //store the image base64 of template
        templateImgBase64: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'template_image_base_64'
        },

        //store the formate of date i.e line date or box date
        dateFormate: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'date_formate'
        },  
        //store Date top position
        chqDateTop: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'chq_date_top'
        },
        //store date left position
        chqDateLeft: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'chq_date_Left'
        },
        //store date box height
        chqDateHeight: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'chq_date_height'
        },
        //store the date box width
        chqDateWidth: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'chq_date_width'
        },
        //store the payee name position from top
        payeeNameTop: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'payee_name_top'
        },
        //store the payee name position from left
        payeeNameLeft: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'payee_name_left'
        },
        //store the payee name width
        payeeNameWidth: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'payee_name_width'
        },
        //store the Decimal amount  position from top
        amountTop: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_top'
        },
        //store the Decimal amount  position from left
        amountLeft: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_left'
        },

        //store the Decimal amount  width
        amountWidth: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_width'
        },
        //store the amount (in word)  position from top
        amountInWordTop: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_in_word_top'
        },
        //store the amount (in word)  position from left
        amountInWordLeft: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_in_word_left'
        },

        //store the amount (in word)  width
        amountInWordWidth: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'amount_in_word_width'
        },
        //store the ac/payee position from the top
        accPayeeTop: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'acc_payee_top'
        },
        //store the ac/payee position from the left
        accPayeeLeft: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'acc_payee_left'
        },

        //store the ac/payee width
        accPayeeWidth: {
            allowNull: false,
            type: DataTypes.DECIMAL,
            field: 'acc_payee_width'
        },
        //fk of bank entity 
        bankId: {
            type: DataTypes.BIGINT,
            field: 'bank_id'
        },

        //fk of user details models
        userId: {
            allowNull:false,
            type: DataTypes.BIGINT,
            field: 'user_Id'
        },
    }, {
        freezeTableName: true,
        tableName: 'bank_cb_template_design'
    
    },
);

//Fk models references
BankCbTemplateDesign.associate = function (models) {
    models.BankCbTemplateDesign.belongsTo(models.Bank, { foreignKey: 'bankId', as:'bank'});
    models.BankCbTemplateDesign.belongsTo(models.UserDetails, { foreignKey: 'userId', as:'userDetails'});
};
    return BankCbTemplateDesign;
}