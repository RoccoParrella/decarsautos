module.exports = {
    getLogin: async (req, res) => {
        res.render('login')
    },
    getLogout: async (req, res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    }
}