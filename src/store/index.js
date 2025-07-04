    import { combineReducers, configureStore } from "@reduxjs/toolkit";
    import auth from "./auth/authSlice";
    import products from "./product/productSlice";
    import storage from "redux-persist/lib/storage";
    import {
      FLUSH,
      PAUSE,
      PERSIST,
      persistReducer,
      persistStore,
      PURGE,
      REGISTER,
      REHYDRATE,
    } from "redux-persist";
    const persistAuth = {
      key: "auth",
      storage,
    };
    const persistProducts = {
      key: "products",
      storage,
    };
    const rootReducer = combineReducers({
      auth: persistReducer(persistAuth, auth),
      products: persistReducer(persistProducts, products),
    });
    export const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
    export const persistor = persistStore(store);
