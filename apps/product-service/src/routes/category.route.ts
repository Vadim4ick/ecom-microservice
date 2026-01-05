import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { shouldBeAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/", shouldBeAdmin, createCategory);
router.get("/", shouldBeAdmin, getCategories);
router.put("/:id", shouldBeAdmin, updateCategory);
router.delete("/:id", deleteCategory);

export default router;
