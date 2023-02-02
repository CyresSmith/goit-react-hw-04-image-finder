import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { TiArrowUpThick } from 'react-icons/ti';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from './shared/Services/fetchImages';
import Section from './shared/Section';
import Modal from './Modal';
import ScrollUpBtn from './shared/ScrollUpButton/ScrollUpBtn';

const App = () => {
  const perPage = 30;
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);
    fetchData(searchQuery, page, perPage)
      .then(result => setData(prevState => [...prevState, ...result]))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const fetchData = async (searchQuery, page, perPage) => {
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);
      if (hits.length === 0) {
        Report.failure('No images found for Your request!');
      }
      setTotalHits(totalHits);
      return hits;
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchQuery = query => {
    setData([]);
    setPage(1);
    setSearchQuery(query);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const body = document.querySelector('body');

  return (
    <>
      {showModal
        ? body.classList.add('overflow-hidden')
        : body.classList.remove('overflow-hidden')}
      <Searchbar onSubmit={handleSearchQuery} />
      <Section
        title={
          !loading && totalHits
            ? `Here are Your ${totalHits} pictures for query "${searchQuery}".`
            : 'Start search images!'
        }
        titleVariant="subTitle"
        titleAs="h2"
      >
        <ImageGallery
          data={data}
          onClick={toggleModal}
          setImg={setModalImg}
          loading={loading}
          loadMore={loadMore}
          page={page}
          perPage={perPage}
          totalHits={totalHits}
        />
      </Section>
      <ScrollUpBtn
        icon={TiArrowUpThick}
        iconSize={30}
        round={true}
      ></ScrollUpBtn>
      {showModal && (
        <Modal
          onClick={toggleModal}
          children={<img src={modalImg.imgUrl} alt={modalImg.alt} />}
        ></Modal>
      )}
      {error &&
        Report.failure('Something went wrong, please try again', { error })}
    </>
  );
};

export default App;
