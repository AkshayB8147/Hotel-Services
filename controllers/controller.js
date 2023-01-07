const mysqlPool = require('../config/db.config');
const dbCall=require('./db-controller');
let serv = require('../srcs/servicesChart');

let bookingId;
let main_page = (req, res) => {
    res.render('main-page');
};


//login
let login = (req, res) => {
    res.render('login',{bookingId});
};

let loginCal = (req, res) => {
    let validationData = req.body;
    let emailId = validationData.email;
    let password = validationData.password;

    mysqlPool.query('SELECT bookingId,password,email FROM customer where email=?', [emailId], (err, result, fields) => {
        if (err) throw err;
        if(result[0]==undefined){
            res.render('login',{message:"Email or Password is not correct"});
        }
        else if (result[0].password == password) {
            bookingId = Number(result[0].bookingId);
            res.redirect('/');
        } else {
            res.render('login',{message:"Email or Password is not correct"});
        }
    });
};
let logout = (req, res) => {
    bookingId=undefined;
    res.redirect('/');
};


//cart
let cart = (req, res) => {
    let srvTable={};
    if (bookingId == undefined) {
        res.redirect('/login');
    } else {
        mysqlPool.query('SELECT salon,spa,laundry,transportation,service_Charges FROM customer where bookingId=?', [bookingId], (err, result, fields) => {
        if (err) throw err;
        srvTable = { "sr1": Number(result[0].salon), "sr2": Number(result[0].spa), "sr3": Number(result[0].transportation), "sr4": Number(result[0].laundry), "total": Number(result[0].service_Charges) };
        res.render('cart', { srvTable });
        });
    }
};


//services
//Beauty Salon
let beautySalon = (req, res) => {
    if (bookingId == undefined) {
        res.redirect('/login');
    } else{
        res.render('beautySalon');
    }
};
let beautySalonCal = (req, res) => {
    let total = 0;
    let usedService = req.body.service;
    for (let service of usedService) {
        total = total + serv.beautySalonData[service];
    }

    mysqlPool.query('SELECT salon FROM customer where bookingId=?', [bookingId], (err, result, fields) => {
        if (err) throw err;

        let currentSalonCharge = Number(result[0].salon);
        let updatedSalonCharge = currentSalonCharge + total;


        mysqlPool.query('UPDATE customer SET salon=? where bookingId=?', [updatedSalonCharge, bookingId], (err, result, fields) => {
            if (err) throw err;
        });
        dbCall.updateAmount(bookingId);
    });
    res.redirect('/beautySalon');
};


//Sensa Spa
let sensesSpa = (req, res) => {
    if (bookingId == undefined) {
        res.redirect('/login');
    } else {
        res.render('sensesSpa');
    }
};
let sensesSpaCal = (req, res) => {
    let total = 0;
    let usedService = req.body.service;
    for (let service of usedService) {
        total = total + serv.senspaSpaData[service];
    }

    mysqlPool.query('SELECT spa FROM customer where bookingId=?', [bookingId], (err, result, fields) => {
        if (err) throw err;

        let currentSpaCharge = Number(result[0].spa);
        let updatedSpaCharge = currentSpaCharge + total;

        mysqlPool.query('UPDATE customer SET  spa=? where bookingId=?', [updatedSpaCharge, bookingId], (err, result, fields) => {
            if (err) throw err;
        });
        dbCall.updateAmount(bookingId);
    });
    res.render('sensesSpa');
};

//-Transportation Service

let transportService = (req, res) => {
    if (bookingId == undefined) {
        res.redirect('/login');
    } else {
        res.render('transportService');
    }
};

let transportServiceCal = (req, res) => {
    let total = 0;
    let usedService = req.body.service;
    for (let service of usedService) {
        total = total + serv.transportData[service];
    }

    mysqlPool.query('SELECT transportation FROM customer where bookingId=?', [bookingId], (err, result, fields) => {
        if (err) throw err;

        let currentTransportCharge = Number(result[0].transportation);
        let updatedTransportCharge = currentTransportCharge + total;

        mysqlPool.query('UPDATE customer SET  transportation=? where bookingId=?', [updatedTransportCharge, bookingId], (err, result, fields) => {
            if (err) throw err;
        });
        dbCall.updateAmount(bookingId);
    });
    res.redirect('/transportService');
};


//Laundry Service
let laundryService = (req, res) => {
    if (bookingId == undefined) {
        res.redirect('/login');
    } else {
        res.render('laundryService');
    }
};
let laundryServiceCal = (req, res) => {
    let total = 0;
    let usedService = req.body.service;
    for (let service of usedService) {
        total = total + serv.laundryData[service];
    }

    mysqlPool.query('SELECT laundry FROM customer where bookingId=?', [bookingId], (err, result, fields) => {
        if (err) throw err;

        let currentLaundryCharge = Number(result[0].laundry);
        let updatedLaundryCharge = currentLaundryCharge + total;

        mysqlPool.query('UPDATE customer SET  laundry=? where bookingId=?', [updatedLaundryCharge, bookingId], (err, result, fields) => {
            if (err) throw err;
        });
        dbCall.updateAmount(bookingId);
    });
    res.redirect('/laundryService');
};

//Events Service
let eventsService = (req, res) => {
    res.render('eventsService');
};

//Gym n Playground
let gymplayService = (req, res) => {
    res.render('gymplayService');
};

module.exports = { main_page, login, loginCal, logout, cart, beautySalon, beautySalonCal, sensesSpa, sensesSpaCal, transportService, transportServiceCal, laundryService, laundryServiceCal, eventsService, gymplayService };