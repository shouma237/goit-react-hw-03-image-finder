import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhotos } from 'pixabay-api';

export class App extends Component {
  state = {};

  componentDidUpdate = (_prevProps, prevState) => {};

  handleSubmit = () => {};

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <Button />
        <ImageGallery />
        <ImageGalleryItem />
        <Loader />
        <Modal />
      </div>
    );
  }
}
