"use client";
import { createContext, useContext, useReducer } from "react";

export const MapContext = createContext();

export const useMapContext = function () {
  const context = useContext(MapContext);
  return context;
};

export const MapContextProvider = function ({ children }) {
  const initialState = {
    selectedLocation: [],
  };

  const mapReducer = function (state, action) {
    switch (action.type) {
      case "ADD_NEW_LOCATION":
        return {
          ...state,
          selectedLocation: [...state.selectedLocation, action.payload],
        };
      case "LOAD_LOCATION":
        return {
          ...state,
          selectedLocation: [...action.payload],
        };

      case "DELETE_LOCATION":
        return { ...state, selectedLocation: [] };
      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};
