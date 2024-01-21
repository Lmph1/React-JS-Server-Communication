import axios from "axios";

export const api = axios.create(
    {
        baseURL: 'https://ams.hrd-edu.info/api'

    }
)