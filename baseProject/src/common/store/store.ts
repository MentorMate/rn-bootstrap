import { configureStore, createReducer, ThunkAction, Action } from '@reduxjs/toolkit';
import {postApi} from '../services/api/api'

export const store = configureStore({
  reducer: {
    exampleReducer: createReducer(null, () => null),
    {{#if hasRTKQuery}}
    [postApi.reducerPath]: postApi.reducer,
    {{/if}}
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
