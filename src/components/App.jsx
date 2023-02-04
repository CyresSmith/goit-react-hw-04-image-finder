import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { TiArrowUpThick } from 'react-icons/ti';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from './shared/Services/fetchImages';
import Section from './shared/Section';
import Modal from './Modal';
import ScrollUpBtn from './shared/ScrollUpButton/ScrollUpBtn';
import { useCallback } from 'react';
import { useLockBodyScroll, useToggle } from 'react-use';

const App = () => {
  const perPage = 30;
  const [searchQuery, setSearchQuery] = useState({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { query } = searchQuery;

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);

    const fetchData = async () => {
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

    fetchData()
      .then(result => setData(prevState => [...prevState, ...result]))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearchQuery = useCallback(searchQuery => {
    setSearchQuery(({ query: prevQuery }) => {
      const { query } = searchQuery;
      if (prevQuery === query) {
        return searchQuery;
      } else {
        setData([]);
        setPage(1);
        return searchQuery;
      }
    });
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal(prevState => !prevState);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  // const body = document.querySelector('body');

  return (
    <>
      {/* {showModal
        ? body.classList.add('overflow-hidden')
        : body.classList.remove('overflow-hidden')} */}
      <Searchbar onSubmit={handleSearchQuery} />
      <Section
        title={
          !loading && totalHits
            ? `Here are Your ${totalHits} pictures for query "${query}".`
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
          showModal={showModal}
          children={<img src={modalImg.imgUrl} alt={modalImg.alt} />}
        ></Modal>
      )}
      {error &&
        Report.failure('Something went wrong, please try again', { error })}
    </>
  );
};

export default App;
