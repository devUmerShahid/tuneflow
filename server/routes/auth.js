// server/routes/auth.js
import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// REMOVE protect from register & login
router.post("/register", registerUser);     // No protect
router.post("/login", loginUser);           // No protect
router.get("/logout", logoutUser);
router.get("/me", protect, getMe);          // Only this needs protect        

export default router;





// import express from "express";
// import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
// import protect from "../middleware/protect.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/logout",protect, logoutUser);
// router.get("/me",protect, getMe);

// export default router;