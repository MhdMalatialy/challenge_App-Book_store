const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config({ path: './config/config.env' });
const jwt = require('jsonwebtoken');
passport.use(new GoogleStrategy({
  callbackURL: `${process.env.URL}auth/google/redirect`,  
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
},
  async (accessToken, refreshToken,profile, done) => {
       let user
    try {
      const email = profile.emails && profile.emails[0].value;
      const name = profile.name
      const googleId = profile.id
        user = await prisma.user.upsert(
          {
              where:{googleId},
              update:{},
              create:{googleId,
                email,
                first_name:name.givenName,
                last_name: name.familyName
            }
            })
      if (user.activated===false){
        user = await prisma.user.update({
            where:{
                googleId},
            data:{
                activated:true}})
      }
      const token = jwt.sign({_id:user.id}, process.env.JWTKEY,{
        expiresIn: 604800 // 1 week
      });

        return done(null, {token,user});  //token will get appended to req.user object : passport.js in action
 
    } catch (error) {
      done(error)
    }
  }
));
module.exports = passport;