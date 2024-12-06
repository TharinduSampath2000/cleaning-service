import User from "../models/User.js";

export const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      await User.create({
        username: "admin",
        password: "Admin@123",
        role: "admin",
      });
    }
  } catch (error) {
    console.error("Admin user creation failed:", error);
  }
}