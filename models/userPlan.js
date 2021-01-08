module.exports=(sequlize,DataTypes)=>{

    var UserPlan=sequlize.define('UserPlan',{

        
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            field: 'íd'

        },
        userId: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'user_details_id'

        },
        planId: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'plan_id'

        },
        activationDate: {
            //allowNull: false,
            type: DataTypes.DATE,
            field: 'activation_date'

        },
        planEndDate: {
            //allowNull: false,
            type: DataTypes.DATE,
            field: 'plan_end_date'

        },
        // max number that user can print
        noOfPrintAllowed:{
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_print_allowed'
        },
        //max number that user can add
        noOfAccountAllowed:{
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_account_allowed'
        },
        //store no Of Print Done Currently (current status)
        noOfPrintDoneCurrently:{
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_print_done'
        },
        //store no Of Account added  Currently (current status)
        noOfAccountAddedCurrently:{
            // current status
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_print_added'
        },
        //stote that this plan is latest or not
        isThisLatestPlan:{
            allowNull: false, 
            type:DataTypes.BOOLEAN,
            field: 'is_this_latest_plan'
        }

    },{
        freezeTableName: true,
        tableName: 'user_plan'
    });

    //FK models reftences 
    UserPlan.associate = function (models) {
        models.UserPlan.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plan' });
        models.UserPlan.belongsTo(models.UserDetails,{ foreignKey: 'userId', as: 'UserDeatails' });
    };

    return UserPlan;
}