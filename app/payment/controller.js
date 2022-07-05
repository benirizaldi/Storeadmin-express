const Payment = require('./model');
const Bank = require('../bank/model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const payment = await Payment.find().populate('banks');
            res.render('admin/payment/view_index', {
                name: req.session.user.name,
                title: 'Halaman Payment',
                layout: 'partials/layout',
                payment,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    create: async (req, res) => {
        try {
            const bank = await Bank.find();
            res.render('admin/payment/create', {
                name: req.session.user.name,
                title: 'Halaman Create Payment',
                layout: 'partials/layout',
                bank
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    store: async (req, res) => {
        try {
            const { type, banks } = req.body;
            const payment = await Payment({ type, banks });
            await payment.save();
            req.flash('alertMessage', "Successfully add Payment");
            req.flash('alertStatus', "success");
            res.redirect('/payment');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findOne({ _id: id });
            const bank = await Bank.find();
            res.render('admin/payment/edit', {
                name: req.session.user.name,
                title: 'Halaman Edit Payment',
                layout: 'partials/layout',
                payment,
                bank
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { type, banks } = req.body;

            // console.log(id)
            await Payment.findOneAndUpdate({ _id: id }, { type, banks });
            req.flash('alertMessage', "Successfully update payment");
            req.flash('alertStatus', "success");
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');

        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            let payment = await Payment.findOne({ _id: id });
            let status = payment.status === 'Y' ? 'N' : 'Y'
            await Payment.findOneAndUpdate({
                _id: id
            }, { status })
            req.flash('alertMessage', "Successfully update Payment Status");
            req.flash('alertStatus', "success");
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Payment.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove payment");
            req.flash('alertStatus', "success");
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');

        }
    },
}