import { useReducer, useCallback } from 'react';

const FORM_ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_FORM: 'RESET_FORM'
};

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_FIELD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value
        }
      };
    case FORM_ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case FORM_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: ''
        }
      };
    case FORM_ACTIONS.RESET_FORM:
      return {
        data: action.payload || state.initialData,
        errors: {}
      };
    default:
      return state;
  }
};

export const useForm = (initialData = {}) => {
  const [state, dispatch] = useReducer(formReducer, {
    data: initialData,
    errors: {},
    initialData
  });

  const setField = useCallback((field, value) => {
    dispatch({
      type: FORM_ACTIONS.SET_FIELD,
      payload: { field, value }
    });
  }, []);

  const setErrors = useCallback((errors) => {
    dispatch({
      type: FORM_ACTIONS.SET_ERRORS,
      payload: errors
    });
  }, []);

  const clearError = useCallback((field) => {
    dispatch({
      type: FORM_ACTIONS.CLEAR_ERROR,
      payload: field
    });
  }, []);

  const resetForm = useCallback((newData = null) => {
    dispatch({
      type: FORM_ACTIONS.RESET_FORM,
      payload: newData
    });
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setField(field, value);
    if (state.errors[field]) {
      clearError(field);
    }
  }, [setField, clearError, state.errors]);

  return {
    formData: state.data,
    errors: state.errors,
    setField,
    setErrors,
    clearError,
    resetForm,
    handleInputChange
  };
};