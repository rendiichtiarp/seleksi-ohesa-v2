import {Sequelize} from "sequelize";
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectModule: mysql2
});


export default sequelize;
