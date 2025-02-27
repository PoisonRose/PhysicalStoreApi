import express from "express";
import lojasRouter from "./routes/lojaRoutes";

const app = express();
app.use(express.json());

const PORTA = 3000

app.use("/lojas", lojasRouter);

app.get("/", (req, res) => {
    res.send("API rodando.");
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando. Porta: ${PORTA}`);
});
