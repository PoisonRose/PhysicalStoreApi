import { Request, Response } from "express";
import dbPromise from "../dbconfig/db";
import { calcularLatLonDeCEP, distanciaHaversine, } from "../utils/geoUtils";
import logger from "../config/logger";
import axios from "axios";

export const adicionarLoja = async (req: Request, res: Response) => {
    const { nome, cep, numero } = req.body;

    try {
        const { latitude, longitude } = await calcularLatLonDeCEP(cep);

        const viacepInfo = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const { estado, localidade, logradouro } = viacepInfo.data;

        const db = await dbPromise;
        db.run(
            "INSERT INTO lojas (nome, cep, estado, cidade, rua, numero, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nome, cep, estado, localidade, logradouro, numero, latitude, longitude]
        );

        logger.info(`Loja "${nome}" adicionada com sucesso.`);

        res.status(201).send("loja adicionada com sucesso");
    } catch (error) {
        logger.error("erro ao adicionar loja", error);
        res.status(500).send("Erro ao adicionar loja");
    }
};

export const buscarLojasProximas = async (req: Request, res: Response): Promise<void> => {
    const { cep } = req.params;

    if (!cep) {
        logger.warn("CEP não fornecido na requisição");
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
            logger.warn(`Nenhuma loja encontrada para o CEP ${cep}`);
            res.status(404).send("Nenhuma loja encontrada em um raio de 100km.");
            return;
        }

        lojasProximas.sort((a, b) => {
            const distanciaA = distanciaHaversine(cepLat, cepLon, a.latitude, a.longitude);
            const distanciaB = distanciaHaversine(cepLat, cepLon, b.latitude, b.longitude);
            return distanciaA - distanciaB;
        });

        const retorno = lojasProximas.map((loja) => {
            return { nome: loja.nome, estado: loja.estado, cidade: loja.cidade, rua: loja.rua, numero: loja.numero }
        });
        logger.info(`Lojas próximas encontradas para o CEP ${cep}`);
        res.status(200).json(retorno);
    } catch (error) {
        logger.error(`Erro ao buscar lojas proximas para o cep ${cep}: `, error);
        res.status(500).send("Erro ao buscar lojas proximas");
    }
};
