const mysql= require("mysql2");
require('dotenv').config();
const pool =mysql.createPool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD
    // port: 3306,
}).promise()
module.exports={
   pool
}
// const {Pool}= require("pg");
// const pool =new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'G-M-S',
//     password: '123456aaAA$',
//     port: 5432,
// });
// module.exports={
//     query :(text,params)=>pool.query(text,params),
// }





// const {Pool}= require("pg");
// const pool =new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'G-M-S',
//     password: '123456aaAA$',
//     port: 5432,
// });
// module.exports={
//     query :(text,params)=>pool.query(text,params),
// }
