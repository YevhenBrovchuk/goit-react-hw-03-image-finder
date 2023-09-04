import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItems = ({ items }) => {
  return (
    <>
      <ImageGalleryItemImage src={items} alt="" />
    </>
  );
};
