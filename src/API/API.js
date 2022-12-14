import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31150513-9b7f6125ef75933b7b2520949';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
    const params = {
        key: KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safeSearch: true,
        page: currentPage,
        per_page: pageSize,
    };

    return axios({ params }).then(response => response.data);
};

export default fetchImages;