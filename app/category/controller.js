const Category = require('./model');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const category = await Category.find();
            res.render('admin/category/view_category', {
                name: req.session.user.name,
                title: 'Halaman Category',
                layout: 'partials/layout',
                category,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    create: async (req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: 'Halaman Create Category',
                layout: 'partials/layout',
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    store: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category({ name });
            await category.save();
            req.flash('alertMessage', "Successfully add category");
            req.flash('alertStatus', "success");
            res.redirect('/category');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            res.render('admin/category/edit', {
                name: req.session.user.name,
                title: 'Halaman Edit Category',
                layout: 'partials/layout',
                category
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            // console.log(id)
            await Category.findOneAndUpdate({ _id: id }, { name });
            req.flash('alertMessage', "Successfully update category");
            req.flash('alertStatus', "success");
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');

        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndDelete({ _id: id });
            req.flash('alertMessage', "Successfully delete category");
            req.flash('alertStatus', "success");
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');

        }
    },
}