const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();
const User = require("../db/models/user");

// this is a custom function we using for to extract the jwt-token from the request
const cookieExtractor = req => {
    let token = null;
    // if req is there and req.cookie not empty
    if(req && req.cookies){        
     token = req.cookies['access_token'];
    }
    return token;
}

// this is authorization.
// once we  areauthenticated we setting up a cookie user's browser, this cookie will be our jwt-Token
passport.use(new JwtStrategy({
    // cookieExtractor is a custom function use for extract jwt token from request
    jwtFromRequest: cookieExtractor,
    //this key will verify is this token is legilimen
    secretOrKey: process.env.SECRET_OR_KEY
},(payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        // if there is any error
        if(err)
        return done(err, false);
        // this user is already authenticated, we dont have to check the password again
        if(user)
        // if user exist no err return user
        return done(null, user);
        else
        // there is no user has that primary key
        return done(null, false)
    })
}))

//  authenticated local strategy using email and passwod
passport.use(new localStrategy((username, password, done) =>{
    User.findOne({email: username}, (err, user) => {
        // something went wrong with database
        if(err)
        return done(err);
        // if no user exist
        if(!user)
        return done(null, false);
        //if password if correct
        user.comparePassword(password, done);

    });
}));