import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from './shared/Services/fetchImages';
import Section from './shared/Section';
import Modal from './Modal';

const searchQueryInitialState = {
  query: '',
  page: 1,
  perPage: 30,
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const { query, page, perPage } = searchQuery;
    fetchData(query, page, perPage)
      .then(result => setData(prevState => [...prevState, ...result]))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const handleSearchQuery = searchQuery => {
    setSearchQuery(prevState => ({ ...prevState, query: searchQuery }));
  };

  const fetchData = async (query, page, perPage) => {
    try {
      const { hits, totalHits } = await fetchImages(query, page, perPage);
      if (hits.length === 0) {
        Report.failure('No images found for Your request!');
      }
      setTotalHits(totalHits);
      return hits;
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const loadMore = () => {
    setSearchQuery(prevState => {
      const { page } = prevState;
      return { ...prevState, page: page + 1 };
    });
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
            ? `Here are Your ${totalHits} pictures for query "${searchQuery.query}".`
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
          page={searchQuery.page}
          perPage={searchQuery.perPage}
          totalHits={totalHits}
        />
      </Section>
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
