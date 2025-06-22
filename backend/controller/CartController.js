const User = require("../model/UserModel");

const addToCart = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;

  try {
    // Populate path must match the schema
    let user = await User.findById(userId).populate("cart.courses.course");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseExists = user.cart.courses.find(
      (item) => item.course._id.toString() === courseId
    );

    if (courseExists) {
      return res.status(400).json({ message: "Course already in cart" });
    }

    user.cart.courses.push({ course: courseId });
    await user.save();

    res
      .status(201)
      .json({ message: "Course added to cart", cart: user.cart.courses });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove course from cart
const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseIndex = user.cart.courses.findIndex(
      (item) => item.course.toString() === courseId
    );

    if (courseIndex === -1) {
      return res.status(404).json({ message: "Course not found in cart" });
    }

    user.cart.courses.splice(courseIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Course removed from cart", cart: user.cart.courses });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    // Populate path must match the schema
    const user = await User.findById(userId).populate("cart.courses.course");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart.courses);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  const userId = req.userId;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart.courses = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared", cart: user.cart.courses });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getUserCart,
  clearCart,
};
