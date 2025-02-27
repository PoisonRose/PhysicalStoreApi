import axios from "axios";

export const distanciaHaversine = async (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const calcularLatLonDeCEP = async (cep: string) => {
    const viaCepRes = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { localidade, uf, logradouro } = viaCepRes.data;

    const nominatimRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${logradouro},${localidade},${uf}`
    );

    const { lat, lon } = nominatimRes.data[0];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) }
};
