import express from "express";

const app = express();
app.use(express.json());

const PORTA = 3000

app.get("/", (req, res) => {
    res.send("API rodando.");
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando. Porta: ${PORTA}`);
});
