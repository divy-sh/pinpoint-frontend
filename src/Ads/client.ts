import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const ADS_API= `${BASE_API}/api/ads`;

const api = axios.create({
    withCredentials: true
});

export const findAdByUser = async (userid: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`${ADS_API}/${userid}`, { headers: { 'Authorization': `Bearer ${token}`, } });
        return response.data;
    } catch (error) {
        console.error("Error fetching ads by user:", error);
        throw error;
    }
};

export const findAllAds = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`${ADS_API}`, { headers: { 'Authorization': `Bearer ${token}`, } });
        return response.data;
    } catch (error) {
        console.error("Error fetching all ads:", error);
        throw error;
    }
};

export const createAd = async (ad: any) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post(`${ADS_API}`, ad, { headers: { 'Authorization': `Bearer ${token}`, } });
        return response.data;
    } catch (error) {
        console.error("Error creating ad:", error);
        throw error;
    }
};

export const updateAd = async (adId: string, ad: any)=> {
    try {
        const token: string | null = localStorage.getItem('token');
        const response = await api.put(`${ADS_API}/${adId}`, ad, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error updating ad:", error);
        throw error;
    }
};

export const deleteAd = async (adId: string)=> {
    try {
        const token: string | null = localStorage.getItem('token');
        const response = await api.delete(`${ADS_API}/${adId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error deleting ad:", error);
        throw error;
    }
};

export const getRandomAd = async () => {
    const Response = await api.get(`${BASE_API}/api/randomad`)
    return Response.data;
}