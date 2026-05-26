// import jwt from "jsonwebtoken";

// const checkToken = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ msg: "Token is required" });
//     }

//     // const decoded = jwt.verify(token, "MY_KEY_FOR_TOKEN");
//     const decoded = jwt.verify(token, process.env.MY_KEY_FOR_TOKEN);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// };

// export default checkToken;


import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default checkToken;