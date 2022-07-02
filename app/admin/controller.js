module.exports = {
    index: async(req,res) => {
        try {
            res.render('index', { 
                layout:'partials/layout',
              });
        } catch (err) {
            console.log(err);
        }
    }
}