import express from "express";
import { adicionarLoja, buscarLojasProximas } from "../controllers/lojasController";

const router = express.Router();

router.post("/", adicionarLoja);
router.get("/proximas/:cep", buscarLojasProximas);

export default router;
