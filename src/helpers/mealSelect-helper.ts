import { FlightPassenger } from '../models/flight/flight-passenger';
import { Meal } from '../models/meal/meal';
import { MealDrink } from '../models/meal/meal-drink';

export class MealSelectHelper {
  public static getFilteredMeals = (
    meals: Meal[],
    filterByLabel: string
  ): Meal[] => {
    if (filterByLabel.toLowerCase() === 'all') {
      return [...meals];
    }

    return meals.filter((meal: Meal) =>
      meal.labels.includes(filterByLabel.toLowerCase())
    );
  };

  public static getMealPrice = (
    meal: Meal,
    selectedDrinkId: string
  ): number => {
    if (selectedDrinkId.toLowerCase() === '') {
      return meal.price;
    }
    const selectedDrink = meal.drinks.filter(
      (drink: MealDrink) => drink.id === selectedDrinkId.toLowerCase()
    )[0];

    return +Number(meal.price + selectedDrink.price).toFixed(2);
  };

  public static getTotalPrice = (passengers: FlightPassenger[]): number => {
    let totalPrice = 0;

    for (let passenger of passengers) {
      if (passenger.meal) {
        totalPrice += passenger.meal.price;
        if (passenger.drink) {
          totalPrice += passenger.drink.price;
        }
      }
    }
    return +Number(totalPrice).toFixed(2);
  };
}
