import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { getAPI } from 'pixabay-api';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // componentDidUpdate = async (_prevProps, prevState) => {
  //   const { search, page } = this.state;

  //   if (prevState.search !== search || prevState.page !== page) {
  //     await this.fetchImages(search, page);
  //   }
  // };

  useEffect(() => {
    if (search === '') return;
    (async () => {
      await fetchImages(search, page);
    })();
    return () => {};
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      // this.setState({ isLoading: true });
      setIsLoading(true);

      // fetch data from API
      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      // Display an error message, if there is no match with the search
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      // Display a success message if it's the first page
      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }

      // Display a message if page is already at the end of data (12 = per_page based on API call)
      if (page * 12 >= totalHits) {
        // this.setState({ isEnd: true });
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.");
      }

      // Update the state with the new images
      // this.setState(prevState => ({
      //   images: [...prevState.images, ...hits],
      // }));

      setImages(prevState => [...prevState, ...hits]);
    } catch {
      // this.setState({ isError: true });
      setIsError(true);
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      // this.setState({ search: newSearch, page: 1, images: [] });
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleClick = () => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {/* Render ImageGallery Component when there is atleast one match of images */}
      {images.length >= 1 && <ImageGallery photos={images} />}

      {/* Render Button Component when there is atleast a second page or more and it's not the end of page */}
      {images.length >= 2 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError && toast.error('Oops, something went wrong! Reload this page!')}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
