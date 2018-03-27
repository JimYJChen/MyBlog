'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    })
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./post'));
    app.use('/comments', require('./comments'));

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404', {
                blog: app.locals.blog.title
            });
        }
    });
};