import express from "express"
import authMiddleware from "../middleware/auth.js"
import {placeOrder, verifyOrder, userOrders,allOrders,updateOrderStatus} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/allorders",allOrders)
orderRouter.post("/status",updateOrderStatus)


export default orderRouter;