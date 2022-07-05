module.exports = {
    isLoginAdmin: (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash('alertMessage', 'Sorry, you are not authenticated');
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        } else {
            next();
        }
    }
}