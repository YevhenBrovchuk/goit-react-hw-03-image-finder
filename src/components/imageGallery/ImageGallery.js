import { ImagesGalleryImage } from 'components/imageGalleryItem/ImageGalleryItem';
import { ImageGalleryItem, ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ items, openModalImg }) => {
  return (
    <ImageGalleryUl>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          onClick={() => openModalImg(item.largeImageURL)}
        >
          <ImagesGalleryImage items={item.webformatURL} />
        </ImageGalleryItem>
      ))}
    </ImageGalleryUl>
  );
};
