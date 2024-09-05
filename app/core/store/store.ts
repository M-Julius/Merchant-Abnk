import {configureStore} from '@reduxjs/toolkit';
import authSlice from './redux/authSlice';
import merchantSlice from './redux/merchantSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    merchants: merchantSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    });
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
