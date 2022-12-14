import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./Gallery/ImageGallery";
import imagesApi from "API/API";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import style from "./App.module.css";
import Loader from "./Loader/Loader";

export default class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    largeImageURL: null,
    currentPage: 1,
    total: 0,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ images: [] });
    }
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ loading: true });
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ currentPage: 1 });
    this.setState({ searchQuery: query });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ loading: true });

    imagesApi(options)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Notify.warning(
            'Спробуйте ще раз!'
          );
        }

        if (totalHits === 0) {
          return Notify.info(
            'Тут пусто, введіть інше слово для пошуку'
          );
        }

        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  toggleModal = () => {
    this.setState(({ largeImageURL }) => ({
      largeImageURL: null
    }));
  };

  openModal = searchId => {
    const image = this.state.images.find(image => image.id === searchId);
    this.setState({ largeImageURL: image.largeImageURL });
  };

  render() {
    const { images, loading, error, largeImageURL } = this.state;
    return (
      <div className={style.App}>
        {error && Notify.failure('Sorry, there is some error')}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {images.length > 0 &&
          !loading &&
          images.length !== this.state.total && (
            <Button onClick={this.loadMore} />
          )}
        {largeImageURL && (
          <Modal onClose={this.toggleModal} largeImage={largeImageURL} />
        )}
      </div>
    );
  }
};
