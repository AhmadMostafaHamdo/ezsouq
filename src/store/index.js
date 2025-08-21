import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import products from "./product/productSlice";
import governorates from "./governorates/governoratesSlice";
import cities from "./cities/sliceCities";
import steps from "./steps/stepsSlice";
import users from "./users/usersSlice";
import wishlist from "./wishlist/wishlistSlice";
import productsByCat from "./getProductsByCat/getProductByCatSlice";
import search from "./search/searchSlice";
import ratingThunk from "./rating/ratingSlice";
import comments from "./commits/commitSlice";
import report from "./report/reportSlice";
import views from "./views/viewsSlice";
import storage from "redux-persist/lib/storage";
import category from "./category/sliceCategory";
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
const persistSteps = {
  key: "cities",
  storage,
};
const persistUsers = {
  key: "users",
  storage,
};
const persistWishlist = {
  key: "wishlist",
  storage,
};
const persistProductsByCat = {
  key: "productsByCat",
  storage,
};
const persistRating = {
  key: "ratingThunk",
  storage,
};
const persistCommits = {
  key: "commits",
  storage,
};
const persistReport = {
  key: "report",
  storage,
};
const persistViews = {
  key: "views",
  storage,
};
const persistCategory = {
  key: "category",
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  products: persistReducer(persistProducts, products),
  governorates: persistReducer(persistGovernorates, governorates),
  cities: persistReducer(persistCities, cities),
  steps: persistReducer(persistSteps, steps),
  users: persistReducer(persistUsers, users),
  wishlist: persistReducer(persistWishlist, wishlist),
  productsByCat: persistReducer(persistProductsByCat, productsByCat),
  ratingThunk: persistReducer(persistRating, ratingThunk),
  comments: persistReducer(persistCommits, comments),
  report: persistReducer(persistReport, report),
  views: persistReducer(persistViews, views),
  category: persistReducer(persistCategory, category),
  search,
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
