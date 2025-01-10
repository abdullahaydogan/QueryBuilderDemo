import axios from 'axios';

const API_URL = 'https://localhost:5001/api/query/process'; 


export const sendQueryToApi = async (queryData) => {
  try {
    const response = await axios.post(API_URL, queryData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Başarılı  response ile kullanıcı listesini döndür
    return response.data;
  } catch (error) {
    console.error('Error sending query to API:', error);
    throw error;
  }
};
