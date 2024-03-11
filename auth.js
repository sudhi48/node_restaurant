
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (userName, password, done)=>{
    try{
        //console.log('received credential',userName, password);
        const user=await Person.findOne({username: userName});
        if(!user){
            return done(null, false, {message: 'Incorrect Username.'});
        }
        const isPasswordMatch =await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null,false,{message: 'Incorrect Password.'});
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports=passport;
