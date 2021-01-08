//store the details of Plan
module.exports = (sequlize, DataTypes) => {

    var Plan = sequlize.define('Plan', {

        //primary key
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },
        //store the name of plan
        planName: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'plan_name'
        },
        // max no of print allowed 
        noOfPrint: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_print'
        },
        //max no of account the use can add
        noOfAccount: {
           
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'no_of_account'
        },
        //cost of that plan
        planCost: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'plan_cost'
        },
        //duration of plan
        duration: {
            // in days
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'duration'
        },


    }, {
            freezeTableName: true,
            tableName: 'plan'
        });

    return Plan;
}