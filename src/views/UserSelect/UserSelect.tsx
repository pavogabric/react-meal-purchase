import classes from './UserSelect.module.scss';
import { useContext } from 'react';
import { Flight } from '../../models/flight/flight';
import { FlightPassenger } from '../../models/flight/flight-passenger';
import { MealsContext } from '../../store/meals/meals-context';
import { MealSelectHelper } from '../../helpers/mealSelect-helper';

interface UserSelectProps {
  flight: Flight;
}

const UserSelect: React.FunctionComponent<UserSelectProps> = () => {
  const mealsContext = useContext(MealsContext);
  const flight = mealsContext.flight;
  const selectedPassengerID = mealsContext.selectedPassenger;

  const totalPrice = MealSelectHelper.getTotalPrice(
    mealsContext.flight.passengers
  );

  const selectUserHandler = (passenger: FlightPassenger) => {
    mealsContext.onSetSelectedPassenger(passenger.id);
  };

  const deleteMealHandler = (passengerID: string) => {
    mealsContext.onDeleteSelectedMeal(passengerID);
  };

  return (
    <aside className={classes.UserSelect}>
      <div className={`${classes.UserSelectTab} ${classes.UserSelectRoute}`}>
        <h3>{flight.route}</h3>
        <p>Flight duration: {flight.duration}</p>
      </div>
      {flight.passengers.length > 0 && (
        <ul className={classes.UserSelectPassengerList}>
          <h4>Select passenger and meal:</h4>
          {flight.passengers.map((passenger: FlightPassenger) => (
            <div
              className={`${classes.UserSelectTab}`}
              key={passenger.id}
              style={{ marginBottom: '10px' }}
            >
              <li
                className={`${classes.UserSelectTab} ${
                  selectedPassengerID === passenger.id ? classes.selected : ''
                }`}
                onClick={() => selectUserHandler(passenger)}
              >
                <p>{passenger.name}</p>
                <p>+</p>
              </li>
              {passenger.meal && (
                <div>
                  {passenger.meal?.title} <br></br>
                  {passenger.drink?.title}
                  <br></br>
                  {MealSelectHelper.getMealPrice(
                    passenger.meal,
                    passenger.drink?.id ?? ''
                  )}
                  $<br></br>
                  <button onClick={() => deleteMealHandler(passenger.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
      <br></br>
      <h4>Total price: {totalPrice}$</h4>
    </aside>
  );
};

export default UserSelect;
