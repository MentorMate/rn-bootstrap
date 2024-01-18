import { 
 {{#if hasRTKQuery}}
 configureStore, 
 createReducer,
 ThunkAction, 
 Action,
{{else}}
  configureStore, 
  createReducer,
  ThunkAction, 
  Action,
  Tuple 
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
  middleware: {{#if hasRTKQuery}}getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),{{else}}() => new Tuple(),{{/if}}
  {{#if hasReactotron}}
  enhancers: defaultEnhancers => defaultEnhancers().concat(Reactotron.createEnhancer!()),
  {{/if}}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
