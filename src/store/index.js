import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import products from "./product/productSlice";
import governorates from "./governorates/governoratesSlice";
import cities from "./cities/sliceCities";
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
const persistGovernorates = {
  key: "governorates",
  storage,
};
const persistCities = {
  key: "cities",
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  products: persistReducer(persistProducts, products),
  governorates: persistReducer(persistGovernorates, governorates),
  cities: persistReducer(persistCities, cities),
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
