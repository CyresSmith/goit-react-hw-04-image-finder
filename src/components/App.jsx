import { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from './shared/Services/fetchImages';
import fetchImgForModal from './shared/Services/fetchImgForModal';
import Section from './shared/Section';
import Modal from './Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 30,
    data: [],
    totalHits: null,
    showModal: false,
    modalImg: null,
    loading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { fetchData } = this;
    const { searchQuery, page, perPage } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      fetchData(searchQuery, page, perPage)
        .then(result =>
          this.setState(({ data }) => ({ data: [...data, ...result] }))
        )
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  setSearchQuery = ({ searchQuery }) => {
    this.setState({ searchQuery, page: 1, data: [] });
  };

  fetchData = async (searchQuery, page, perPage) => {
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);
      if (hits.length === 0) {
        Report.failure('No images found for Your request!');
      }
      this.setState({ totalHits });
      return hits;
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  fetchImgForModal = async imgUrl => {
    fetchImgForModal(imgUrl);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImg = imgObj => {
    this.setState({ modalImg: imgObj });
  };

  loadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  render() {
    const { setSearchQuery, toggleModal, setModalImg, loadMore } = this;
    const {
      data,
      showModal,
      modalImg,
      loading,
      error,
      page,
      perPage,
      totalHits,
      searchQuery,
    } = this.state;
    const body = document.querySelector('body');

    return (
      <>
        {showModal
          ? body.classList.add('overflow-hidden')
          : body.classList.remove('overflow-hidden')}
        <Searchbar onSubmit={setSearchQuery} isSubmitting={loading} />
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
  }
}

export default App;
