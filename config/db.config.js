const mysql=require('mysql');
let connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root",
    database:"hotelservices"
});

connection.connect((err)=>{
    if(err){
        console.log("connection failed",err.stack);
    }
    console.log("Connection Successful",connection.threadId);
});
module.exports=connection;