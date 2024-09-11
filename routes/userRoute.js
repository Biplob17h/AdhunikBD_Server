import express from "express";
import {
  changeUserPassword,
  createAUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUserProfile,
  userLogIn,
  userLogout,
} from "../controller/userController.js";
import verifyUser from "../utils/verifyUser.js";

const userRouter = express.Router();

// ALL POSTS
userRouter.post("/signup", createAUser);
userRouter.post("/login", userLogIn);
userRouter.post("/logout", userLogout);

// ALL GETS
userRouter.get("/allUsers", getAllUser);
userRouter.get("/getUser", verifyUser, getUser);

// ALL UPDATES
userRouter.patch("/updateUser", updateUserProfile);
userRouter.patch("/changePassword", changeUserPassword)

// ALL DELETES
userRouter.delete("/deleteUser", deleteUser)

export default userRouter;
