import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Buutton';
import { fetchImg } from 'helperApi';
import { Loader } from './loader/Loader';
import { ModalImg } from './modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showBtn: '',
    loading: false,
    error: false,
    setIsOpen: false,
    modalImg: '',
    randomId: '',
  };

  handleSubmit = evt => {
    this.setState({
      query: evt,
      images: [],
      page: 1,
      randomId: Date.now(),
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = evt => {
    this.setState({ setIsOpen: true, modalImg: evt });
  };

  closeModal = () => {
    this.setState({ setIsOpen: false, modalImg: '' });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page ||
      prevState.randomId !== this.state.randomId
    ) {
      try {
        this.setState({ loading: true, error: false });
        const img = await fetchImg(this.state.query, this.state.page);
        const imghelper = img.data.hits.map(item => ({
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        }));
        this.setState(prevState => ({
          images: [...prevState.images, ...imghelper],
          showBtn: this.state.page < Math.ceil(img.data.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onAdd={this.handleSubmit}></Searchbar>

        {this.state.images.length > 0 && (
          <ImageGallery
            items={this.state.images}
            openModalImg={this.openModal}
          />
        )}

        {this.state.showBtn && (
          <Button onClickBtn={this.handleLoadMore}></Button>
        )}

        {this.state.loading && <Loader />}
        {this.state.setIsOpen && (
          <ModalImg
            imgItem={this.state.modalImg}
            isOpen={this.state.setIsOpen}
            onRequestClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
