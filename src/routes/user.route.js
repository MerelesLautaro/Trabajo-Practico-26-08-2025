import { Router } from "express";
import userSchema from "../models/User.js";
import { getUsers, saveUser } from "../services/UserService.js";

const userRouter = Router();

userRouter.post("/create", async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await saveUser(value);

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    next(err);
  }
});

userRouter.get("",async(req, res, next) => {
  try {
    const users = await getUsers();
    
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
