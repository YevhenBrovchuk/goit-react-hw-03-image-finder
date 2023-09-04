import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ModalImg = ({ modalIsOpen, closeModal, imgItem }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <h2>Hello</h2>
      <img src={imgItem}></img>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
    </Modal>
  );
};
