import classes from './MealSelect.module.scss';
import { Meal } from '../../models/meal/meal';
import { MealLabel } from '../../models/meal/meal-label';
import { MealItem } from '../../components';
import { useContext, useState } from 'react';
import { MealSelectHelper } from '../../helpers/mealSelect-helper';
import { MealsContext } from '../../store/meals/meals-context';
import { MealDrink } from '../../models/meal/meal-drink';

interface MealSelectProps {
  meals: Meal[];
  labels: MealLabel[];
}

const MealSelect: React.FunctionComponent<MealSelectProps> = ({
  meals,
  labels,
}) => {
  const [filterByLabel, setFilterByLabel] = useState('all');
  const mealsContext = useContext(MealsContext);
  const selectedPassengerID = mealsContext.selectedPassenger;

  const filteredMeals = MealSelectHelper.getFilteredMeals(meals, filterByLabel);

  const selectMealHandler = (meal: Meal, drink: MealDrink | null) => {
    mealsContext.onSetSelectedMeal(meal, drink, selectedPassengerID);
  };

  return (
    <div className={classes.MealSelect}>
      <div className={classes.MealSelectLabel}>
        <ul className={classes.MealSelectLabelList}>
          {labels.map((label: MealLabel) => (
            <li
              key={label.id}
              onClick={() => setFilterByLabel(label.id)}
              className={label.id === filterByLabel ? classes.selected : ''}
            >
              {label.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className={classes.MealSelectMealList}>
          {filteredMeals.map((meal: Meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onSelectMealHandler={selectMealHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealSelect;
