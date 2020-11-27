import axios from 'axios';

const LIST_API_BASE_URL = "http://localhost:8080/task-list";

class ListService {

    getLists() {
        return axios.get(LIST_API_BASE_URL);
    }

    getListById(ListId) {
        return axios.get(LIST_API_BASE_URL + '/' + ListId);
    }

    createList(List) {
        return axios.post(LIST_API_BASE_URL, List);
    }

    updateList(List, ListId) {
        return axios.put(LIST_API_BASE_URL + '/' + ListId, List);
    }

    deleteList(ListId) {
        return axios.delete(LIST_API_BASE_URL + '/' + ListId);
    }
}

export default new ListService()