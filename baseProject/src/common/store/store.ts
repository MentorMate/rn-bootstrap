import { configureStore, createReducer, ThunkAction, Action } from '@reduxjs/toolkit';
{{#if hasRTKQuery}}
import {postApi} from '../services/api/api'
{{/if}}

export const store = configureStore({
  reducer: {
    exampleReducer: createReducer(null, () => null),
    {{#if hasRTKQuery}}
    [postApi.reducerPath]: postApi.reducer,
    {{/if}}
  },
  middleware: {{#if hasRTKQuery}}(getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware),{{else}}[],{{/if}}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
