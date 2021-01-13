import { Router } from "express";
import download from "./video";

const router = Router();

router.use('/api/download', download);

export default router;
