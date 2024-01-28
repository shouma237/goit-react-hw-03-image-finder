import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import ImageModal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    selectedPhoto: null,
  };

  openModal = () => {
    this.setState({
      selectedPhoto: this.props.largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ selectedPhoto: null });
  };

  render() {
    const { selectedPhoto } = this.state;
    const { webformatURL, tags } = this.props;

    return (
      <li className={css.imageGalleryItem} onClick={this.openModal}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
        <ImageModal
          modalClose={this.closeModal}
          modalOpen={selectedPhoto !== null}
          image={selectedPhoto}
        />
      </li>
    );
  }
}
