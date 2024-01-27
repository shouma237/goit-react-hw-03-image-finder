import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'pixabay-api';

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
    this.setState({ search: newSearch });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  //FIXME: NEW SEARCH WILL HAVE A NEW START FOR IMAGES
  componentDidUpdate = async (_prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, isError: false });

        // fetch data
        const fetchedImages = await fetchImages(search, page);
        const { hits, totalHits } = fetchedImages;

        console.log(hits, totalHits);

        if (page < 2) {
          alert(`Hooray! We found ${totalHits} images!`);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch {
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { images, isLoading, isError } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery photos={images} />}
        {images.length > 1 && <Button onClick={this.handleClick} />}
        {isLoading && <Loader />}
        {isError && alert('Oops, something went wrong! Reload this page!')}
      </div>
    );
  }
}
