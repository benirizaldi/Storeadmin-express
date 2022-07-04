const Bank = require('./model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const bank = await Bank.find();
            res.render('admin/bank/view_index', {
                layout: 'partials/layout',
                bank,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/bank/create', {
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    store: async (req, res) => {
        try {
            const { coinQuantity, coinName, price } = req.body;
            const bank = await Bank({ coinQuantity, coinName, price });
            await bank.save();
            req.flash('alertMessage', "Successfully add Bank");
            req.flash('alertStatus', "success");
            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id });
            res.render('admin/bank/edit', {
                layout: 'partials/layout',
                bank
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinQuantity, coinName, price } = req.body;

            // console.log(id)
            await Bank.findOneAndUpdate({ _id: id }, { coinQuantity, coinName, price });
            req.flash('alertMessage', "Successfully update bank");
            req.flash('alertStatus', "success");
            res.redirect('/bank');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Bank.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully remove bank");
            req.flash('alertStatus', "success");
            res.redirect('/bank');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');

        }
    },
}