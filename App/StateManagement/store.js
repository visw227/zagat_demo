// store.js
// This app doesn't require Redux. For GLobal state management using CONTEXT API..

// I haven't used CONTEXT in my earlier work. So I'm improving my skills on it ....

import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  favorites: [],
  favoritesCount: 0
};

const store = createContext(initialState);
const { Provider } = store; // Consumer is not required with hooks introduction


const GlobalState = ({ children }) => {


  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_FAVORITES':

        return {
          ...state,
          favorites: action.payload,
        };
      case 'REMOVE_FAVORITES':

        return {
          ...state,
          favorites: action.payload,
        };
      case 'SET_FAVS_COUNT':

        return {
          ...state,
          favoritesCount: action.payload,
        };
      case 'INCR_FAVS':

        return {
          ...state,
          favoritesCount: state.favoritesCount + 1,
        };
      case 'DECR_FAVS':

        return {
          ...state,
          favoritesCount: state.favoritesCount - 1,
        };

      default:
        throw new Error();
    };
  }, initialState);

  const handleChange = (newState) => {
    if (newState === "active") {
      console.log("------------console")
      AsyncStorage.getItem('favorites').then((value) => {
        if (value) {
          console.log("asyncc>>>", value)
        }
      });

    } else {
      console.log("-------seting async")

    }
  }



  useEffect(() => {


    AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    AsyncStorage.setItem('favoritesCount', JSON.stringify(state.favoritesCount));

    return () => {

    }
  }, [state.favoritesCount]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, GlobalState }