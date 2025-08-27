import { Router } from "express";
import orderSchema from "../models/Order.js";
import { saveOrder, getOrders } from "../services/OrderService.js";
import { authorizedRole } from "../middleware/AuthorizeRoles.js"

const orderRouter = Router();


orderRouter.post("/create", authorizedRole, async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const newOrder = await saveOrder(value);

    res.status(201).json({ message: "Order created", user: newOrder });
  } catch (err) {
    next(err);
  }
});

orderRouter.get("", async (req, res, next) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in query params" });
    }

    const orders = await getOrders(userId);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});


export default orderRouter;