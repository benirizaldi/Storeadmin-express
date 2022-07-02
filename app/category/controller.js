const Category = require('./model');
module.exports = {
    index: async(req,res) => {
        try {
            const categories = await Category.find();
            console.log(categories);
            res.render('admin/category/view_category', { 
                layout:'partials/layout',
                categories,
              });
        } catch (err) {
            console.log(err);
        }
    },
    create: async(req,res) => {
        try {
            res.render('admin/category/create', { 
                layout:'partials/layout',
              });
        } catch (err) {
            console.log(err);
        }
    },
    store: async(req,res) => {
        try {
           const {name} = req.body;
           const category = await Category({name});
           await category.save();
           res.redirect('/category');
           
        } catch (err) {
            console.log(err);
        }
    },
}