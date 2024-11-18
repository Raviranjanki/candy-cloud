import { Router } from "express";
import {
    deleteCategoryHandler,
    getCategoryHandler,
    storeCategoryHandler,
    updateCategoryHandler,
} from "../controllers/category.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createCategorySchema, updateCategorySchema } from "../validation/category.schema";

const router = Router();

router.get("/", getCategoryHandler);
router.post("/", validateRequest(createCategorySchema), storeCategoryHandler);
router.patch("/:id", validateRequest(updateCategorySchema), updateCategoryHandler);
router.delete("/:id", validateRequest(updateCategorySchema), deleteCategoryHandler);

export const categoryRoutes = router;
