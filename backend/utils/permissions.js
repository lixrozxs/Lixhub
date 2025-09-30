const canModerate = (req, res, next) => {
  const userRoles = ['MOD', 'ADMIN', 'OWNER'];
  
  if (!userRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions. Moderator access required.' });
  }
  
  next();
};

const canAdmin = (req, res, next) => {
  const adminRoles = ['ADMIN', 'OWNER'];
  
  if (!adminRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions. Admin access required.' });
  }
  
  next();
};

const isOwner = (req, res, next) => {
  if (req.user.role !== 'OWNER') {
    return res.status(403).json({ error: 'Insufficient permissions. Owner access required.' });
  }
  
  next();
};

module.exports = {
  canModerate,
  canAdmin,
  isOwner
};