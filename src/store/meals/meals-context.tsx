import React, { useReducer } from 'react';
import { Flight } from '../../models/flight/flight';
import { FlightPassenger } from '../../models/flight/flight-passenger';
import { Meal } from '../../models/meal/meal';
import { MealDrink } from '../../models/meal/meal-drink';
import { MealLabel } from '../../models/meal/meal-label';
import {
  LoadDataStart,
  LoadMealsAndLabelsError,
  LoadMealsAndLabelsSuccess,
  ActionTypes,
  SetSelectedMeal,
  SetSelectedPassenger,
  DeleteSelectedMeal,
} from './meals-action-types';
import _ from 'lodash';

type Action =
  | LoadDataStart
  | LoadMealsAndLabelsSuccess
  | LoadMealsAndLabelsError
  | SetSelectedMeal
  | DeleteSelectedMeal
  | SetSelectedPassenger;

interface MealsState {
  flight: Flight;
  meals: Meal[];
  labels: MealLabel[];
  selectedPassenger: string;
  loading: boolean;
  error: any;
}

const initialMealsState: MealsState = {
  flight: {
    route: 'Riga - St. Petersburg',
    duration: '3h 40min',
    passengers: [
      { id: 'passenger1', name: 'Adult passenger 1', meal: null, drink: null },
      { id: 'passenger2', name: 'Adult passenger 2', meal: null, drink: null },
    ],
  },
  meals: [],
  labels: [],
  selectedPassenger: 'passenger1',
  loading: false,
  error: null,
};

const mealsReducer = (
  state: MealsState = initialMealsState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_DATA_START: {
      return { ...state, loading: true };
    }
    case ActionTypes.LOAD_MEALS_AND_LABELS_SUCCESS: {
      return {
        ...state,
        loading: false,
        meals: action.payload.meals,
        labels: [
          { id: 'all', label: 'All' },
          ...action.payload.labels,
        ] as MealLabel[],
      };
    }
    case ActionTypes.LOAD_MEALS_AND_LABELS_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ActionTypes.SET_SELECTED_PASSENGER: {
      return { ...state, selectedPassenger: action.payload };
    }
    case ActionTypes.SET_SELECTED_MEAL: {
      const { selectedMeal, selectedDrink, passengerID } = action.payload;
      const clonedPassengers = _.cloneDeep(state.flight.passengers);
      const index = clonedPassengers.findIndex(
        (passenger: FlightPassenger) => passenger.id === passengerID
      );
      const updatedPassenger = {
        ...clonedPassengers[index],
        meal: selectedMeal,
        drink: selectedDrink,
      };
      clonedPassengers.splice(index, 1, updatedPassenger);

      return {
        ...state,
        flight: {
          ...state.flight,
          passengers: [...clonedPassengers],
        },
      };
    }
    case ActionTypes.DELETE_SELECTED_MEAL: {
      const clonedPassengers = _.cloneDeep(state.flight.passengers);
      const index = clonedPassengers.findIndex(
        (passenger: FlightPassenger) => passenger.id === action.payload
      );
      const updatedPassenger = {
        ...clonedPassengers[index],
        meal: null,
        drink: null,
      };
      clonedPassengers.splice(index, 1, updatedPassenger);

      return {
        ...state,
        flight: {
          ...state.flight,
          passengers: [...clonedPassengers],
        },
      };
    }
  }
};

export const MealsContext = React.createContext({
  flight: initialMealsState.flight,
  meals: initialMealsState.meals,
  labels: initialMealsState.labels,
  selectedPassenger: initialMealsState.selectedPassenger,
  loading: initialMealsState.loading,
  error: initialMealsState.error,
  onLoadData: () => {},
  onSetSelectedPassenger: (id: string) => {
    console.log(id);
  },
  onSetSelectedMeal: (
    selectedMeal: Meal,
    selectedDrink: MealDrink | null,
    passengerID: string
  ) => {
    console.log(selectedMeal, selectedDrink, passengerID);
  },
  onDeleteSelectedMeal: (passengerID: string) => {
    console.log(passengerID);
  },
});

const MealsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mealsReducer, initialMealsState);

  const API_URL = 'https://upheave.tech/api/meals.php';

  const loadDataHandler = async () => {
    dispatch({ type: ActionTypes.LOAD_DATA_START });
    try {
      const mealsResponse = await fetch(API_URL);
      const mealsData = await mealsResponse.json();

      dispatch({
        type: ActionTypes.LOAD_MEALS_AND_LABELS_SUCCESS,
        payload: mealsData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setSelectedPassengerHandler = (selectedUserID: string) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_PASSENGER,
      payload: selectedUserID,
    });
  };

  const setSelectedMealHandler = (
    selectedMeal: Meal,
    selectedDrink: MealDrink | null,
    passengerID: string
  ) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_MEAL,
      payload: { selectedMeal, selectedDrink, passengerID },
    });
  };

  const deleteSelectedMealHandler = (passengerID: string) => {
    dispatch({
      type: ActionTypes.DELETE_SELECTED_MEAL,
      payload: passengerID,
    });
  };

  return (
    <MealsContext.Provider
      value={{
        flight: state.flight,
        meals: state.meals,
        labels: state.labels,
        selectedPassenger: state.selectedPassenger,
        loading: state.loading,
        error: state.error,
        onLoadData: loadDataHandler,
        onSetSelectedPassenger: setSelectedPassengerHandler,
        onSetSelectedMeal: setSelectedMealHandler,
        onDeleteSelectedMeal: deleteSelectedMealHandler,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
