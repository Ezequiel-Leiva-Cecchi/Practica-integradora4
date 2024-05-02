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

export const requireAdminAuth = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
};

export const requireUserAuth = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'User') {
        return next();
    }
    return res.status(403).json({ error: 'Forbidden. User access required.' });
};
