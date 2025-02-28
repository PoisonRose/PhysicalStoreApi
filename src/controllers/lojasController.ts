import { Request, Response } from "express";
import dbPromise from "../dbconfig/db";
import { calcularLatLonDeCEP, distanciaHaversine, } from "../utils/geoUtils";

export const adicionarLoja = async (req: Request, res: Response) => {
    const { nome, cep, numero } = req.body;

    try {
        const { latitude, longitude } = await calcularLatLonDeCEP(cep);

        const db = await dbPromise;
        db.run(
            "INSERT INTO lojas (nome, cep, numero, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
            [nome, cep, numero, latitude, longitude]
        );

        res.status(201).send("loja adicionada com sucesso");
    } catch (error) {
        console.error("erro ao adicionar loja", error);
        res.status(500).send("Erro ao adicionar loja");
    }
};

export const buscarLojasProximas = async (req: Request, res: Response): Promise<void> => {
    const { cep } = req.params;

    if (!cep) {
        res.status(400).send("Por favor digite o CEP");
    }

    try {
        const { latitude: cepLat, longitude: cepLon } = await calcularLatLonDeCEP(cep as string);
        
        const db = await dbPromise;
        const lojas = await db.all("SELECT * FROM lojas");

        const lojasProximas = lojas.filter((loja) => {
            const distancia = distanciaHaversine(cepLat, cepLon, loja.latitude, loja.longitude);
            return distancia <= 100;
        });

        if (lojasProximas.length === 0) {
            res.status(404).send("Nenhuma loja encontrada em um raio de 100km.");
            return;
        }

        lojasProximas.sort((a, b) => {
            const distanciaA = distanciaHaversine(cepLat, cepLon, a.latitude, a.longitude);
            const distanciaB = distanciaHaversine(cepLat, cepLon, b.latitude, b.longitude);
            return distanciaA - distanciaB;
        });

        res.status(200).json(lojasProximas);
    } catch (error) {
        console.error("Erro ao buscar lojas proximas", error);
        res.status(500).send("Erro ao buscar lojas proximas");
    }
};
