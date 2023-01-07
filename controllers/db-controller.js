let sql=require('../config/db.config');

let updateAmount=function(bookingId){
    sql.query('SELECT spa,laundry,salon,transportation,roomRent FROM customer where bookingId=?', [bookingId], (err, result,fields) => {
        if (err) throw err;
        let totalService=Number(result[0].spa)+Number(result[0].salon)+Number(result[0].transportation)+Number(result[0].laundry);
        let totalAmt=totalService+Number(result[0].roomRent);
        sql.query('UPDATE customer SET service_Charges=?,totalAmount=? where bookingId=?', [totalService,totalAmt, bookingId], (err, result, fields) => {
            if (err) throw err;
        });
    });
};
module.exports={updateAmount};