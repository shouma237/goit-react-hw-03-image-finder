import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { getAPI } from 'pixabay-api';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    isLoading: false,
    isError: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const newSearch = e.target.search.value.trim().toLowerCase();
    this.setState({ search: newSearch, page: 1, images: [] });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, isError: false });

        // fetch data
        const fetchedImages = await getAPI(search, page);
        const { hits, totalHits } = fetchedImages;

        console.log(hits, totalHits);

        if (page < 2) {
          toast.success(`Hooray! We found ${totalHits} images!`);
        }

        // Update the state with the new images or reset the images array for a new search
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (err) {
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { images, isLoading, isError } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery photos={images} />}
        {images.length > 1 && <Button onClick={this.handleClick} />}
        {isLoading && <Loader />}
        {isError &&
          toast.error('Oops, something went wrong! Reload this page!')}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }
}
