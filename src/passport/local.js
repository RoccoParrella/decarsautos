const LocalStrategy = require("passport-local").Strategy
const userModel = require('../model/user.model')

module.exports = (passport) => {
    const authenticateUser = async (username, password, done) => {
        try {

            // Search the user by his email

            if (username.length <= 8) {
                if (!await userModel.existsByUsername(username)) {
                    console.log(`El Username ${username} no esta registrado!`);
                    return done(null, false, { message: 'Usuario no registrado' });
                }
            } else {
                if(!await userModel.existsByEmail(username)) {
                    console.log(`El email ${username} no esta registrado!`);
                    return done(null, false, { message: 'Usuario no registrado' });
                }
            }

            // Search the user by his email and compare it with the password

            if (!await userModel.isPasswordValid(username, password)) {
                console.log(`El password no es validad!`);
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            // If the user is registered and the password is valid, get the user

            let user
            if (username.length <= 8) {
                user = await userModel.getByUsername(username);
            } else {
                user = await userModel.getByEmail(username);
            }

            done(null, user);
        } catch (e) {
            console.log(`Error al autenticar el usuario: ${e}`);
            return res.status(500).send({ message: `Error en el servidor: ${e}` });
        }
    }

    const registerUser = async (req, email, password, done) => {
        try {

            // Check if the email is already registered

            // if (await userModel.existsByEmail(email)) {
            //     console.log(`El email ${email} ya esta registrado!`);
            //     return done(null, false, { message: 'Email ya registrado' })
            // }

            // Check if the username is already registered

            // if (await userModel.existsByUsername(username)) {
            //     console.log(`El ${username} ya esta registrado!`)
            //     return done(null, false, { message: 'Username ya registrado' })
            // }


            // Create the user and save it in the DB   

            const user = await userModel.save({
                password,
                username: email
            })

            done(null, user)
        } catch (err) {
            console.log(`Error al registrar el usuario: ${err}`);
            done(err)
        }
    }

    passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
    passport.use('register', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
}