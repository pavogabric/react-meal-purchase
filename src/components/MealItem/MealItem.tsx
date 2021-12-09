import classes from './MealItem.module.scss';
import { Meal } from '../../models/meal/meal';
import { MealDrink } from '../../models/meal/meal-drink';
import { useState } from 'react';
import { MealSelectHelper } from '../../helpers/mealSelect-helper';

interface MealItemProps {
  meal: Meal;
  onSelectMealHandler: (meal: Meal, drink: MealDrink | null) => void;
}

const MealItem: React.FunctionComponent<MealItemProps> = ({
  meal,
  onSelectMealHandler,
}) => {
  const [selectedDrinkID, setSelectedDrinkID] = useState('');

  const selectDrinkHandler = (drinkID: string) => {
    if (selectedDrinkID === drinkID) {
      setSelectedDrinkID('');
      return;
    }
    setSelectedDrinkID(drinkID);
  };

  const selectMealHandler = (selectedMeal: Meal) => {
    if (selectedDrinkID) {
      const drink = meal.drinks.filter(
        (drink: MealDrink) => drink.id === selectedDrinkID
      )[0];
      onSelectMealHandler(selectedMeal, drink);
      setSelectedDrinkID('');
      return;
    }

    onSelectMealHandler(selectedMeal, null);
  };

  return (
    <li className={classes.MealItem}>
      <div className={classes.MealItemDetails}>
        <div className={classes.MealItemDetailsImage}>
          <img src={meal.img} alt={meal.title} />
        </div>
        <div className={classes.MealItemDetailsInfo}>
          <h3>
            {meal.title} {meal.drinks.length > 0 && '+ drink'}
          </h3>
          <p>
            <strong>Starter:</strong> {meal.starter} <br></br>
            <strong>Desert:</strong> {meal.desert} <br></br>
            <strong>Selected drink:</strong> {meal.drinks[0].title}
          </p>
        </div>
      </div>

      <div className={classes.MealItemDrinks}>
        <ul>
          {meal.drinks.map((drink: MealDrink) => (
            <li
              key={drink.id}
              className={selectedDrinkID === drink.id ? classes.selected : ''}
              onClick={() => selectDrinkHandler(drink.id)}
            >
              {drink.title}
            </li>
          ))}
        </ul>
        <p>
          <strong>
            {MealSelectHelper.getMealPrice(meal, selectedDrinkID)}$
          </strong>
        </p>
        <button onClick={() => selectMealHandler(meal)}>Select</button>
      </div>
    </li>
  );
};

export default MealItem;
