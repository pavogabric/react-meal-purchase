import { Meal } from '../../models/meal/meal';
import { MealDrink } from '../../models/meal/meal-drink';
import { MealLabel } from '../../models/meal/meal-label';

export enum ActionTypes {
  LOAD_DATA_START = 'LOAD_DATA_START',
  LOAD_MEALS_AND_LABELS_SUCCESS = 'LOAD_MEALS_AND_LABELS_SUCCESS',
  LOAD_MEALS_AND_LABELS_ERROR = 'LOAD_MEALS_AND_LABELS_ERROR',
  SET_SELECTED_MEAL = 'SET_SELECTED_MEAL',
  DELETE_SELECTED_MEAL = 'DELETE_SELECTED_MEAL',
  SET_SELECTED_PASSENGER = 'SET_SELECTED_PASSENGER',
}

export interface LoadDataStart {
  type: ActionTypes.LOAD_DATA_START;
}

export interface LoadMealsAndLabelsSuccess {
  type: ActionTypes.LOAD_MEALS_AND_LABELS_SUCCESS;
  payload: {
    labels: MealLabel[];
    meals: Meal[];
  };
}

export interface LoadMealsAndLabelsError {
  type: ActionTypes.LOAD_MEALS_AND_LABELS_ERROR;
  payload: any;
}

export interface SetSelectedMeal {
  type: ActionTypes.SET_SELECTED_MEAL;
  payload: {
    selectedMeal: Meal;
    selectedDrink: MealDrink | null;
    passengerID: string;
  };
}

export interface DeleteSelectedMeal {
  type: ActionTypes.DELETE_SELECTED_MEAL;
  payload: string;
}

export interface SetSelectedPassenger {
  type: ActionTypes.SET_SELECTED_PASSENGER;
  payload: string;
}
