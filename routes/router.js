const express=require('express');
const router=express.Router();
const controller=require('../controllers/controller');

router.get('/',controller.main_page);

router.get('/login',controller.login);
router.post('/login',controller.loginCal);
router.get('/logout',controller.logout);

router.get('/cart',controller.cart);

router.get('/beautySalon',controller.beautySalon);
router.post('/beautySalon',controller.beautySalonCal);

router.get('/sensesSpa',controller.sensesSpa);
router.post('/sensesSpa',controller.sensesSpaCal);

router.get('/transportService',controller.transportService);
router.post('/transportService',controller.transportServiceCal);

router.get('/laundryService',controller.laundryService);
router.post('/laundryService',controller.laundryServiceCal);

router.get('/eventsService',controller.eventsService);

router.get('/gymplayService',controller.gymplayService);

module.exports=router;