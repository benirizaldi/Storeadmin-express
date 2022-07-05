const User = require('./model');
const bcrypt = require('bcryptjs');
module.exports = {
    viewSignIn: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }

            if (req.session.user === null || req.session.user === undefined) {
                res.render('admin/user/view_signin', {
                    title: "Halaman Login",
                    layout: 'admin/user/view_signin',
                    alert
                });
            } else {
                res.redirect('/dashboard');
            }

            res.render('admin/user/view_signin', {
                layout: 'admin/user/view_signin',
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        }
    },
    actionSignIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email);
            const checkLogin = await User.findOne({ email: email });

            if (checkLogin) {
                if (checkLogin.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, checkLogin.password)
                    if (checkPassword) {
                        req.session.user = {
                            id: checkLogin._id,
                            email: checkLogin.email,
                            status: checkLogin.status,
                            name: checkLogin.name,
                            username: checkLogin.username,
                        }
                        res.redirect('/dashboard');
                    } else {
                        req.flash('alertMessage', "Kata sandi salah!");
                        req.flash('alertStatus', "danger");
                        res.redirect('/');
                    }
                } else {
                    req.flash('alertMessage', "Mohon maaf status anda belum aktif");
                    req.flash('alertStatus', "danger");
                    res.redirect('/');
                }
            } else {
                req.flash('alertMessage', "Email anda salah");
                req.flash('alertStatus', "danger");
                res.redirect('/');
            }


        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/user');
        }
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
}