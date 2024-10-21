import sequelize from "@/config/connection.js";
import connection from "@/config/connection.js";
import {DataTypes} from "sequelize";


const Student = connection.define('Student', {
    nopeserta : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    eskul : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    kelas : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    status: {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue:0
    },
    isOpen: {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue:0
    },
    openDate: {
        type : DataTypes.DATE,
        allowNull:true
    },
},{
    tableName: 'Student',
    updatedAt: false,
    createdAt : false
})

sequelize.sync();

export default Student;