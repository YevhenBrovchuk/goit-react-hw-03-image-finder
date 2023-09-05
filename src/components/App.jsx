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
    totalPages: 0,
    loading: false,
    error: false,
    modalIsOpen: false,
    setIsOpen: false,
    modalImg: '',
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements.query.value}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = evt => {
    this.setState({ setIsOpen: true });
    this.setState({ modalImg: evt });
  };

  closeModal = () => {
    this.setState({ setIsOpen: false, modalImg: '' });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });
        const img = await fetchImg(this.state.query, this.state.page);
        console.log(img);
        const imghelper = img.data.hits.map(item => ({
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        }));
        this.setState(prevState => ({
          images: [...prevState.images, ...imghelper],
          totalPages: Math.ceil(img.data.totalHits / 12),
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
          ></ImageGallery>
        )}
        {this.state.images.length > 0 &&
          this.state.totalPages !== this.state.page &&
          !this.state.loading && (
            <Button onClickBtn={this.handleLoadMore}></Button>
          )}

        {this.state.loading === true && <Loader />}
        {this.state.setIsOpen === true && (
          <ModalImg
            imgItem={this.state.modalImg}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
