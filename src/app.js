(() => {
    const express = require('express')
    const app = express()
    const server = require('http').Server(app)
    const PORT = process.env.PORT || 8080;
    const path = require('path')

    const mongoose = require('mongoose')
    const passport = require('passport')
    const flash = require('express-flash');
    const session = require('express-session');

    const config = require('./config')
    const engine = require('./engine')
    const initializePassport = require('./passport/local')
    
    const routerHome = require('./router/routes/home')
    const routerLogin = require('./router/routes/login')
    const apiRoute = require('./router/api/api.cars')

    mongoose.connect(config.MONGOURI).then(() => {
        initializePassport(passport)
        engine(app)
        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(flash());
        app.use(session(config.MONGOSTORE))
        app.use(passport.initialize());
        app.use(passport.session());
        app.use("/static", express.static(path.join(__dirname, 'public')))

        // ROUTES
        app.use('/', routerHome)
        app.use('/', routerLogin)

        //APIS
        app.use('/api', apiRoute)

        console.log('Mongo conected')
    }).catch((err) => {
        console.log(err)
    })


    server.listen(PORT, () => console.log(`Server on port: ${PORT}`))
})()