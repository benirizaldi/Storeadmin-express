const Nominal = require('./model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const nominal = await Nominal.find();
            res.render('admin/nominal/view_nominal', {
                layout: 'partials/layout',
                nominal,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/nominal/create', {
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
        }
    },
    store: async (req, res) => {
        try {
            const { coinQuantity, coinName, price } = req.body;
            const nominal = await Nominal({ coinQuantity, coinName, price });
            await nominal.save();
            req.flash('alertMessage', "Successfully add Nominal");
            req.flash('alertStatus', "success");
            res.redirect('/nominal');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const nominal = await Nominal.findOne({ _id: id });
            res.render('admin/nominal/edit', {
                layout: 'partials/layout',
                nominal
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinQuantity, coinName, price } = req.body;

            // console.log(id)
            await Nominal.findOneAndUpdate({ _id: id }, { coinQuantity, coinName, price });
            req.flash('alertMessage', "Successfully update nominal");
            req.flash('alertStatus', "success");
            res.redirect('/nominal');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Nominal.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove nominal");
            req.flash('alertStatus', "success");
            res.redirect('/nominal');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');

        }
    },
}