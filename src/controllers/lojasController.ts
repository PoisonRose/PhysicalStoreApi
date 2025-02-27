import { Request, Response } from "express";
import dbPromise from "../dbconfig/db";

export const adicionarLoja = async (req: Request, res: Response) => {
    const { nome, cep, rua, numero, cidade } = req.body;

    try {
        // TODO: obter latitude e longitude do CEP, adicionar em const aqui e adicionar depois no db.run.

        const db = await dbPromise;
        db.run(
            "INSERT INTO lojas (nome, cep, rua, numero, cidade) VALUES (?, ?, ?, ?, ?)",
            [nome, cep, rua, numero, cidade]
        );

        res.status(201).send("loja adicionada com sucesso");
    } catch (error) {
        console.log("erro ao adicionar loja", error);
        res.status(500).send("Erro ao adicionar loja");
    }
};
