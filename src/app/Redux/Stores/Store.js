
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { backendStatusSlice, loginStatusSlice } from '../Slices/Slice';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from '../Storage';

const rootReducer = combineReducers({
  backendStatus: backendStatusSlice.reducer,
  loginStatus: loginStatusSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginStatus"],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);