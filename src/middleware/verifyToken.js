const jwt = require("jsonwebtoken");

function checkAdmin(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(422).json({ errors: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    const { isAdmin } = verified;
    if (!isAdmin) return res.status(401).json({ errors: "Unauthorized" });
    req.user = verified;
    next();
  } catch (err) {
    return res.status(422).json({ errors: "Invalid a token" });
  }
}
function checkToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(422).json({ errors: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(422).json({ errors: "Invalid a token" });
  }
}

exports.checkAdmin = checkAdmin;
exports.checkToken = checkToken;
