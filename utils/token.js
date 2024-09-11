import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
  const payload = {
    userId,
  };
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7days",
  });

  res.cookie("adhunik_token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
  });

  return token;
};

export default generateToken;
