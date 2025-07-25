import axios from 'axios';

export const login = async (username, password) => {
    return axios.post('/api/login.php', { username, password });
};

export const logout = async () => {
    return axios.post('/api/logout.php');
};

export const getStats = () => axios.get('/api/stats.php');
export const getEntries = () => axios.get('/api/entries.php');
