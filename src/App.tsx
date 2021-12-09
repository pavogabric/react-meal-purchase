import { useContext, useEffect } from 'react';
import './App.scss';
import { MealsContext } from './store/meals/meals-context';
import { MealSelect, UserSelect } from './views';

function App() {
  const mealsContext = useContext(MealsContext);

  useEffect(() => {
    mealsContext.onLoadData();
  }, []);

  if (mealsContext.loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <main>
        <MealSelect meals={mealsContext.meals} labels={mealsContext.labels} />
        <UserSelect flight={mealsContext.flight} />
      </main>
    </div>
  );
}

export default App;
