import { Router } from "express";
import { deleteProductHandler, getProductsHandler, storeProductHandler, updateProductHandler } from "../controllers/product.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createProductSchema, updateProductSchema } from "../validation/product.schema";

const router = Router();

router.get("/", getProductsHandler);
router.post("/", validateRequest(createProductSchema), storeProductHandler);
router.patch("/:id", validateRequest(updateProductSchema), updateProductHandler);
router.delete("/:id", validateRequest(updateProductSchema), deleteProductHandler);

export const productRoutes = router;
