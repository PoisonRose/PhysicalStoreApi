import express from "express";
import { adicionarLoja } from "../controllers/lojasController";

const router = express.Router();

router.post("/", adicionarLoja);

export default router;
