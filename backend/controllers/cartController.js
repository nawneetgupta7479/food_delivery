import userModel from "../models/userModels.js";

// Add to user cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate required fields
    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists as an object
    const cartData = userData.cartData || {};

    // Increment item count or initialize with 1
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Update user's cartData
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove from user cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate required fields
    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists as an object
    const cartData = userData.cartData || {};

    // Check if the item exists in the cart
    if (!cartData[itemId]) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    // Decrement the quantity or remove the item if quantity reaches zero
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    // Update user's cartData
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
export const fetchCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate required field
    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists as an object
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
