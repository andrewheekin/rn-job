import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import reducers from '../reducers';

const persistConfig = { key: 'root', storage, whitelist: ['likedJobs'] };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, (initialState = {}), applyMiddleware(thunk));
export const persistor = persistStore(store);
