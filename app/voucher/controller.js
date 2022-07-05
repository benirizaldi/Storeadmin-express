const Voucher = require('./model');
const Nominal = require('../nominal/model');
const Category = require('../category/model');
const path = require('path');
const config = require('../../config')
const fs = require('fs');
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            const voucher = await Voucher.find().populate('category').populate('nominal');

            res.render('admin/voucher/view_index', {
                name: req.session.user.name,
                title: 'Halaman Voucher',
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
            const category = await Category.find();
            const nominal = await Nominal.find();
            res.render('admin/voucher/create', {
                name: req.session.user.name,
                title: 'Halaman Edit Voucher',
                layout: 'partials/layout',
                category,
                nominal
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    store: async (req, res) => {
        try {
            const { name, category, nominal } = req.body;
            // const voucher = await Voucher({ name, category, nominal });
            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest)
                src.on('end', async () => {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominal,
                            thumbnail: filename
                        });
                        await voucher.save();
                        req.flash('alertMessage', "Successfully add Voucher");
                        req.flash('alertStatus', "success");
                        res.redirect('/voucher');

                    } catch (error) {
                        req.flash('alertMessage', `${error.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                })
            } else {
                const voucher = new Voucher({
                    name,
                    category,
                    nominal,
                });
                await voucher.save();
                req.flash('alertMessage', "Successfully add Voucher");
                req.flash('alertStatus', "success");
                res.redirect('/voucher');
            }

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.find();
            const nominal = await Nominal.find();
            const voucher = await Voucher.findOne({ _id: id });
            res.render('admin/voucher/edit', {
                name: req.session.user.name,
                title: 'Halaman Edit Voucher',
                layout: 'partials/layout',
                voucher,
                category,
                nominal
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
            const { name, category, nominal } = req.body;
            // const voucher = await Voucher({ name, category, nominal });
            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest)
                src.on('end', async () => {
                    try {
                        const voucher = await Voucher.findOne({ _id: id });
                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }
                        await Voucher.findOneAndUpdate({ _id: id }, {
                            name,
                            category,
                            nominal,
                            thumbnail: filename
                        });
                        req.flash('alertMessage', "Successfully updated Voucher");
                        req.flash('alertStatus', "success");
                        res.redirect('/voucher');

                    } catch (error) {
                        req.flash('alertMessage', `${error.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                })
            } else {
                await Voucher.findOneAndUpdate({ _id: id }, {
                    name,
                    category,
                    nominal,
                });
                req.flash('alertMessage', "Successfully add Voucher");
                req.flash('alertStatus', "success");
                res.redirect('/voucher');
            }

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            let voucher = await Voucher.findOne({ _id: id });
            let status = voucher.status === 'Y' ? 'N' : 'Y'
            voucher = await Voucher.findOneAndUpdate({
                _id: id
            }, { status })
            req.flash('alertMessage', "Successfully update Voucher Status");
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
            const voucher = await Voucher.findOneAndDelete({ _id: id });
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }
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