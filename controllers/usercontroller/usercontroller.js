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
