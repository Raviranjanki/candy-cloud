import { Router } from "express";
import { registerHandler } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema } from "../validation/user.schema";

const router = Router();

router.post("/register", validateRequest(createUserSchema), registerHandler);

export const userRoutes = router;
