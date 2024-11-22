import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer, { categoriesApiSlice } from "../features/categories/categorySlice";
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApiSlice } from "../features/cast/castMemberSlice";

const reducers = {
  categories: categoriesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const reducersCastMembers = {
  [castMembersApiSlice.reducerPath]: apiSlice.reducer
};

export const store = configureStore({
  reducer: {
    ...reducers,
    ...reducersCastMembers,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
