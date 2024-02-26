const {Pool}= require("pg");
const pool =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'abts',
    password: '123456aaAA$',
    port: 5432,
});
module.exports={
    query :(text,params)=>pool.query(text,params),
}
