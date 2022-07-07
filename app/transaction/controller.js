const Transaction = require('./model');
const Player = require('../player/model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }

            const transaction = await Transaction.find().populate('player');

            res.render('admin/transaction/view_index', {
                name: req.session.user.name,
                title: 'Halaman Transaction',
                layout: 'partials/layout',
                transaction,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.query;
            console.log("status:", status);
            await Transaction.findOneAndUpdate({ _id: id }, { status: status });

            req.flash('alertMessage', "Successfully add Transaction");
            req.flash('alertStatus', "success");
            res.redirect('/transaction');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/transaction/create', {
                name: req.session.user.name,
                title: 'Halaman Create Transaction',
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    store: async (req, res) => {
        try {
            const { name, nameTransaction, noRekening } = req.body;
            const transaction = await Transaction({ name, nameTransaction, noRekening });
            await transaction.save();
            req.flash('alertMessage', "Successfully add Transaction");
            req.flash('alertStatus', "success");
            res.redirect('/transaction');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findOne({ _id: id });
            res.render('admin/transaction/edit', {
                name: req.session.user.name,
                title: 'Halaman Edit Transaction',
                layout: 'partials/layout',
                transaction
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, nameTransaction, noRekening } = req.body;

            // console.log(id)
            await Transaction.findOneAndUpdate({ _id: id }, { name, nameTransaction, noRekening });
            req.flash('alertMessage', "Successfully update transaction");
            req.flash('alertStatus', "success");
            res.redirect('/transaction');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Transaction.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove transaction");
            req.flash('alertStatus', "success");
            res.redirect('/transaction');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');

        }
    },
}