export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

export const checkExistingUser = (req, res, next) => {
    if (req.session.user && (req.path === '/login' || req.path === '/register')) {
        return res.redirect('/');
    }
    next();
};
