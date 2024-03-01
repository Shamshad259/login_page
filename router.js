var express = require('express');
var router = express.Router();

const credential = {
    email : "user@gmail.com",
    password : 123
}

//login user

router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/home');
    } else {
        res.redirect("/");
    }
})


//route for home
router.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('home',{title:"Home"})
        // console.log(req.session.user)
    } else {
        res.redirect("/")
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
        console.log(err);
        res.send("Error")
        } else{
            res.redirect('/')
        }
    });
})

module.exports = router;