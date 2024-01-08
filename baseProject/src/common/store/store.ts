import { 
  configureStore, 
  createReducer,
  ThunkAction, 
  Action, 
  {{#if hasReactotron}}
  StoreEnhancer
  {{/if}}
} from '@reduxjs/toolkit';
{{#if hasRTKQuery}}
import {postApi} from '../services/api/api'
{{/if}}
{{#if hasReactotron}}
import Reactotron from '../../../reactotronConfig';
{{/if}}

export const store = configureStore({
  reducer: {
    exampleReducer: createReducer(null, () => null),
    {{#if hasRTKQuery}}
    [postApi.reducerPath]: postApi.reducer,
    {{/if}}
  },
  middleware: {{#if hasRTKQuery}}(getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware),{{else}}[],{{/if}}
  {{#if hasReactotron}}
  enhancers: [Reactotron.createEnhancer?.()] as StoreEnhancer[],
  {{/if}}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
