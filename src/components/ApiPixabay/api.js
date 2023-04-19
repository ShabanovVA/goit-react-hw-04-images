import axios from "axios";

const BASE_URL_API = 'https://pixabay.com/api/';
const KEY_API = '33744898-780f39bcdd67c478afa941924';
const PER_PAGE = 12;

export async function getApiPixabay(searchQuery, page) {
    const response = await axios.get(
        `${BASE_URL_API}?q=${searchQuery}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    return response;
}