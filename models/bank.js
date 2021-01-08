module.exports=(sequlize,DataTypes)=>{

    var Bank=sequlize.define('Bank',{

        //primary key
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:DataTypes.BIGINT,
            field:'id'
        },
        //store name of bank
        bankName:{
            allowNull:false,
            type:DataTypes.TEXT,
            field:'bank_name'

        },
        //store short name of bank
        shortName:{
            allowNull:false,
            type:DataTypes.TEXT,
            field:'short_name'
        },
        //fk of user details entity
        userId:{
            allowNull:false,
            type:DataTypes.BIGINT,
            field:'user_id'
        }

    },{
        freezeTableName:true,
        tableName:'bank'
        // timestamps:true,
        // paranoids:true
    });

    //FK models references
    Bank.associate = function (models) {
        models.Bank.belongsTo(models.UserDetails, { foreignKey: 'userId', as:'userDetails' });
    };
    return Bank;
}