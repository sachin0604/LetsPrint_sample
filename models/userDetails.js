//store the details of user
module.exports = (sequlize, DataTypes) => {
    var UserDetails = sequlize.define('UserDetails', {

        //primary key
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.BIGINT,
            field: 'íd'

        },
        //store the user name
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'name'

        },
        //store the mobile number of user
        mobile: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'mobile'

        },
        //store the email id of user
        emailId: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'email_íd'

        },
        //store the password of user
        password: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'password'

        },
        //store the address of user
        address: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'address'

        },
        //store the access status
        accessStatus: {
            // to manage the user pay status
            // if this status is false then don't allowed the user to print (User can login but he can not able to print)
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'access_status'

        },
        //store the user active status
        activeStatus: {
            // to enable and disable the user 
            // if this status is false don't allowed the user to login
            allowNull: false, 
            type:DataTypes.BOOLEAN,
            field: 'active_status'

        },
        //Fk of plan
        planId: {
            allowNull: false,
            type: DataTypes.BIGINT,
            field: 'plan_id'
        }

    }, {
            freezeTableName: true,
            tableName: 'user_details'
        });

    //Fk models refrences 
    UserDetails.associate = function (models) {
        models.UserDetails.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plan' });
    };

    return UserDetails;
}