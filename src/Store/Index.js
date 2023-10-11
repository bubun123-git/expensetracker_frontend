import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Store/AuthReducer';

const store = configureStore({
  reducer: {
    authentication: authReducer, // Make sure the slice name matches
  },
});

export default store;
