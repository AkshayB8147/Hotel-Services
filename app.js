const express=require('express');
const app=express();
const router=require('./routes/router');
const bodyParser = require('body-parser');
const handlebars=require('express-handlebars');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT=5000;

// app.use(express.static(path.join(__dirname,'../public')));
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');
app.set('views',__dirname+'/views');

app.engine('hbs',handlebars.engine({
    layoutsDir:__dirname+'/views/layouts',
    partialsDir:__dirname+'/views/partials',
    extname:'hbs',
    defaultLayout:'index'
}));

app.use((req,res,next)=>{
    console.log(req.hostname,req.path);
    next();
});

app.use('/',router);

app.listen(PORT,()=>{
    console.log("Server listining on port",PORT);
});