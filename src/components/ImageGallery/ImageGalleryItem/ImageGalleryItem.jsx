import Box from 'components/shared/Box';
import { PhotoCard, Img, InfoItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ onClick, item, setImg }) => {
  const {
    id,
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  return (
    <PhotoCard
      onClick={() => {
        setImg({
          imgUrl: largeImageURL,
          alt: tags,
        });
        onClick();
      }}
      key={id}
    >
      <Img src={webformatURL} alt={tags} loading="lazy" />
      <Box display="flex" flexWrap="wrap" pl={4} pr={4}>
        <InfoItem>
          <b>Likes:</b> {likes}.
        </InfoItem>
        <InfoItem>
          <b>Views:</b> {views}.
        </InfoItem>
        <InfoItem>
          <b>Comments:</b> {comments}.
        </InfoItem>
        <InfoItem>
          <b>Downloads:</b> {downloads}.
        </InfoItem>
      </Box>
      {/* <a href={largeImageURL}></a> */}
    </PhotoCard>
  );
};

export default ImageGalleryItem;
