const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
         match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    designDiscipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disciplines"
    },
    authorisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authorisation"
    },
    project: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});
// use this function to hash the password before saving to database
// this is mongoose midleware, once saved it will go to next
// use old function wants to access to "this"
UserSchema.pre('save',function(next){
    // if password already modified(already hashed)
    if(!this.isModified('password'))
    return next();
    // saltOrRound set up for 10 as doc example this mean how strong we need this encryption 
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
        return next(err);
        this.password = passwordHash;
        next();
    });
});

//creating a comparePassword method as parameters password which is we are getting from the user(not hashed) and (cb as done) 
UserSchema.methods.comparePassword = function(password, cb){
    //  compare password, we getting from user and the one saved in database
        bcrypt.compare(password, this.password, (err, isMatch) => {
           // if we got any error with comparing
            if(err)
            //call cb with error
            return cb(err);
            // if there are no errors with compareing
            else{
                // if passwords match?
                if(!isMatch)
                // is not match call done function isMatch will be false
                return cb(null, isMatch);
                // if there is a match call done and return user object
                // "this" mean user 
                return cb(null, this);
            }
        });
    }
    


const User = mongoose.model("User", UserSchema);

module.exports = User;