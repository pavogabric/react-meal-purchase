import { Meal } from '../meal/meal';
import { MealDrink } from '../meal/meal-drink';

export interface FlightPassenger {
  id: string;
  name: string;
  meal: Meal | null;
  drink: MealDrink | null;
}
