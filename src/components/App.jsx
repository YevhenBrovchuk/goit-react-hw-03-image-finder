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
    this.setState({ setIsOpen: false });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
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
        <Button onClickBtn={this.handleLoadMore}></Button>
        {this.state.loading === true && <Loader />}
        {this.state.setIsOpen === true && (
          <ModalImg
            imgItem={this.modalImg}
            modalIsOpen={this.state.modalIsOpen}
            onCloseModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
