"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./Redux/Stores/Store";
import AuthTokenSync from "./AuthTokenSync";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthTokenSync />
        {children}
      </PersistGate>
    </Provider>
  );
}
