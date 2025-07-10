'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromCookie } from '@/redux/slices/authSlice';

function InitUserFromCookie() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromCookie());
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitUserFromCookie />
      {children}
    </Provider>
  );
}
