const allowAnonymousOrAdmin = (req, res, next) => {
  if (req.session?.user?.type === 'admin' || req.session?.user?.type === 'anonymous') {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized', authorized: false });
};

export default allowAnonymousOrAdmin;