import axios from "axios";
import { Config } from "@/config"; // Importar las configuraciones dinámicas

const axiosInstance = axios.create({
  baseURL: Config.API_URL, // Ahora es dinámico
  headers: {
    "x-client-id": Config.CLIENT_ID, // Ahora usamos la configuración centralizada
  },
  timeout: 5000,
});

export default axiosInstance;
