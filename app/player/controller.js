const Player = require('./model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const player = await Player.find();
            res.render('admin/player/view_index', {
                name: req.session.user.name,
                title: 'Halaman Player',
                layout: 'partials/layout',
                player,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/player/create', {
                name: req.session.user.name,
                title: 'Halaman Create Player',
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');
        }
    },
    store: async (req, res) => {
        try {
            const { name, namePlayer, noRekening } = req.body;
            const player = await Player({ name, namePlayer, noRekening });
            await player.save();
            req.flash('alertMessage', "Successfully add Player");
            req.flash('alertStatus', "success");
            res.redirect('/player');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const player = await Player.findOne({ _id: id });
            res.render('admin/player/edit', {
                name: req.session.user.name,
                title: 'Halaman Edit Player',
                layout: 'partials/layout',
                player
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, namePlayer, noRekening } = req.body;

            // console.log(id)
            await Player.findOneAndUpdate({ _id: id }, { name, namePlayer, noRekening });
            req.flash('alertMessage', "Successfully update player");
            req.flash('alertStatus', "success");
            res.redirect('/player');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Player.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove player");
            req.flash('alertStatus', "success");
            res.redirect('/player');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/player');

        }
    },
}