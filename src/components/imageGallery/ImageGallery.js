import { ImageGalleryItems } from 'components/imageGalleryItem/ImageGalleryItem';
import { ImageGalleryItem, ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ items, openModalImg }) => {
  return (
    <ImageGalleryUl>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          onClick={() => openModalImg(item.webformatURL)}
        >
          <ImageGalleryItems items={item.largeImageURL} />
        </ImageGalleryItem>
      ))}
    </ImageGalleryUl>
  );
};
