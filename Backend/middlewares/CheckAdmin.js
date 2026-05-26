// export default (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(400).json({ msg: 'You are not an admin' })
//     }
//     next()
// }


const Admin = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ msg: "Admin only access" });
    }

    next();
  };
};

export default Admin;