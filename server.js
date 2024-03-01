const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session'); 
const {v4:uuidv4}=require('uuid')
const nocache =require('nocache')

const router = require('./router') 

const port = process.env.port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(nocache());

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router)

//Home Route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('home',{title:req.session.user})
    } else{
        res.render('base',{title:'login'})
    }
})

app.listen(port,()=>{
    console.log("Listening to the server on http://localhost:3000");
});