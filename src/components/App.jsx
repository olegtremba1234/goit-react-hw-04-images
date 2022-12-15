import {useState, useEffect} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./Gallery/ImageGallery";
import imagesApi from "API/API";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import style from "./App.module.css";
import Loader from "./Loader/Loader";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null);
 
useEffect(() => {
   const fetchImages = () => {
    setLoading(true);
    imagesApi({ currentPage, searchQuery })
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Notify.warning(
            'Спробуйте ще раз!'
          );
        }
        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });
        setImages(prevState =>[...prevState, ...newImages])
        setTotal(totalHits)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }
  if(searchQuery){
    fetchImages()
  }
}, [currentPage, searchQuery]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage +1)
  };
    
  const toggleModal = () => {
    setLargeImageURL(null);
  };
  
  const openModal = searchId => {
    const image = images.find(image => image.id === searchId);
    setLargeImageURL(image.largeImageURL);
  };
  
  const handleFormSubmit = query => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  useEffect(()=>{
    setImages([])
  },[searchQuery])
  
  return (
      <div className={style.App}>
        {error && Notify.failure('Sorry, there is some error')}
        <Searchbar onSubmit={handleFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {images.length > 0 &&
          !loading &&
          images.length !== total && (
            <Button onClick={loadMore} />
            )}
        {largeImageURL && (
          <Modal onClose={toggleModal} largeImage={largeImageURL} />
        )}
      </div>
  );
};

export default App;