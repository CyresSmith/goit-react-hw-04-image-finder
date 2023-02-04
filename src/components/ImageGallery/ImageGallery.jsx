import { InfinitySpin } from 'react-loader-spinner';
import theme from 'theme';
import { TfiMoreAlt } from 'react-icons/tfi';
import Gallery from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/shared/Button';
import { memo } from 'react';

const ImageGallery = ({
  onClick,
  data,
  setImg,
  loading,
  loadMore,
  page,
  perPage,
  totalHits,
}) => {
  return (
    <>
      <Gallery>
        {data.map(item => {
          const { id } = item;
          return (
            <ImageGalleryItem
              onClick={onClick}
              setImg={setImg}
              key={id}
              item={item}
            />
          );
        })}
      </Gallery>
      {loading && <InfinitySpin width="200" color={theme.colors.accent} />}

      {totalHits > page * perPage && (
        <Button
          endicon={TfiMoreAlt}
          children="Load more"
          iconSize={20}
          mt={5}
          onClick={loadMore}
        />
      )}
    </>
  );
};

export default memo(ImageGallery);
