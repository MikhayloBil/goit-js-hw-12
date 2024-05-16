import axios from 'axios';

const API_KEY = '43797982-65d97265afa84a551e725288a';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, page = 1, perPage = 15) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export { fetchImages };