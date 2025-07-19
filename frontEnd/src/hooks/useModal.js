import { useReducer, useCallback } from 'react';

const MODAL_ACTIONS = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  CLOSE_ALL_MODALS: 'CLOSE_ALL_MODALS'
};

const initialModalState = {
  authModal: false,
  userMenu: false,
  donationModal: false,
  authPrompt: false,
  contactModal: null,
  profilePage: false,
  donationStep: 'form'
}

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        [action.payload.modalName]: action.payload.data || true
      };
    case MODAL_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: action.payload === 'contactModal' ? null : false
      };
    case MODAL_ACTIONS.CLOSE_ALL_MODALS:
      return initialModalState;
    default:
      return state;
  }
};

export const useModal = () => {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  const openModal = useCallback((modalName, data = null) => {
    dispatch({
      type: MODAL_ACTIONS.OPEN_MODAL,
      payload: { modalName, data }
    });
  }, []);

  const closeModal = useCallback((modalName) => {
    dispatch({
      type: MODAL_ACTIONS.CLOSE_MODAL,
      payload: modalName
    });
  }, []);

  const closeAllModals = useCallback(() => {
    dispatch({ type: MODAL_ACTIONS.CLOSE_ALL_MODALS });
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    closeAllModals
  };
};