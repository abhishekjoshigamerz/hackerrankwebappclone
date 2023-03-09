const User = require('../../models/users');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports.login = function(req, res){
    return res.render('home/login',{
        title: "Login"
    });
}

module.exports.register = async function(req, res){
    try {
        const errors = validationResult(req);
        req.flash('error','');
        if(!errors.isEmpty()){
            let message = [];

            for(let i=0;i<errors.array().length;i++){
                message.push(errors.array()[i].msg);
            }
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
        req.flash('success','Account created successfully,now Log in');
        return res.redirect('/auth/login');

    } catch (error) {
        console.log(error);
        req.flash('error','Something went wrong');
        return res.redirect('back');        
    }

    
}
