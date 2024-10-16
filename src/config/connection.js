import {Sequelize} from "sequelize";
// import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'), // Tambahkan ini untuk menggunakan modul pg
    protocol: 'postgres', // Tambahkan ini jika diperlukan
});

export default sequelize;