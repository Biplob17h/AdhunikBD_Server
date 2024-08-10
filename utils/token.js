import jwt from "jsonwebtoken";
const generateToken = (user) => {
  const payload = {
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7days",
  });

  return token;
};

export default generateToken;
