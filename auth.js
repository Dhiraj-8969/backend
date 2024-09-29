const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
passport.use(new localStrategy(async(USERNAME, password, done) => {
    try {
        console.log('Received credentials:', USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user)
            return done(nall, false, { message: 'incorrect username.' });
        const isPasswoerdMatch = await user.comparePassword(password);
        if (isPasswoerdMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' })
        }
    } catch (err) {
        return done(err);
    }
}));
module.exports = passport;