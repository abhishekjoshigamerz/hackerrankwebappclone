const User = require('../../models/users');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports.login = function(req, res){
    return res.render('home/login',{
        title: "Login"
    });
}
//for registration
module.exports.register = async function(req, res){
    try {
        console.log("data inside");
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            let message = [];
            let result  = errors.array();
            for(let i=0;i<result.length;i++){
                message.push(result[i].msg);
            }
            console.log('Errors');
            console.log(message);
            req.flash('error',message);
            return res.redirect('back');
          
        }
    
        //now create users 
        let salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req.body.password,salt);
        const user = await User.create({
            email:req.body.email,
            password:password,
        });
        if(user){
            req.flash('success','Account created successfully,now Log in');
            return res.redirect('/auth/login');

        }
        
    } catch (error) {
        console.log(error);
        req.flash('error','Something went wrong');
        return res.redirect('back');        
    }

    
}


//for login 

module.exports.loginSession = async function(req, res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            let message = [];
            let result  = errors.array();
            for(let i=0;i<result.length;i++){
                message.push(result[i].msg);
            }
            console.log('Errors');
            console.log(message);
            req.flash('error',message);
            return res.redirect('back');
        }

        const findUser = await User.find({email:req.body.email});
        if(findUser.length>0){

            let checkPassword = await bcrypt.compare(req.body.password,findUser[0].password);
            if(checkPassword){
                req.flash('success','Logged in successfully');
                req.session.isLoggedIn = true;
                req.session.user = findUser[0];
                if(findUser[0].isAdmin != true && findUser[0].firstTimeLogin == true){
                    return res.redirect('/user/settings');
                }else{
                    return res.redirect('/user/dashboard');
                }
            } 

        }

        req.flash('error','Invalid email or password');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        req.flash('error','Something went wrong. Internal server error 500!');
        return res.redirect('back');       
    }
}




module.exports.settings = function(req, res){
    res.send('Settings page');
}