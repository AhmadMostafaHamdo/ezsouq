import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import {
  registerServiceWorker,
  initializeAddToHomeScreen,
} from "./utils/registerSW";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Register Service Worker for PWA functionality
if (import.meta.env.PROD) {
  registerServiceWorker();
  initializeAddToHomeScreen();
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
