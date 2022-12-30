import api from "../index";

const path = "/languages";

const LanguageService = {
    list: (filters = '') => {
        return api.get(`${path}?${filters}`);
    },
    get: (id) => {
        return api.get(`${path}/${id}`);
    },
    create: (data) => {
        return api.post(`${path}`, data);
    },
    update: (id, data) => {
        return api.put(`${path}/${id}`, data);
    },
    patch : (id, data) => {
        return api.patch(`${path}/${id}`, data);
    },
    delete: (id) => {
        return api.delete(`${path}/${id}`);
    },
}

export default LanguageService;


