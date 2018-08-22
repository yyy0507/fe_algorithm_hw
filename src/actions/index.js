import type from '../constant/type.js';

const { SHOW_MODAL, HIDE_MODAL  } = type;

const handleShowModal = () => ({
    type: 'SHOW_MODAL',
    payload: {
        addShow: true
    }
})
const handleHideModal = () => ({
    type: 'HIDE_MODAL',
    payload: {
        addShow: false
    }
})

export { handleShowModal, handleHideModal }