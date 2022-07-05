module.exports = {
    index: async (req, res) => {
        try {
            res.render('index', {
                name: req.session.user.name,
                title: 'Halaman Dashboard',
                layout: 'partials/layout',
            });
        } catch (err) {
            console.log(err);
        }
    }
}