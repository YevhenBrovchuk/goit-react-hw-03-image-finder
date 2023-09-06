import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImagesGalleryImage = ({ items }) => {
  return (
    <>
      <ImageGalleryItemImage src={items} alt="" />
    </>
  );
};
