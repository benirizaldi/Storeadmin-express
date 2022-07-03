const Voucher = require('./model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const voucher = await Voucher.find();
            res.render('admin/voucher/view_index', {
                layout: 'partials/layout',
                voucher,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/voucher/create', {
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    store: async (req, res) => {
        try {
            const { coinQuantity, coinName, price } = req.body;
            const voucher = await Voucher({ coinQuantity, coinName, price });
            await voucher.save();
            req.flash('alertMessage', "Successfully add Voucher");
            req.flash('alertStatus', "success");
            res.redirect('/voucher');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({ _id: id });
            res.render('admin/voucher/edit', {
                layout: 'partials/layout',
                voucher
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinQuantity, coinName, price } = req.body;

            // console.log(id)
            await Voucher.findOneAndUpdate({ _id: id }, { coinQuantity, coinName, price });
            req.flash('alertMessage', "Successfully update voucher");
            req.flash('alertStatus', "success");
            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Voucher.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove voucher");
            req.flash('alertStatus', "success");
            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');

        }
    },
}