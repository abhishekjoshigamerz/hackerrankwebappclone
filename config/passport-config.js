const LocalStrategy = require('passport-local').Strategy;





function intialize(passport){
    const authenticateUser = (email,password,done)=>{

    }

    passport.use(new LocalStrategy({usernameField:'email'}),authenticateUser);

    passport.serializeUser((user,done)=>{
    
    });

    passport.deserializeUser((id,done)=>{

    });
    }